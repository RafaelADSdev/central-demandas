import type { Person } from './types'

const SESSION_KEY = 'central-demandas-session'

export type AuthSession = {
  name: string
  role: string
  isAdmin: boolean
}

export function isAdminRole(role: string) {
  return role.trim().toUpperCase() === 'ADM'
}

export function loadSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as AuthSession
    if (!data?.name) return null
    return {
      name: data.name,
      role: data.role ?? '',
      isAdmin: Boolean(data.isAdmin),
    }
  } catch {
    return null
  }
}

export function saveSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function sessionFromPerson(person: Person): AuthSession {
  return {
    name: person.name,
    role: person.role,
    isAdmin: isAdminRole(person.role),
  }
}

export function validateLogin(name: string, password: string, people: Person[]): AuthSession | null {
  const trimmed = name.trim()
  if (!trimmed) return null
  const person = people.find(p => p.name.toLowerCase() === trimmed.toLowerCase())
  if (!person) return null
  const stored = person.password ?? ''
  if (stored !== password) return null
  return sessionFromPerson(person)
}

export function sessionStillValid(session: AuthSession, people: Person[]) {
  const person = people.find(p => p.name === session.name)
  if (!person) return false
  return sessionFromPerson(person).isAdmin === session.isAdmin
    && sessionFromPerson(person).role === session.role
}
