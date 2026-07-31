import { useCentralDemandas } from './hooks/useCentralDemandas'
import { useAuth } from './hooks/useAuth'
import { AppView } from './AppView'
import { LoginView } from './LoginView'
import { css } from './lib/utils'

function LoadingScreen({ message }: { message: string }) {
  return (
    <div style={css('min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F8FAFC;color:#64748B;font-family:Inter,system-ui,sans-serif;font-size:14px')}>
      {message}
    </div>
  )
}

function Dashboard({ auth }: { auth: ReturnType<typeof useAuth> }) {
  const v = useCentralDemandas({ isAdmin: auth.isAdmin })

  if (v.loading) {
    return <LoadingScreen message="Carregando dados..." />
  }

  if (v.peopleCount > 0 && !auth.user) {
    return <LoginView onLogin={auth.signIn} />
  }

  return (
    <>
      {auth.requiresAuth && auth.user ? (
        <div style={css('display:flex;align-items:center;justify-content:flex-end;gap:12px;padding:8px 32px;background:#FFFFFF;border-bottom:1px solid #E2E8F0;font-size:12.5px;color:#64748B')}>
          <span>{auth.user.name}{auth.user.isAdmin ? ' · ADM' : ''}</span>
          <button
            type="button"
            onClick={() => void auth.signOut()}
            style={css('padding:5px 10px;border:1px solid #E2E8F0;border-radius:7px;background:#F8FAFC;color:#475569;font-size:12px;font-weight:600;cursor:pointer')}
          >
            Sair
          </button>
        </div>
      ) : null}
      {v.syncError ? (
        <div style={css('background:#FFFBEB;border-bottom:1px solid #FDE68A;color:#92400E;padding:10px 16px;font-size:12.5px;text-align:center;font-family:Inter,system-ui,sans-serif')}>
          {v.syncError}
        </div>
      ) : null}
      <AppView v={v} />
    </>
  )
}

export default function App() {
  const auth = useAuth()

  if (auth.loading) {
    return <LoadingScreen message="Verificando sessão..." />
  }

  if (auth.requiresAuth && !auth.user) {
    return <LoginView onLogin={auth.signIn} />
  }

  return <Dashboard auth={auth} />
}
