export interface Person {
  name: string
  role: string
  team: string
  password?: string
}

export interface Requester {
  name: string
  role: string
}

export interface Task {
  id: string
  code: string
  name: string
  owner: string
  requester: string
  status: string
  progress: number
  due: string
  createdAt: string
  completedAt: string | null
  tag?: string
  priority?: string
}

export interface Project {
  id: string
  code: string
  name: string
  description: string
  requester: string
  due: string
  team: string
  createdAt: string
  tasks: Task[]
}

export interface Store {
  teams: string[]
  people: Person[]
  requesters: Requester[]
  projects: Project[]
  loose: Task[]
  seq: number
}

export interface DraftTask {
  name: string
  owner: string
  due: string
}

export interface Draft {
  kind: 'project' | 'loose'
  editing: string | null
  name: string
  description: string
  requester: string
  owner: string
  team: string
  due: string
  priority: string
  tasks: DraftTask[]
}

export interface TaskDraft {
  mode: 'create' | 'edit'
  scope: 'project' | 'loose'
  projId: string | null
  taskId: string | null
  name: string
  owner: string
  requester: string
  due: string
  tag: string
  priority: string
  status: string
  progress: number
}

export type View = 'projects' | 'detail' | 'loose' | 'cal' | 'perf' | 'reg'
export type Board = 'kanban' | 'table' | 'gantt'

export interface AppState {
  store: Store
  team: string
  view: View
  projectId: string | null
  q: string
  owner: string
  requester: string
  status: string
  lateOnly: boolean
  board: Board | null
  looseQ: string
  looseStatus: string
  modalOpen: boolean
  draft: Draft | null
  draftError: string
  taskDraft: TaskDraft | null
  taskError: string
  cal: { y: number; m: number } | null
  perfMonth: string | null
  pName: string
  pRole: string
  pPassword: string
  pPasswordVisible: boolean
  pTeam: string
  pwdEditName: string | null
  pwdEditValue: string
  pwdReveal: Record<string, boolean>
  rName: string
  rRole: string
  tmName: string
  regError: string
}
