import { useCentralDemandas } from './hooks/useCentralDemandas'
import { AppView } from './AppView'
import { css } from './lib/utils'

export default function App() {
  const v = useCentralDemandas()

  if (v.loading) {
    return (
      <div style={css('min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F8FAFC;color:#64748B;font-family:Inter,system-ui,sans-serif;font-size:14px')}>
        Carregando dados...
      </div>
    )
  }

  return (
    <>
      {v.syncError ? (
        <div style={css('background:#FFFBEB;border-bottom:1px solid #FDE68A;color:#92400E;padding:10px 16px;font-size:12.5px;text-align:center;font-family:Inter,system-ui,sans-serif')}>
          {v.syncError}
        </div>
      ) : null}
      <AppView v={v} />
    </>
  )
}
