import { useEffect, useRef, useState, type FormEvent } from 'react'
import { css } from './lib/utils'

type LoginViewProps = {
  onLogin: (name: string, password: string) => Promise<void>
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  useEffect(() => {
    if (error) errorRef.current?.focus()
  }, [error])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedName = name.trim()
    if (!trimmedName || !password) {
      setError('Preencha o nome cadastrado e a senha.')
      return
    }

    setSubmitting(true)
    try {
      await onLogin(trimmedName, password)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível entrar. Tente novamente.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const fieldStyle = css(
    'width:100%;box-sizing:border-box;min-height:48px;padding:12px 14px;border:1px solid #E2E8F0;border-radius:12px;font-size:14px;outline:none;background:#FFFFFF;color:#0F172A',
  )

  return (
    <div className="login-shell" style={css('min-height:100vh;display:flex;background:#FFFFFF;color:#0F172A')}>
      <section
        style={css('flex:0 0 auto;width:min(460px,100%);display:flex;flex-direction:column;justify-content:space-between;padding:36px 40px 28px;box-sizing:border-box;background:#FFFFFF;border-right:1px solid #E2E8F0')}
      >
        <div>
          <div style={css('display:flex;align-items:center;gap:16px;margin-bottom:48px;flex-wrap:wrap')}>
            <img src="/brand/hubon-logo.png" alt="hubon" style={css('height:24px;width:auto;display:block')} />
            <span style={css('width:1px;height:28px;background:#E2E8F0')} aria-hidden="true" />
            <img src="/brand/axis-logo.png" alt="axis Inteligência Imobiliária" style={css('height:28px;width:auto;display:block')} />
          </div>

          <div style={css('display:flex;flex-direction:column;gap:8px;margin-bottom:32px')}>
            <span style={css('font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#64748B')}>
              Central de Demandas
            </span>
            <h1 style={css('margin:0;font-size:32px;line-height:1.15;font-weight:700;letter-spacing:-.03em;color:#0F172A')}>
              Bem-vindo de volta
            </h1>
            <p style={css('margin:0;font-size:14px;color:#475569')}>
              Acesse com suas credenciais para continuar.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-busy={submitting}
            noValidate
            style={css('display:flex;flex-direction:column;gap:18px')}
          >
            {error ? (
              <div
                ref={errorRef}
                id="login-error"
                role="alert"
                tabIndex={-1}
                style={css('padding:12px 14px;border-radius:10px;background:#FEF2F2;border:1px solid #FECACA;color:#B91C1C;font-size:12.5px;font-weight:500;outline:none')}
              >
                <div>{error}</div>
                <div style={css('margin-top:6px;font-weight:400;color:#991B1B')}>
                  Não consegue entrar? Fale com o administrador da equipe.
                </div>
              </div>
            ) : null}

            <div style={css('display:flex;flex-direction:column;gap:7px')}>
              <label
                htmlFor="login-name"
                style={css('font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#475569')}
              >
                Usuário
              </label>
              <input
                ref={nameRef}
                id="login-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome cadastrado"
                autoComplete="username"
                autoCapitalize="words"
                disabled={submitting}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'login-error' : undefined}
                className="login-field"
                style={fieldStyle}
              />
            </div>

            <div style={css('display:flex;flex-direction:column;gap:7px')}>
              <label
                htmlFor="login-password"
                style={css('font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#475569')}
              >
                Senha
              </label>
              <div style={css('position:relative')}>
                <input
                  id="login-password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  disabled={submitting}
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'login-error' : undefined}
                  className="login-field"
                  style={{ ...fieldStyle, paddingRight: 76 }}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible((v) => !v)}
                  disabled={submitting}
                  aria-pressed={passwordVisible}
                  aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                  className="login-field"
                  style={css(
                    `position:absolute;right:6px;top:50%;transform:translateY(-50%);min-height:36px;padding:0 12px;border:0;border-radius:8px;background:transparent;color:#475569;font-size:12px;font-weight:600;cursor:${submitting ? 'not-allowed' : 'pointer'}`,
                  )}
                >
                  {passwordVisible ? 'Ocultar' : 'Ver'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="login-submit"
              style={css(
                `margin-top:8px;min-height:48px;padding:12px 16px;border:0;border-radius:12px;background:#0F172A;color:#FFFFFF;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:${submitting ? 'wait' : 'pointer'};box-shadow:0 1px 2px rgba(15,23,42,.2);opacity:${submitting ? '0.72' : '1'}`,
              )}
            >
              {submitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p style={css('margin:32px 0 0;font-size:12px;color:#64748B')}>
          © {new Date().getFullYear()} HubON · axis Inteligência Imobiliária
        </p>
      </section>

      <aside
        className="login-brand-panel"
        style={css('flex:1;position:relative;display:flex;align-items:center;justify-content:flex-end;padding:48px 56px;overflow:hidden;background:#F8FAFC')}
      >
        <div
          aria-hidden="true"
          style={css('position:absolute;inset:0;opacity:.55;background-image:linear-gradient(#E2E8F0 1px,transparent 1px),linear-gradient(90deg,#E2E8F0 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at center,black 25%,transparent 78%)')}
        />
        <div style={css('position:relative;z-index:1;text-align:right;max-width:520px')}>
          <div style={css('font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#475569;margin-bottom:14px')}>
            axis
          </div>
          <h2 style={css('margin:0;font-size:clamp(36px,5vw,56px);line-height:1.05;font-weight:700;letter-spacing:-.03em;color:#0F172A')}>
            Central de Demandas
          </h2>
          <p style={css('margin:16px 0 0;font-size:15px;color:#475569;max-width:36ch;margin-left:auto')}>
            Gestão de projetos, tarefas e desempenho da equipe.
          </p>
        </div>
      </aside>
    </div>
  )
}
