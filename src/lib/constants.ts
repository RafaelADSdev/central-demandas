export const LS_KEY = 'central-demandas-v1'
export const DAY = 86400000

export const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
export const MONTHS_FULL = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

export const STATUS: Record<string, { label: string; fg: string; bg: string; dot: string }> = {
  backlog:   { label: 'Backlog',              fg: '#64748B', bg: '#F1F5F9', dot: '#94A3B8' },
  dev:       { label: 'Em Desenvolvimento',   fg: '#2563EB', bg: '#EFF6FF', dot: '#3B82F6' },
  aprovacao: { label: 'Aguardando Aprovação', fg: '#D97706', bg: '#FFFBEB', dot: '#F59E0B' },
  concluido: { label: 'Concluído',            fg: '#16A34A', bg: '#F0FDF4', dot: '#22C55E' },
}

export const PRIORITY: Record<string, { fg: string; bg: string }> = {
  Alta:  { fg: '#DC2626', bg: '#FEF2F2' },
  Média: { fg: '#D97706', bg: '#FFFBEB' },
  Baixa: { fg: '#64748B', bg: '#F1F5F9' },
}

export const PALETTE = [
  { bg: '#EDE9FE', fg: '#6D28D9', dot: '#8B5CF6' },
  { bg: '#E0F2FE', fg: '#0369A1', dot: '#0EA5E9' },
  { bg: '#DCFCE7', fg: '#15803D', dot: '#22C55E' },
  { bg: '#FFEDD5', fg: '#C2410C', dot: '#F97316' },
  { bg: '#FCE7F3', fg: '#BE185D', dot: '#EC4899' },
  { bg: '#DBEAFE', fg: '#1D4ED8', dot: '#3B82F6' },
  { bg: '#FEF9C3', fg: '#A16207', dot: '#EAB308' },
  { bg: '#F1F5F9', fg: '#475569', dot: '#94A3B8' },
]

export const DEFAULT_VIEW: 'kanban' | 'table' | 'gantt' = 'table'
