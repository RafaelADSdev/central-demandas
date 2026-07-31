import { useCallback, useEffect, useState } from 'react'
import {
  type AuthSession,
  clearSession,
  loadSession,
  saveSession,
  validateLogin,
} from '../lib/auth'
import { fetchStore } from '../lib/storeApi'

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [peopleCount, setPeopleCount] = useState(0)

  useEffect(() => {
    let active = true
    fetchStore()
      .then(store => {
        if (!active) return
        setPeopleCount(store.people.length)
        const saved = loadSession()
        if (saved && store.people.some(p => p.name === saved.name)) {
          setSession(saved)
        } else if (saved) {
          clearSession()
        }
        setLoading(false)
      })
      .catch(() => {
        if (!active) return
        setPeopleCount(0)
        setSession(loadSession())
        setLoading(false)
      })
    return () => { active = false }
  }, [])

  const signIn = useCallback(async (name: string, password: string) => {
    const store = await fetchStore()
    setPeopleCount(store.people.length)
    const next = validateLogin(name, password, store.people)
    if (!next) throw new Error('Nome ou senha incorretos.')
    saveSession(next)
    setSession(next)
  }, [])

  const signOut = useCallback(async () => {
    clearSession()
    setSession(null)
  }, [])

  const requiresAuth = peopleCount > 0

  return {
    user: session,
    loading,
    signIn,
    signOut,
    requiresAuth,
    isAdmin: session?.isAdmin ?? false,
  }
}

export type AuthState = ReturnType<typeof useAuth>
