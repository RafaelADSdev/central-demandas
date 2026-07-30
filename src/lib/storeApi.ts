import { supabase, supabaseConfigured } from './supabase'
import type { Store } from './types'
import { defaultStore, loadStore, saveStore } from './utils'

const ROW_ID = 'main'

function normalizeStore(raw: unknown): Store {
  const store = raw as Store
  if (!store || !Array.isArray(store.projects)) return defaultStore()
  if (!Array.isArray(store.teams) || !store.teams.length) store.teams = defaultStore().teams
  if (!Array.isArray(store.people)) store.people = []
  if (!Array.isArray(store.requesters)) store.requesters = []
  if (!Array.isArray(store.loose)) store.loose = []
  if (typeof store.seq !== 'number') store.seq = 1
  return store
}

function hasLocalData(store: Store) {
  return store.people.length > 0
    || store.requesters.length > 0
    || store.projects.length > 0
    || store.loose.length > 0
}

export async function fetchStore(): Promise<Store> {
  if (!supabaseConfigured || !supabase) return loadStore()

  const { data, error } = await supabase
    .from('app_store')
    .select('payload')
    .eq('id', ROW_ID)
    .maybeSingle()

  if (error) {
    console.error('[supabase] fetch failed, using localStorage', error)
    return loadStore()
  }

  const payload = data?.payload
  if (payload && typeof payload === 'object' && Object.keys(payload as object).length > 0) {
    const remote = normalizeStore(payload)
    if (hasLocalData(remote)) return remote
  }

  const local = loadStore()
  if (hasLocalData(local)) {
    await persistStore(local)
    return local
  }

  const fresh = defaultStore()
  await persistStore(fresh)
  return fresh
}

export async function persistStore(store: Store): Promise<void> {
  saveStore(store)

  if (!supabaseConfigured || !supabase) return

  const { error } = await supabase
    .from('app_store')
    .upsert({
      id: ROW_ID,
      payload: store,
      updated_at: new Date().toISOString(),
    })

  if (error) console.error('[supabase] save failed (localStorage kept)', error)
}

export function subscribeStore(onRemote: (store: Store) => void) {
  if (!supabaseConfigured || !supabase) return () => {}

  const channel = supabase
    .channel('app_store_changes')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'app_store', filter: `id=eq.${ROW_ID}` },
      (payload) => {
        const next = normalizeStore((payload.new as { payload?: unknown }).payload)
        onRemote(next)
      },
    )
    .subscribe()

  return () => {
    void supabase!.removeChannel(channel)
  }
}
