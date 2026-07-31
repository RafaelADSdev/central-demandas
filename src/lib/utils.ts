import type { CSSProperties } from 'react'
import type { Store } from './types'
import { ensureSeedUser } from './seed'

function parseCss(str: string): CSSProperties {
  const o: Record<string, string> = {}
  str.split(';').forEach(part => {
    const idx = part.indexOf(':')
    if (idx < 0) return
    const k = part.slice(0, idx).trim()
    const v = part.slice(idx + 1).trim()
    if (!k || !v) return
    const camel = k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    o[camel] = v
  })
  return o as CSSProperties
}

function resolvePath(scope: Record<string, unknown>, path: string): string {
  const parts = path.split('.')
  let val: unknown = scope
  for (const p of parts) {
    val = (val as Record<string, unknown>)?.[p]
  }
  return String(val ?? '')
}

/** Parse inline CSS; optional scope replaces `{prop}` placeholders */
export function css(str: string, scope?: Record<string, unknown>): CSSProperties {
  let resolved = str
  if (scope) {
    resolved = str.replace(/\{([^}]+)\}/g, (_, path: string) => resolvePath(scope, path.trim()))
  }
  return parseCss(resolved)
}

export function todayZero() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function isoOf(d: Date) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
}

export function round1(n: number) {
  return Math.round(n * 10) / 10
}

export function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function initials(name: string) {
  return String(name || '?').split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
}

export function fmt(d: Date) {
  return d.getDate() + ' ' + ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'][d.getMonth()]
}

export function fmtFull(d: Date) {
  return fmt(d) + ' ' + d.getFullYear()
}

export function uid() {
  return 'id' + Date.now().toString(36) + Math.floor(Math.random() * 1e5).toString(36)
}

export function defaultStore(): Store {
  const store: Store = {
    teams: ['Marketing', 'Tecnologia', 'Financeiro', 'Secretaria de Vendas'],
    people: [],
    requesters: [],
    projects: [],
    loose: [],
    seq: 1,
  }
  ensureSeedUser(store)
  return store
}

export function loadStore(): Store {
  try {
    const raw = localStorage.getItem('central-demandas-v1')
    if (raw) {
      const store = JSON.parse(raw) as Store
      if (store && Array.isArray(store.projects)) {
        if (!Array.isArray(store.teams) || !store.teams.length) store.teams = defaultStore().teams
        ensureSeedUser(store)
        return store
      }
    }
  } catch { /* ignore */ }
  return defaultStore()
}

export function saveStore(s: Store) {
  try { localStorage.setItem('central-demandas-v1', JSON.stringify(s)) } catch { /* ignore */ }
}
