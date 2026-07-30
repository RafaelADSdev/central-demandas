// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from 'react'
import { DAY, DEFAULT_VIEW, MONTHS, MONTHS_FULL, PALETTE, PRIORITY, STATUS } from '../lib/constants'
import { fetchStore, persistStore, subscribeStore } from '../lib/storeApi'
import type { AppState, Draft, DraftTask, Store, TaskDraft } from '../lib/types'
import { cap, fmt, fmtFull, initials, isoOf, defaultStore, round1, todayZero, uid } from '../lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderVals = Record<string, any>

function blankDraft(st: Store): Draft {
  const p0 = st.people[0] ? st.people[0].name : ''
  return {
    kind: 'project', editing: null, name: '', description: '',
    requester: st.requesters[0] ? st.requesters[0].name : '', owner: p0,
    team: st.teams[0], due: '', priority: 'Média',
    tasks: [{ name: '', owner: p0, due: '' }],
  }
}

function initialAppState(store: Store): AppState {
  return {
    store, team: 'Todas as equipes', view: 'projects', projectId: null,
    q: '', owner: 'Todos os responsáveis', requester: 'Todos os requerentes',
    status: 'Todos os status', lateOnly: false, board: null,
    looseQ: '', looseStatus: 'Todos os status',
    modalOpen: false, draft: null, draftError: '',
    taskDraft: null, taskError: '',
    cal: null, perfMonth: null,
    pName: '', pRole: '', pTeam: store.teams[0], rName: '', rRole: '', tmName: '', regError: '',
  }
}

export function useCentralDemandas(): RenderVals {
  const dragRef = useRef<string | null>(null)
  const skipRemoteRef = useRef(false)
  const [state, setState] = useState<AppState | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncError, setSyncError] = useState('')

  useEffect(() => {
    let active = true
    fetchStore()
      .then(store => {
        if (!active) return
        setState(initialAppState(store))
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        if (!active) return
        setState(initialAppState(defaultStore()))
        setSyncError('Não foi possível carregar do Supabase. Usando dados locais.')
        setLoading(false)
      })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!state) return
    return subscribeStore((remote) => {
      if (skipRemoteRef.current) {
        skipRemoteRef.current = false
        return
      }
      setState(prev => prev ? { ...prev, store: remote } : prev)
    })
  }, [!!state])

  const mutate = useCallback((fn: (s: Store) => void, extra?: Partial<AppState>) => {
    setState(prev => {
      if (!prev) return prev
      const s = JSON.parse(JSON.stringify(prev.store)) as Store
      fn(s)
      skipRemoteRef.current = true
      persistStore(s).catch(err => {
        console.error(err)
        setSyncError('Falha ao salvar no Supabase. Dados mantidos localmente.')
      })
      return { ...prev, store: s, ...extra }
    })
  }, [])

  const maps = useCallback(() => {
    const st = state.store
    const TEAMS: Record<string, typeof PALETTE[0]> = {}
    st.teams.forEach((t, i) => { TEAMS[t] = PALETTE[i % PALETTE.length] })
    const PEOPLE: Record<string, typeof PALETTE[0]> = {}
    const TEAM_OF: Record<string, string> = {}
    const ROLES: Record<string, string> = {}
    st.people.forEach((p, i) => {
      PEOPLE[p.name] = PALETTE[(i + 2) % PALETTE.length]
      TEAM_OF[p.name] = p.team
      ROLES[p.name] = p.role
    })
    const REQ: Record<string, { role: string; bg: string; fg: string }> = {}
    st.requesters.forEach((r, i) => {
      const c = PALETTE[(i + 4) % PALETTE.length]
      REQ[r.name] = { role: r.role, bg: c.bg, fg: c.fg }
    })
    return { TEAMS, PEOPLE, TEAM_OF, ROLES, REQ }
  }, [state.store])

  const decorate = useCallback((t: Record<string, unknown>, M: ReturnType<typeof maps>, TODAY: Date): Record<string, unknown> => {
    const status = String(t.status)
    const st = STATUS[status] || STATUS.backlog
    const p = M.PEOPLE[String(t.owner)] || { bg: '#F1F5F9', fg: '#475569' }
    const r = M.REQ[String(t.requester)] || { bg: '#F1F5F9', fg: '#475569', role: '' }
    const d = new Date(String(t.due) + 'T00:00:00')
    const diff = Math.round((d.getTime() - TODAY.getTime()) / DAY)
    const late = diff < 0 && status !== 'concluido'
    const soon = diff >= 0 && diff <= 3 && status !== 'concluido'
    const prio = PRIORITY[String(t.priority)] || PRIORITY['Baixa']
    const tm = M.TEAM_OF[String(t.owner)] || state.store.teams[0]
    const tc = M.TEAMS[tm] || PALETTE[7]
    return {
      ...t,
      rawStatus: status,
      team: tm, teamBg: tc.bg, teamFg: tc.fg,
      status: st.label, badgeBg: st.bg, badgeFg: st.fg,
      pct: String(t.progress) + '%',
      initials: initials(String(t.owner)), avBg: p.bg, avFg: p.fg,
      reqInitials: initials(String(t.requester)), reqBg: r.bg, reqFg: r.fg, requesterRole: r.role,
      late,
      dueLabel: late ? 'Atrasada · ' + fmt(d) : fmt(d),
      dueFg: late ? '#DC2626' : soon ? '#D97706' : '#64748B',
      dueBg: late ? '#FEF2F2' : soon ? '#FFFBEB' : '#F8FAFC',
      openedLabel: t.createdAt ? fmt(new Date(String(t.createdAt) + 'T00:00:00')) : '',
      prioBg: prio.bg, prioFg: prio.fg,
    }
  }, [state.store.teams])

  const projectSummary = useCallback((p: Store['projects'][0], M: ReturnType<typeof maps>, TODAY: Date) => {
    const tasks = p.tasks.map(t => decorate(t as unknown as Record<string, unknown>, M, TODAY))
    const done = tasks.filter(t => t.rawStatus === 'concluido').length
    const lateCount = tasks.filter(t => t.late).length
    const progress = tasks.length ? Math.round(tasks.reduce((s, t) => s + Number(t.progress), 0) / tasks.length) : 0
    const d = new Date(p.due + 'T00:00:00')
    const diff = Math.round((d.getTime() - TODAY.getTime()) / DAY)
    const r = M.REQ[p.requester] || { bg: '#F1F5F9', fg: '#475569', role: '' }
    const names: string[] = []
    tasks.forEach(t => { if (names.indexOf(String(t.owner)) < 0) names.push(String(t.owner)) })
    const pState = !tasks.length ? 'Planejamento' : (done === tasks.length ? 'Concluído' : (lateCount > 0 || diff < 0) ? 'Crítico' : 'Em andamento')
    const stColor = pState === 'Crítico' ? { bg: '#FEF2F2', fg: '#DC2626' } : pState === 'Planejamento' ? { bg: '#F1F5F9', fg: '#64748B' } : pState === 'Concluído' ? { bg: '#F0FDF4', fg: '#16A34A' } : { bg: '#EFF6FF', fg: '#2563EB' }
    const tc = M.TEAMS[p.team] || PALETTE[7]
    return {
      id: p.id, code: p.code, name: p.name, description: p.description,
      teamName: p.team, teamBg: tc.bg, teamFg: tc.fg,
      requester: p.requester, requesterRole: r.role, reqInitials: initials(p.requester), reqBg: r.bg, reqFg: r.fg,
      stLabel: pState, stBg: stColor.bg, stFg: stColor.fg,
      progress, pct: progress + '%',
      barColor: progress >= 80 ? '#16A34A' : progress >= 40 ? '#2563EB' : '#94A3B8',
      taskSummary: done + ' de ' + tasks.length + ' concluídas',
      total: tasks.length, done, lateCount,
      dueFull: fmtFull(d),
      dueLabel: diff < 0 && pState !== 'Concluído' ? 'Atrasado · ' + fmt(d) : fmt(d),
      dueRelative: diff < 0 ? Math.abs(diff) + ' dias de atraso' : diff + ' dias restantes',
      dueFg: diff < 0 && pState !== 'Concluído' ? '#DC2626' : diff <= 14 ? '#D97706' : '#64748B',
      hasAlert: lateCount > 0,
      alertLabel: lateCount + ' tarefa(s) atrasada(s)',
      team: names.map(n => { const c = M.PEOPLE[n] || PALETTE[7]; return { name: n, initials: initials(n), bg: c.bg, fg: c.fg } }),
      tasks,
    }
  }, [decorate])

  const setDraft = useCallback((patch: Partial<Draft>) => {
    setState(s => ({ ...s, draft: { ...(s.draft || blankDraft(s.store)), ...patch }, draftError: '' }))
  }, [])

  const setDraftTask = useCallback((i: number, patch: Partial<DraftTask>) => {
    setState(s => ({
      ...s,
      draft: s.draft ? {
        ...s.draft,
        tasks: s.draft.tasks.map((t, j) => j === i ? { ...t, ...patch } : t),
      } : null,
      draftError: '',
    }))
  }, [])

  const submitDraft = useCallback(() => {
    const st = state.store
    const d = state.draft || blankDraft(st)
    if (!st.people.length || !st.requesters.length) return setState(s => ({ ...s, draftError: 'Cadastre colaboradores e requerentes antes (aba Cadastros).' }))
    if (!d.name.trim()) return setState(s => ({ ...s, draftError: 'Informe o nome da demanda.' }))
    if (!d.due) return setState(s => ({ ...s, draftError: 'Informe o prazo final.' }))
    const iso = isoOf(todayZero())
    if (d.editing) {
      mutate(s => {
        const p = s.projects.find(x => x.id === d.editing)
        if (p) { p.name = d.name.trim(); p.description = d.description.trim(); p.requester = d.requester; p.team = d.team; p.due = d.due }
      }, { modalOpen: false })
      return
    }
    if (d.kind === 'loose') {
      const item = { id: uid(), code: 'AV-' + String(st.seq).padStart(2, '0'), name: d.name.trim(), owner: d.owner, requester: d.requester, status: 'backlog', progress: 0, due: d.due, createdAt: iso, completedAt: null, priority: d.priority }
      mutate(s => { s.loose.push(item); s.seq++ }, { modalOpen: false, view: 'loose', looseQ: '', looseStatus: 'Todos os status' })
      return
    }
    const rows = d.tasks.filter(t => t.name.trim())
    if (!rows.length) return setState(s => ({ ...s, draftError: 'Adicione ao menos uma microtarefa com descrição.' }))
    const code = 'P' + st.seq
    const projId = uid()
    const proj = {
      id: projId, code, name: d.name.trim(),
      description: d.description.trim() || 'Demanda solicitada por ' + d.requester + '.',
      requester: d.requester, due: d.due, team: d.team, createdAt: iso,
      tasks: rows.map((t, i) => ({
        id: uid(), code: code + '-' + (i + 1), name: t.name.trim(), owner: t.owner, requester: d.requester,
        status: 'backlog', progress: 0, due: t.due || d.due, tag: 'Geral', createdAt: iso, completedAt: null,
      })),
    }
    mutate(s => { s.projects.push(proj); s.seq++ }, {
      modalOpen: false, view: 'detail', projectId: projId,
      q: '', owner: 'Todos os responsáveis', requester: 'Todos os requerentes', status: 'Todos os status', lateOnly: false,
    })
  }, [mutate, state.draft, state.store])

  const openTask = useCallback((scope: 'project' | 'loose', projId: string | null, taskId: string) => {
    const s = state.store
    const t = scope === 'project'
      ? (s.projects.find(p => p.id === projId)?.tasks.find(x => x.id === taskId))
      : s.loose.find(x => x.id === taskId)
    if (!t) return
    setState({
      ...state,
      taskDraft: {
        mode: 'edit', scope, projId, taskId,
        name: t.name, owner: t.owner, requester: t.requester, due: t.due,
        tag: t.tag || '', priority: t.priority || 'Média', status: t.status, progress: t.progress,
      },
      taskError: '',
    })
  }, [state])

  const setTaskDraft = useCallback((patch: Partial<TaskDraft>) => {
    setState(s => ({ ...s, taskDraft: s.taskDraft ? { ...s.taskDraft, ...patch } : null, taskError: '' }))
  }, [])

  const saveTask = useCallback(() => {
    const td = state.taskDraft
    if (!td) return
    if (!td.name.trim()) return setState(s => ({ ...s, taskError: 'Informe a descrição.' }))
    if (!td.due) return setState(s => ({ ...s, taskError: 'Informe o prazo.' }))
    const iso = isoOf(todayZero())
    const apply = (t: Record<string, unknown>) => {
      t.name = td.name.trim(); t.owner = td.owner; t.requester = td.requester; t.due = td.due
      if (td.scope === 'project') t.tag = td.tag.trim() || 'Geral'; else t.priority = td.priority
      t.status = td.status
      t.progress = td.status === 'concluido' ? 100 : Number(td.progress) || 0
      if (td.status === 'concluido') { if (!t.completedAt) t.completedAt = iso } else t.completedAt = null
    }
    mutate(s => {
      if (td.scope === 'loose') {
        const t = s.loose.find(x => x.id === td.taskId)
        if (t) apply(t as unknown as Record<string, unknown>)
      } else {
        const p = s.projects.find(x => x.id === td.projId)
        if (!p) return
        if (td.mode === 'create') {
          const nt: Record<string, unknown> = { id: uid(), code: p.code + '-' + (p.tasks.length + 1), createdAt: iso, completedAt: null, tag: 'Geral' }
          apply(nt); p.tasks.push(nt as unknown as typeof p.tasks[0])
        } else {
          const t = p.tasks.find(x => x.id === td.taskId)
          if (t) apply(t as unknown as Record<string, unknown>)
        }
      }
    }, { taskDraft: null })
  }, [mutate, state.taskDraft])

  const deleteTask = useCallback(() => {
    const td = state.taskDraft
    if (!td) return
    if (!window.confirm('Excluir esta tarefa? Esta ação não pode ser desfeita.')) return
    mutate(s => {
      if (td.scope === 'loose') s.loose = s.loose.filter(x => x.id !== td.taskId)
      else {
        const p = s.projects.find(x => x.id === td.projId)
        if (p) p.tasks = p.tasks.filter(x => x.id !== td.taskId)
      }
    }, { taskDraft: null })
  }, [mutate, state.taskDraft])

  const dropOn = useCallback((projId: string, statusKey: string) => {
    const d = dragRef.current
    dragRef.current = null
    if (!d) return
    const iso = isoOf(todayZero())
    mutate(s => {
      const p = s.projects.find(x => x.id === projId)
      if (!p) return
      const t = p.tasks.find(x => x.id === d)
      if (!t || t.status === statusKey) return
      t.status = statusKey
      if (statusKey === 'concluido') { t.progress = 100; if (!t.completedAt) t.completedAt = iso }
      else { t.completedAt = null; if (t.progress === 100) t.progress = 90; if (statusKey === 'backlog') t.progress = 0 }
    })
  }, [mutate])

  // --- renderVals ---
  if (!state) {
    return { loading: true, syncError: '' }
  }

  const TODAY = todayZero()
  const isoToday = isoOf(TODAY)
  const M = maps()
  const st = state.store
  let view = state.view
  const teamOptions = ['Todas as equipes'].concat(st.teams)
  const teamSel = teamOptions.indexOf(state.team) >= 0 ? state.team : 'Todas as equipes'
  const allTeams = teamSel === 'Todas as equipes'
  const inTeam = (t: { team?: string; owner?: string }) => {
    if (allTeams) return true
    return t.team === teamSel || M.TEAM_OF[String(t.owner)] === teamSel
  }

  const allSummaries = st.projects.map(p => projectSummary(p, M, TODAY))
  const scope = (s: ReturnType<typeof projectSummary>) => {
    if (allTeams) return s
    const ts = s.tasks.filter(inTeam)
    if (!ts.length) return null
    const done = ts.filter(t => t.rawStatus === 'concluido').length
    const lateCount = ts.filter(t => t.late).length
    const progress = Math.round(ts.reduce((a, t) => a + Number(t.progress), 0) / ts.length)
    const owners = ts.reduce<string[]>((a, t) => (a.indexOf(String(t.owner)) < 0 ? a.concat([String(t.owner)]) : a), [])
    return {
      ...s,
      tasks: ts, total: ts.length, done, lateCount, progress, pct: progress + '%',
      barColor: progress >= 80 ? '#16A34A' : progress >= 40 ? '#2563EB' : '#94A3B8',
      taskSummary: done + ' de ' + ts.length + ' · ' + teamSel,
      team: owners.map(n => { const c = M.PEOPLE[n] || PALETTE[7]; return { name: n, initials: initials(n), bg: c.bg, fg: c.fg } }),
      hasAlert: lateCount > 0, alertLabel: lateCount + ' tarefa(s) atrasada(s)',
    }
  }
  const summaries = allSummaries.map(scope).filter((s): s is NonNullable<typeof s> => s !== null)
  const allTasks = summaries.reduce<Record<string, unknown>[]>((a, s) => a.concat(s.tasks), [])
  const looseAll = st.loose.map(t => decorate(t as unknown as Record<string, unknown>, M, TODAY)).filter(inTeam)

  const cur = allSummaries.find(s => s.id === state.projectId)
  if (view === 'detail' && !cur) view = 'projects'
  const onProjects = view === 'projects' || view === 'detail'
  const tc = M.TEAMS[teamSel]

  const draft = state.draft || blankDraft(st)
  const isProjDraft = draft.kind === 'project'
  const activeK = { bg: '#FFFFFF', fg: '#0F172A', shadow: '0 1px 2px rgba(15,23,42,.10)' }
  const idleK = { bg: 'transparent', fg: '#64748B', shadow: 'none' }
  const kp = isProjDraft ? activeK : idleK
  const kl = isProjDraft ? idleK : activeK

  const td = state.taskDraft

  const lq = state.looseQ.trim().toLowerCase()
  const looseRows = looseAll.filter(t =>
    (!lq || String(t.name).toLowerCase().includes(lq) || String(t.code).toLowerCase().includes(lq) || String(t.requester).toLowerCase().includes(lq)) &&
    (state.looseStatus.startsWith('Todos') || t.status === state.looseStatus)
  ).map(t => ({ ...t, openEdit: () => openTask('loose', null, String(t.id)) }))

  const cal = state.cal || { y: TODAY.getFullYear(), m: TODAY.getMonth() }
  const calEvents: Record<string, Array<{ label: string; projId: string | null; taskId: string; bg: string; fg: string; tooltip: string }>> = {}
  summaries.forEach(s => s.tasks.filter(inTeam).forEach(t => {
    const due = String(t.due)
    ;(calEvents[due] = calEvents[due] || []).push({
      label: s.code + ' · ' + t.name, projId: s.id, taskId: String(t.id),
      bg: t.late ? '#FEE2E2' : String(t.badgeBg), fg: t.late ? '#DC2626' : String(t.badgeFg),
      tooltip: '[' + s.code + '] ' + t.name + ' · ' + t.owner + ' · ' + t.status,
    })
  }))
  looseAll.forEach(t => {
    const due = String(t.due)
    ;(calEvents[due] = calEvents[due] || []).push({
      label: 'AV · ' + t.name, projId: null, taskId: String(t.id),
      bg: t.late ? '#FEE2E2' : String(t.badgeBg), fg: t.late ? '#DC2626' : String(t.badgeFg),
      tooltip: '[Avulsa] ' + t.name + ' · ' + t.owner + ' · ' + t.status,
    })
  })
  const first = new Date(cal.y, cal.m, 1)
  const gridStart = new Date(cal.y, cal.m, 1 - first.getDay())
  const calWeeks: Array<{ days: Array<Record<string, unknown>> }> = []
  let calCount = 0
  for (let w = 0; w < 6; w++) {
    const days = []
    for (let dd = 0; dd < 7; dd++) {
      const dt = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + w * 7 + dd)
      const inMonth = dt.getMonth() === cal.m
      const dIso = isoOf(dt)
      const evs = calEvents[dIso] || []
      if (inMonth) calCount += evs.length
      const isToday = dIso === isoToday
      days.push({
        num: dt.getDate(),
        bg: inMonth ? '#FFFFFF' : '#FAFBFC',
        numFg: isToday ? '#FFFFFF' : inMonth ? '#334155' : '#CBD5E1',
        numBg: isToday ? '#DC2626' : 'transparent',
        numWeight: isToday ? '700' : '500',
        items: evs.slice(0, 3).map(e => ({
          ...e,
          open: e.projId
            ? () => setState(s => ({ ...s, view: 'detail', projectId: e.projId, q: '', owner: 'Todos os responsáveis', requester: 'Todos os requerentes', status: 'Todos os status', lateOnly: false }))
            : () => openTask('loose', null, e.taskId),
        })),
        hasMore: evs.length > 3, more: evs.length - 3,
      })
    }
    if (w === 5 && days.every(x => x.bg === '#FAFBFC')) break
    calWeeks.push({ days })
  }

  const rawAll: Array<{ t: Store['projects'][0]['tasks'][0]; proj: string | null }> = []
  st.projects.forEach(p => p.tasks.forEach(t => rawAll.push({ t, proj: p.id })))
  st.loose.forEach(t => rawAll.push({ t, proj: null }))
  const monthsSet: Record<string, number> = {}
  rawAll.forEach(x => { if (x.t.createdAt) monthsSet[x.t.createdAt.slice(0, 7)] = 1; if (x.t.completedAt) monthsSet[x.t.completedAt.slice(0, 7)] = 1 })
  monthsSet[isoToday.slice(0, 7)] = 1
  const monthKeys = Object.keys(monthsSet).sort().reverse()
  const labelOf = (k: string) => cap(MONTHS[Number(k.slice(5)) - 1]) + ' ' + k.slice(0, 4)
  const byLabel: Record<string, string> = {}
  monthKeys.forEach(k => { byLabel[labelOf(k)] = k })
  const monthOptions = monthKeys.map(labelOf)
  const perfMonth = byLabel[state.perfMonth || ''] ? state.perfMonth! : labelOf(isoToday.slice(0, 7))
  const mk = byLabel[perfMonth]
  const msIso = mk + '-01'
  const meIso = mk + '-' + String(new Date(Number(mk.slice(0, 4)), Number(mk.slice(5)), 0).getDate()).padStart(2, '0')
  const isCurrentMonth = mk === isoToday.slice(0, 7)

  const perNames = st.people.filter(p => allTeams || p.team === teamSel).map(p => p.name)
  const people = perNames.map(n => {
    const mine = rawAll.filter(x => x.t.owner === n)
    const delivered = mine.filter(x => x.t.completedAt && x.t.completedAt >= msIso && x.t.completedAt <= meIso)
    const assigned = mine.filter(x => (x.t.createdAt || '0') <= meIso && (!x.t.completedAt || x.t.completedAt >= msIso))
    const lateDone = delivered.filter(x => x.t.completedAt! > x.t.due).length
    const openOverdue = isCurrentMonth ? mine.filter(x => !x.t.completedAt && x.t.due < isoToday).length : 0
    const late = lateDone + openOverdue
    const avgDays = delivered.length ? delivered.reduce((s2, x) => s2 + Math.max(0, (new Date(x.t.completedAt!).getTime() - new Date(x.t.createdAt || x.t.completedAt!).getTime()) / DAY), 0) / delivered.length : 0
    const projIds = assigned.reduce<string[]>((a, x) => (x.proj && a.indexOf(x.proj) < 0 ? a.concat([x.proj]) : a), [])
    return { n, delivered: delivered.length, lateDone, assigned: assigned.length, late, avgDays, projects: projIds.length }
  }).filter(p => p.assigned > 0)

  const perfEmpty = people.length === 0

  const vals: RenderVals = {
    loading: false,
    syncError,
    showProjects: view === 'projects', showDetail: view === 'detail', showLoose: view === 'loose',
    showCal: view === 'cal', showPerf: view === 'perf', showReg: view === 'reg',
    needsSetup: !st.people.length || !st.requesters.length,
    noProjects: summaries.length === 0,
    projects: summaries.map(s => ({ ...s, open: () => setState(prev => ({ ...prev, view: 'detail', projectId: s.id, q: '', owner: 'Todos os responsáveis', requester: 'Todos os requerentes', status: 'Todos os status', lateOnly: false })) })),
    portfolioStats: [
      { label: allTeams ? 'Projetos ativos' : 'Projetos da equipe', value: summaries.length, color: '#0F172A' },
      { label: 'Microtarefas', value: allTasks.length, color: '#0F172A' },
      { label: 'Aguardando aprov.', value: allTasks.filter(t => t.rawStatus === 'aprovacao').length, color: '#D97706' },
      { label: 'Atrasadas', value: allTasks.filter(t => t.late).length, color: '#DC2626' },
    ],
    statusOptions: ['Todos os status'].concat(Object.keys(STATUS).map(x => STATUS[x].label)),
    statusKeys: Object.keys(STATUS).map(k => ({ key: k, label: STATUS[k].label })),
    team: teamSel, teamOptions,
    onTeam: (e: React.ChangeEvent<HTMLSelectElement>) => setState(s => ({ ...s, team: e.target.value })),
    teamDot: allTeams ? '#94A3B8' : (tc ? tc.dot : '#94A3B8'),
    teamChipBg: allTeams ? '#FFFFFF' : tc.bg,
    teamChipBorder: allTeams ? '#E2E8F0' : tc.bg,
    teamChipFg: allTeams ? '#334155' : tc.fg,
    goProjects: () => setState(s => ({ ...s, view: 'projects' })),
    goLoose: () => setState(s => ({ ...s, view: 'loose' })),
    goCal: () => setState(s => ({ ...s, view: 'cal' })),
    goPerf: () => setState(s => ({ ...s, view: 'perf' })),
    goReg: () => setState(s => ({ ...s, view: 'reg' })),
    navProjBg: onProjects ? '#FFFFFF' : 'transparent', navProjFg: onProjects ? '#0F172A' : '#64748B', navProjShadow: onProjects ? '0 1px 2px rgba(15,23,42,.10)' : 'none',
    navLooseBg: view === 'loose' ? '#FFFFFF' : 'transparent', navLooseFg: view === 'loose' ? '#0F172A' : '#64748B', navLooseShadow: view === 'loose' ? '0 1px 2px rgba(15,23,42,.10)' : 'none',
    navCalBg: view === 'cal' ? '#FFFFFF' : 'transparent', navCalFg: view === 'cal' ? '#0F172A' : '#64748B', navCalShadow: view === 'cal' ? '0 1px 2px rgba(15,23,42,.10)' : 'none',
    navPerfBg: view === 'perf' ? '#FFFFFF' : 'transparent', navPerfFg: view === 'perf' ? '#0F172A' : '#64748B', navPerfShadow: view === 'perf' ? '0 1px 2px rgba(15,23,42,.10)' : 'none',
    navRegBg: view === 'reg' ? '#FFFFFF' : 'transparent', navRegFg: view === 'reg' ? '#0F172A' : '#64748B', navRegShadow: view === 'reg' ? '0 1px 2px rgba(15,23,42,.10)' : 'none',
    stop: (e: React.MouseEvent) => e.stopPropagation(),
    modalOpen: state.modalOpen,
    modalTitle: draft.editing ? 'Editar projeto' : 'Nova demanda',
    modalNeedsSetup: !st.people.length || !st.requesters.length,
    goRegFromModal: () => setState(s => ({ ...s, modalOpen: false, view: 'reg' })),
    openModal: () => setState(s => ({ ...s, modalOpen: true, draft: blankDraft(s.store), draftError: '' })),
    closeModal: () => setState(s => ({ ...s, modalOpen: false, draftError: '' })),
    isCreating: !draft.editing,
    setKindProject: () => setDraft({ kind: 'project' }),
    setKindLoose: () => setDraft({ kind: 'loose' }),
    isProjDraft, isLooseDraft: !isProjDraft,
    showTaskRows: isProjDraft && !draft.editing,
    kindProjBg: kp.bg, kindProjFg: kp.fg, kindProjShadow: kp.shadow,
    kindLooseBg: kl.bg, kindLooseFg: kl.fg, kindLooseShadow: kl.shadow,
    dName: draft.name, onDName: (e: React.ChangeEvent<HTMLInputElement>) => setDraft({ name: e.target.value }),
    dNamePlaceholder: isProjDraft ? 'Ex.: Campanha de lançamento do produto X' : 'Ex.: Ajuste na arte do post de sábado',
    dDesc: draft.description, onDDesc: (e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft({ description: e.target.value }),
    dRequester: draft.requester, onDRequester: (e: React.ChangeEvent<HTMLSelectElement>) => setDraft({ requester: e.target.value }),
    dOwner: draft.owner, onDOwner: (e: React.ChangeEvent<HTMLSelectElement>) => setDraft({ owner: e.target.value }),
    dTeam: draft.team, onDTeam: (e: React.ChangeEvent<HTMLSelectElement>) => setDraft({ team: e.target.value }),
    dDue: draft.due, onDDue: (e: React.ChangeEvent<HTMLInputElement>) => setDraft({ due: e.target.value }),
    dPriority: draft.priority, onDPriority: (e: React.ChangeEvent<HTMLSelectElement>) => setDraft({ priority: e.target.value }),
    requesterList: st.requesters.map(r => r.name),
    peopleList: st.people.map(p => p.name),
    teamList: st.teams,
    draftTasks: draft.tasks.map((t, i) => ({
      name: t.name, owner: t.owner, due: t.due,
      onName: (e: React.ChangeEvent<HTMLInputElement>) => setDraftTask(i, { name: e.target.value }),
      onOwner: (e: React.ChangeEvent<HTMLSelectElement>) => setDraftTask(i, { owner: e.target.value }),
      onDue: (e: React.ChangeEvent<HTMLInputElement>) => setDraftTask(i, { due: e.target.value }),
      remove: () => setState(s => ({
        ...s,
        draft: s.draft ? {
          ...s.draft,
          tasks: s.draft.tasks.length > 1 ? s.draft.tasks.filter((_, j) => j !== i) : s.draft.tasks,
        } : null,
      })),
    })),
    addTaskRow: () => setState(s => ({
      ...s,
      draft: s.draft ? { ...s.draft, tasks: s.draft.tasks.concat([{ name: '', owner: draft.owner, due: '' }]) } : null,
    })),
    hasDraftError: !!state.draftError, draftError: state.draftError,
    submitDraft,
    submitLabel: draft.editing ? 'Salvar alterações' : isProjDraft ? 'Criar projeto' : 'Criar tarefa avulsa',
    taskEditOpen: !!td,
    taskModalTitle: td ? (td.mode === 'create' ? 'Nova microtarefa' : td.scope === 'loose' ? 'Editar tarefa avulsa' : 'Editar microtarefa') : '',
    tName: td?.name ?? '', onTName: (e: React.ChangeEvent<HTMLInputElement>) => setTaskDraft({ name: e.target.value }),
    tOwner: td?.owner ?? '', onTOwner: (e: React.ChangeEvent<HTMLSelectElement>) => setTaskDraft({ owner: e.target.value }),
    tRequester: td?.requester ?? '', onTRequester: (e: React.ChangeEvent<HTMLSelectElement>) => setTaskDraft({ requester: e.target.value }),
    tDue: td?.due ?? '', onTDue: (e: React.ChangeEvent<HTMLInputElement>) => setTaskDraft({ due: e.target.value }),
    tTag: td?.tag ?? '', onTTag: (e: React.ChangeEvent<HTMLInputElement>) => setTaskDraft({ tag: e.target.value }),
    tPriority: td?.priority ?? 'Média', onTPriority: (e: React.ChangeEvent<HTMLSelectElement>) => setTaskDraft({ priority: e.target.value }),
    tStatus: td?.status ?? 'backlog', onTStatus: (e: React.ChangeEvent<HTMLSelectElement>) => setTaskDraft({ status: e.target.value }),
    tProgress: td?.progress ?? 0, onTProgress: (e: React.ChangeEvent<HTMLInputElement>) => setTaskDraft({ progress: Number(e.target.value) }),
    tIsProj: td ? td.scope === 'project' : true, tIsLoose: td ? td.scope === 'loose' : false,
    tCanDelete: td ? td.mode === 'edit' : false,
    hasTaskError: !!state.taskError, taskError: state.taskError,
    closeTask: () => setState(s => ({ ...s, taskDraft: null, taskError: '' })),
    saveTask,
    deleteTask,
    looseRows, looseEmpty: looseRows.length === 0,
    looseQ: state.looseQ, looseStatus: state.looseStatus,
    onLooseSearch: (e: React.ChangeEvent<HTMLInputElement>) => setState(s => ({ ...s, looseQ: e.target.value })),
    onLooseStatus: (e: React.ChangeEvent<HTMLSelectElement>) => setState(s => ({ ...s, looseStatus: e.target.value })),
    looseKpis: [
      { label: 'Total de avulsas', value: looseAll.length, unit: 'itens', color: '#475569' },
      { label: 'Em desenvolvimento', value: looseAll.filter(t => t.rawStatus === 'dev').length, unit: 'em curso', color: '#2563EB' },
      { label: 'Aguardando aprovação', value: looseAll.filter(t => t.rawStatus === 'aprovacao').length, unit: 'travadas', color: '#D97706' },
      { label: 'Prioridade alta', value: looseAll.filter(t => t.priority === 'Alta').length, unit: 'urgentes', color: '#DC2626' },
    ],
    calWeeks, calCount,
    calLabel: MONTHS_FULL[cal.m] + ' ' + cal.y,
    calWeekdays: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    calPrev: () => setState(s => ({ ...s, cal: { y: cal.m === 0 ? cal.y - 1 : cal.y, m: cal.m === 0 ? 11 : cal.m - 1 } })),
    calNext: () => setState(s => ({ ...s, cal: { y: cal.m === 11 ? cal.y + 1 : cal.y, m: cal.m === 11 ? 0 : cal.m + 1 } })),
    calToday: () => setState(s => ({ ...s, cal: { y: TODAY.getFullYear(), m: TODAY.getMonth() } })),
    calLegend: Object.keys(STATUS).map(s2 => ({ label: STATUS[s2].label, color: STATUS[s2].fg })).concat([{ label: 'Atrasada', color: '#DC2626' }]),
    perfEmpty, perfHasData: !perfEmpty, perfMonth, monthOptions,
    onPerfMonth: (e: React.ChangeEvent<HTMLSelectElement>) => setState(s => ({ ...s, perfMonth: e.target.value })),
    peopleCount: st.people.length, reqCount: st.requesters.length, teamCount: st.teams.length,
    regPeople: st.people.map(p => {
      const c = M.PEOPLE[p.name] || PALETTE[7]
      const tcm = M.TEAMS[p.team] || PALETTE[7]
      return {
        name: p.name, role: p.role, team: p.team, initials: initials(p.name), bg: c.bg, fg: c.fg, teamBg: tcm.bg, teamFg: tcm.fg,
        remove: () => { if (window.confirm('Remover ' + p.name + '? As tarefas existentes continuam com o nome registrado.')) mutate(s => { s.people = s.people.filter(x => x.name !== p.name) }) },
      }
    }),
    regReqs: st.requesters.map(r => {
      const c = M.REQ[r.name] || { bg: '#F1F5F9', fg: '#475569' }
      return {
        name: r.name, role: r.role, initials: initials(r.name), bg: c.bg, fg: c.fg,
        remove: () => { if (window.confirm('Remover requerente ' + r.name + '?')) mutate(s => { s.requesters = s.requesters.filter(x => x.name !== r.name) }) },
      }
    }),
    regTeams: st.teams.map(t => {
      const tcm = M.TEAMS[t] || PALETTE[7]
      const count = st.people.filter(p => p.team === t).length
      return {
        name: t, dot: tcm.dot, count,
        remove: () => {
          if (count > 0) { setState(s => ({ ...s, regError: 'A equipe "' + t + '" tem colaboradores vinculados — mova-os antes de remover.' })); return }
          if (st.teams.length <= 1) { setState(s => ({ ...s, regError: 'É preciso manter ao menos uma equipe.' })); return }
          if (window.confirm('Remover equipe ' + t + '?')) mutate(s => { s.teams = s.teams.filter(x => x !== t) }, { regError: '' })
        },
      }
    }),
    pName: state.pName, onPName: (e: React.ChangeEvent<HTMLInputElement>) => setState(s => ({ ...s, pName: e.target.value, regError: '' })),
    pRole: state.pRole, onPRole: (e: React.ChangeEvent<HTMLInputElement>) => setState(s => ({ ...s, pRole: e.target.value })),
    pTeam: st.teams.indexOf(state.pTeam) >= 0 ? state.pTeam : st.teams[0],
    onPTeam: (e: React.ChangeEvent<HTMLSelectElement>) => setState(s => ({ ...s, pTeam: e.target.value })),
    addPerson: () => {
      const n = state.pName.trim()
      if (!n) return setState(s => ({ ...s, regError: 'Informe o nome do colaborador.' }))
      if (st.people.some(p => p.name.toLowerCase() === n.toLowerCase())) return setState(s => ({ ...s, regError: 'Já existe um colaborador com esse nome.' }))
      const tmv = st.teams.indexOf(state.pTeam) >= 0 ? state.pTeam : st.teams[0]
      mutate(s => { s.people.push({ name: n, role: state.pRole.trim() || 'Colaborador(a)', team: tmv }) }, { pName: '', pRole: '', regError: '' })
    },
    rName: state.rName, onRName: (e: React.ChangeEvent<HTMLInputElement>) => setState(s => ({ ...s, rName: e.target.value, regError: '' })),
    rRole: state.rRole, onRRole: (e: React.ChangeEvent<HTMLInputElement>) => setState(s => ({ ...s, rRole: e.target.value })),
    addRequester: () => {
      const n = state.rName.trim()
      if (!n) return setState(s => ({ ...s, regError: 'Informe o nome do requerente.' }))
      if (st.requesters.some(r => r.name.toLowerCase() === n.toLowerCase())) return setState(s => ({ ...s, regError: 'Já existe um requerente com esse nome.' }))
      mutate(s => { s.requesters.push({ name: n, role: state.rRole.trim() || 'Solicitante' }) }, { rName: '', rRole: '', regError: '' })
    },
    tmName: state.tmName, onTmName: (e: React.ChangeEvent<HTMLInputElement>) => setState(s => ({ ...s, tmName: e.target.value, regError: '' })),
    addTeam: () => {
      const n = state.tmName.trim()
      if (!n) return setState(s => ({ ...s, regError: 'Informe o nome da equipe.' }))
      if (st.teams.some(t => t.toLowerCase() === n.toLowerCase())) return setState(s => ({ ...s, regError: 'Essa equipe já existe.' }))
      mutate(s => { s.teams.push(n) }, { tmName: '', regError: '' })
    },
    hasRegError: !!state.regError, regError: state.regError,
    cur: cur || {},
    overall: cur?.progress ?? 0,
    overallW: (cur?.progress ?? 0) + '%',
    totalTasks: 0, visibleCount: 0, columns: [] as RenderVals[],
    rows: [] as RenderVals[], empty: false,
    isKanban: false, isTable: false, isGantt: false,
    kanbanBg: 'transparent', kanbanFg: '#64748B', kanbanShadow: 'none',
    tableBg: 'transparent', tableFg: '#64748B', tableShadow: 'none',
    ganttBg: 'transparent', ganttFg: '#64748B', ganttShadow: 'none',
    ganttTicks: [] as RenderVals[], ganttRows: [] as RenderVals[],
    todayLeft: '0%', todayVisible: false,
    ganttLegend: Object.keys(STATUS).map(s2 => ({ label: STATUS[s2].label, bg: STATUS[s2].bg, fg: STATUS[s2].fg })).concat([{ label: 'Atrasada', bg: '#FEE2E2', fg: '#DC2626' }]),
    kpis: [] as RenderVals[],
    q: state.q, owner: state.owner, requester: state.requester, status: state.status,
    ownerOptions: ['Todos os responsáveis'],
    requesterOptions: ['Todos os requerentes'],
    lateBg: state.lateOnly ? '#FEF2F2' : '#FFFFFF',
    lateFg: state.lateOnly ? '#DC2626' : '#334155',
    lateBorder: state.lateOnly ? '#FECACA' : '#E2E8F0',
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => setState(s => ({ ...s, q: e.target.value })),
    onOwner: (e: React.ChangeEvent<HTMLSelectElement>) => setState(s => ({ ...s, owner: e.target.value })),
    onRequester: (e: React.ChangeEvent<HTMLSelectElement>) => setState(s => ({ ...s, requester: e.target.value })),
    onStatus: (e: React.ChangeEvent<HTMLSelectElement>) => setState(s => ({ ...s, status: e.target.value })),
    onLate: () => setState(s => ({ ...s, lateOnly: !s.lateOnly })),
    setKanban: () => setState(s => ({ ...s, board: 'kanban' })),
    setTable: () => setState(s => ({ ...s, board: 'table' })),
    setGantt: () => setState(s => ({ ...s, board: 'gantt' })),
    addMicroTask: () => {},
    editProject: () => {},
    deleteProject: () => {},
    ranking: [] as RenderVals[],
    attention: [] as RenderVals[],
    highlights: [] as RenderVals[],
    perfKpis: [] as RenderVals[],
    teamAvg: 0, aboveCount: 0, belowCount: 0, aboveW: '0%', belowW: '0%',
  }

  if (!perfEmpty) {
    const maxDelivered = Math.max(...people.map(p => p.delivered))
    const speeds = people.filter(p => p.avgDays > 0)
    const avgDaysTeam = speeds.length ? speeds.reduce((s2, p) => s2 + p.avgDays, 0) / speeds.length : 0
    let ranked: Array<Record<string, unknown>> = people.map(p => {
      const c = M.PEOPLE[p.n] || PALETTE[7]
      const tcm = M.TEAMS[M.TEAM_OF[p.n]] || PALETTE[7]
      const onTime = p.delivered ? (p.delivered - p.lateDone) / p.delivered : 0
      const speed = p.avgDays > 0 && avgDaysTeam > 0 ? Math.max(0, Math.min(1, avgDaysTeam / p.avgDays * 0.6)) : 0.3
      const volume = maxDelivered > 0 ? p.delivered / maxDelivered : 0
      const score = Math.min(10, round1((onTime * 5 + speed * 3 + volume * 2) * 1.05))
      const compl = p.assigned ? p.delivered / p.assigned : 0
      return {
        name: p.n, role: M.ROLES[p.n] || '', initials: initials(p.n), bg: c.bg, fg: c.fg,
        team: M.TEAM_OF[p.n] || '', teamBg: tcm.bg, teamFg: tcm.fg,
        delivered: p.delivered, assigned: p.assigned, projects: p.projects, avgDays: round1(p.avgDays), late: p.late,
        completion: Math.round(compl * 100) + '%', completionW: Math.round(compl * 100) + '%',
        completionColor: compl >= 0.8 ? '#16A34A' : compl >= 0.6 ? '#D97706' : '#DC2626',
        openTasks: p.assigned - p.delivered,
        score,
        lateColor: p.late >= 3 ? '#DC2626' : p.late > 0 ? '#D97706' : '#16A34A',
        speedColor: p.avgDays > avgDaysTeam ? '#D97706' : '#16A34A',
      }
    }).sort((a, b) => b.score - a.score)
    const teamAvg = round1(ranked.reduce((s2, p) => s2 + p.score, 0) / ranked.length)
    ranked = ranked.map((p, i) => ({
      ...p,
      rank: i + 1,
      below: p.score < teamAvg,
      rowBg: p.score < teamAvg ? '#FEF7F7' : '#FFFFFF',
      rankColor: i === 0 ? '#D97706' : '#94A3B8',
      scoreColor: p.score < teamAvg ? '#DC2626' : p.score >= teamAvg + 0.6 ? '#16A34A' : '#2563EB',
      scoreW: (p.score * 10) + '%',
    }))
    const belowList = ranked.filter(p => p.below as boolean)
    const worstLate = ranked.slice().sort((a, b) => b.late - a.late)[0]
    const totalDelivered = ranked.reduce((s2, p) => s2 + p.delivered, 0)
    const totalAssigned = ranked.reduce((s2, p) => s2 + p.assigned, 0)
    const totalLate = ranked.reduce((s2, p) => s2 + p.late, 0)
    const projDone = st.projects.filter(p => p.tasks.length && p.tasks.every(t => t.completedAt) && p.tasks.map(t => t.completedAt).sort().reverse()[0]! >= msIso && p.tasks.map(t => t.completedAt).sort().reverse()[0]! <= meIso).length
    Object.assign(vals, {
      ranking: ranked, teamAvg,
      aboveCount: ranked.length - belowList.length, belowCount: belowList.length,
      aboveW: Math.round((ranked.length - belowList.length) / ranked.length * 100) + '%',
      belowW: Math.round(belowList.length / ranked.length * 100) + '%',
      perfKpis: [
        { label: 'Entregues / atribuídas', value: totalDelivered, unit: 'de ' + totalAssigned + ' atribuídas', color: '#475569', valueColor: '#0F172A', sub: projDone + ' projeto(s) macro finalizados', subColor: '#64748B' },
        { label: 'Tempo médio de execução', value: round1(avgDaysTeam), unit: 'dias/tarefa', color: '#2563EB', valueColor: '#0F172A', sub: 'Da abertura à conclusão', subColor: '#64748B' },
        { label: 'Mais tarefas atrasadas', value: worstLate.late, unit: 'atrasos', color: '#DC2626', valueColor: worstLate.late ? '#DC2626' : '#16A34A', sub: worstLate.late ? worstLate.name + (worstLate.role ? ' · ' + worstLate.role : '') : 'Ninguém com atraso', subColor: worstLate.late ? '#DC2626' : '#16A34A' },
        { label: 'Total de atrasos da equipe', value: totalLate, unit: 'no mês', color: '#D97706', valueColor: '#0F172A', sub: totalDelivered ? Math.round(totalLate / totalDelivered * 100) + '% das entregas fora do prazo' : 'Nenhuma entrega registrada ainda', subColor: '#64748B' },
      ],
      attention: belowList.map(p => ({
        name: p.name, initials: p.initials, bg: p.bg, fg: p.fg,
        note: 'Nota ' + p.score + ' (média ' + teamAvg + '). ' + p.late + ' entrega(s) fora do prazo e tempo médio de ' + p.avgDays + ' dias — agendar feedback 1:1.',
      })),
      highlights: ranked.filter(p => !(p.below as boolean)).slice(0, 3).map(p => ({
        name: p.name, initials: p.initials, bg: p.bg, fg: p.fg,
        note: 'Nota ' + p.score + ' · ' + p.delivered + ' entregas em ' + p.projects + ' projeto(s), ' + p.late + ' atraso(s).',
      })),
    })
  }

  if (cur && view === 'detail') {
    const board = state.board || DEFAULT_VIEW
    const q = state.q.trim().toLowerCase()
    const tasks = cur.tasks
    const filtered = tasks.filter(t =>
      inTeam(t) &&
      (!q || String(t.name).toLowerCase().includes(q) || String(t.code).toLowerCase().includes(q) || String(t.tag || '').toLowerCase().includes(q)) &&
      (state.owner.startsWith('Todos') || t.owner === state.owner) &&
      (state.requester.startsWith('Todos') || t.requester === state.requester) &&
      (state.status.startsWith('Todos') || t.status === state.status) &&
      (!state.lateOnly || t.late)
    ).map(t => ({
      ...t,
      openEdit: () => openTask('project', cur.id, String(t.id)),
      drag: () => { dragRef.current = String(t.id) },
    }))
    const columns = Object.keys(STATUS).map(key => {
      const col = filtered.filter(t => t.rawStatus === key)
      return {
        key, label: STATUS[key].label, color: STATUS[key].dot, count: col.length, tasks: col,
        over: (e: React.DragEvent) => e.preventDefault(),
        drop: () => dropOn(cur.id, key),
      }
    })
    const dev = tasks.filter(t => t.rawStatus === 'dev').length
    const wait = tasks.filter(t => t.rawStatus === 'aprovacao').length
    const active = { bg: '#FFFFFF', fg: '#0F172A', shadow: '0 1px 2px rgba(15,23,42,.10)' }
    const idle = { bg: 'transparent', fg: '#64748B', shadow: 'none' }
    const k = board === 'kanban' ? active : idle
    const tb = board === 'table' ? active : idle
    const gt = board === 'gantt' ? active : idle

    const gItems = filtered.map(t => {
      const end = new Date(String(t.due) + 'T00:00:00')
      let start = new Date((String(t.createdAt || t.due)) + 'T00:00:00')
      if (start >= end) start = new Date(end.getTime() - 2 * DAY)
      return { t, start, end }
    })
    let ganttTicks: RenderVals[] = []
    let ganttRows: RenderVals[] = []
    let todayLeft = '0%'
    let todayVisible = false
    if (gItems.length) {
      const gMin = Math.min(...gItems.map(x => x.start.getTime()).concat([TODAY.getTime()])) - 2 * DAY
      const gMax = Math.max(...gItems.map(x => x.end.getTime()).concat([TODAY.getTime()])) + 3 * DAY
      const span = gMax - gMin
      const pctOf = (ms: number) => Math.max(0, Math.min(100, (ms - gMin) / span * 100))
      let tick = new Date(gMin); tick.setHours(0, 0, 0, 0)
      while (tick.getDay() !== 1) tick = new Date(tick.getTime() + DAY)
      const step = span > 60 * DAY ? 14 : 7
      for (let d2 = new Date(tick); d2.getTime() <= gMax; d2 = new Date(d2.getTime() + step * DAY)) {
        ganttTicks.push({ label: fmt(d2), left: pctOf(d2.getTime()).toFixed(2) + '%' })
      }
      todayLeft = pctOf(TODAY.getTime()).toFixed(2) + '%'
      todayVisible = true
      ganttRows = gItems.slice().sort((a, b) => a.end.getTime() - b.end.getTime()).map(x => {
        const l = pctOf(x.start.getTime()), r2 = pctOf(x.end.getTime())
        return {
          name: x.t.name, owner: x.t.owner, status: x.t.status, initials: x.t.initials, avBg: x.t.avBg, avFg: x.t.avFg,
          openEdit: x.t.openEdit,
          left: l.toFixed(2) + '%', width: Math.max(r2 - l, 1.5).toFixed(2) + '%', labelLeft: r2.toFixed(2) + '%',
          barBg: x.t.late ? '#FEE2E2' : x.t.badgeBg, barFg: x.t.late ? '#DC2626' : x.t.badgeFg,
          fill: x.t.progress + '%', dueLabel: x.t.dueLabel, dueFg: x.t.dueFg,
          tooltip: x.t.name + ' · ' + x.t.owner + ' · entrega ' + x.t.dueLabel + ' · ' + x.t.progress + '%',
        }
      })
    }

    const ownersHere: string[] = []
    const reqsHere: string[] = []
    tasks.forEach(t => { if (ownersHere.indexOf(String(t.owner)) < 0) ownersHere.push(String(t.owner)); if (reqsHere.indexOf(String(t.requester)) < 0) reqsHere.push(String(t.requester)) })

    Object.assign(vals, {
      cur, overall: cur.progress, overallW: cur.progress + '%',
      totalTasks: tasks.length, visibleCount: filtered.length,
      columns, rows: filtered,
      empty: filtered.length === 0,
      isKanban: board === 'kanban' && filtered.length > 0,
      isTable: board === 'table' && filtered.length > 0,
      isGantt: board === 'gantt' && filtered.length > 0,
      kanbanBg: k.bg, kanbanFg: k.fg, kanbanShadow: k.shadow,
      tableBg: tb.bg, tableFg: tb.fg, tableShadow: tb.shadow,
      ganttBg: gt.bg, ganttFg: gt.fg, ganttShadow: gt.shadow,
      ganttTicks, ganttRows, todayLeft, todayVisible,
      ownerOptions: ['Todos os responsáveis'].concat(ownersHere),
      requesterOptions: ['Todos os requerentes'].concat(reqsHere),
      kpis: [
        { label: 'Total de microtarefas', value: tasks.length, unit: 'itens', icon: '≡', color: '#475569', bg: '#F1F5F9', sub: (tasks.length - cur.done) + ' em aberto no board', subColor: '#64748B' },
        { label: 'Em desenvolvimento', value: dev, unit: 'em curso', icon: '◐', color: '#2563EB', bg: '#EFF6FF', sub: 'Distribuídas entre ' + cur.team.length + ' responsáveis', subColor: '#64748B' },
        { label: 'Aguardando aprovação', value: wait, unit: 'travadas', icon: '!', color: '#D97706', bg: '#FFFBEB', sub: cur.lateCount + ' item(ns) com prazo estourado', subColor: cur.lateCount ? '#DC2626' : '#64748B' },
        { label: 'Concluídas', value: cur.done, unit: 'de ' + tasks.length, icon: '✓', color: '#16A34A', bg: '#F0FDF4', sub: cur.progress + '% de progresso geral', subColor: '#16A34A' },
      ],
      addMicroTask: () => setState(s => ({
        ...s,
        taskDraft: {
          mode: 'create', scope: 'project', projId: cur.id, taskId: null,
          name: '', owner: st.people[0] ? st.people[0].name : '', requester: cur.requester,
          due: '', tag: '', priority: 'Média', status: 'backlog', progress: 0,
        },
        taskError: '',
      })),
      editProject: () => setState(s => ({
        ...s,
        modalOpen: true, draftError: '',
        draft: {
          kind: 'project', editing: cur.id, name: cur.name, description: cur.description,
          requester: cur.requester, owner: st.people[0] ? st.people[0].name : '',
          team: cur.teamName, due: st.projects.find(x => x.id === cur.id)?.due ?? '',
          priority: 'Média', tasks: [],
        },
      })),
      deleteProject: () => {
        if (window.confirm('Excluir o projeto "' + cur.name + '" e todas as suas microtarefas?')) {
          mutate(s => { s.projects = s.projects.filter(x => x.id !== cur.id) }, { view: 'projects', projectId: null })
        }
      },
    })
  }

  return vals
}
