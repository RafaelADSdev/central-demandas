import type { Store } from './types'

const SEED_USER = {
  name: 'Rafael Arcanjo',
  role: 'ADM',
  team: 'Tecnologia',
  password: '870802',
}

export function ensureSeedUser(store: Store): boolean {
  const idx = store.people.findIndex(p => p.name.toLowerCase() === SEED_USER.name.toLowerCase())
  if (idx < 0) {
    const team = store.teams.includes(SEED_USER.team) ? SEED_USER.team : store.teams[0]
    store.people.push({ name: SEED_USER.name, role: SEED_USER.role, team, password: SEED_USER.password })
    return true
  }
  const person = store.people[idx]
  const changed = person.password !== SEED_USER.password || person.role !== SEED_USER.role
  if (changed) {
    person.password = SEED_USER.password
    person.role = SEED_USER.role
  }
  if (!store.teams.includes(person.team)) {
    person.team = store.teams[0]
    return true
  }
  return changed
}
