/* AUTO-GENERATED from Central de Demandas.dc.html — run: node scripts/convert-template.mjs */
// @ts-nocheck
import { css } from './lib/utils'
import { Hover } from './Hover'
import type { RenderVals } from './hooks/useCentralDemandas'

export function AppView({ v }: { v: RenderVals }) {
  return (
    <>
      <div style={css("min-height:100vh;background:#F8FAFC;color:#0F172A;padding:24px 32px 56px;display:flex;flex-direction:column;gap:20px")}>
      
        <div style={css("display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap")}>
          <div style={css("display:flex;align-items:center;gap:14px")}>
            <div style={css("display:flex;align-items:center;gap:12px")}>
              <img src="/brand/hubon-logo.png" alt="hubon" style={css("height:18px;width:auto;display:block")} />
              <img src="/brand/axis-logo.png" alt="axis" style={css("height:22px;width:auto;display:block")} />
            </div>
            <div style={css("display:flex;flex-direction:column")}>
              <span style={css("font-size:15px;font-weight:700;letter-spacing:-.01em")}>Central de Demandas</span>
              <span style={css("font-size:11.5px;color:#94A3B8")}>Gestão de projetos, tarefas e desempenho</span>
            </div>
          </div>
          <div style={css("display:flex;align-items:center;gap:12px;flex-wrap:wrap")}>
            <div style={css("display:flex;align-items:center;gap:9px;background:{teamChipBg};border:1px solid {teamChipBorder};border-radius:10px;padding:6px 10px 6px 12px", v)}>
              <span style={css("width:8px;height:8px;border-radius:99px;background:{teamDot}", v)}></span>
              <span style={css("font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:{teamChipFg}", v)}>Equipe</span>
              <select value={v.team} onChange={v.onTeam} style={css("border:0;background:transparent;font-size:13px;font-weight:600;color:{teamChipFg};outline:none;cursor:pointer;padding:2px 0", v)}>
                {v.teamOptions.map((tm) => (
                  <option key={tm} value={tm}>{tm}</option>
                ))}
              </select>
            </div>
            <div style={css("display:flex;background:#F1F5F9;border:1px solid #E2E8F0;border-radius:10px;padding:3px;gap:3px;flex-wrap:wrap")}>
              <button onClick={v.goProjects} style={css("padding:7px 14px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{navProjBg};color:{navProjFg};box-shadow:{navProjShadow}", v)}>Projetos</button>
              <button onClick={v.goLoose} style={css("padding:7px 14px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{navLooseBg};color:{navLooseFg};box-shadow:{navLooseShadow}", v)}>Tarefas avulsas</button>
              <button onClick={v.goCal} style={css("padding:7px 14px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{navCalBg};color:{navCalFg};box-shadow:{navCalShadow}", v)}>Calendário</button>
              <button onClick={v.goPerf} style={css("padding:7px 14px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{navPerfBg};color:{navPerfFg};box-shadow:{navPerfShadow}", v)}>Desempenho</button>
              {(v.showCadastrosNav) && (
                <button onClick={v.goReg} style={css("padding:7px 14px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{navRegBg};color:{navRegFg};box-shadow:{navRegShadow}", v)}>Cadastros</button>
              )}
            </div>
            <Hover as="button" style={css("display:flex;align-items:center;gap:7px;padding:9px 16px;border:0;border-radius:10px;background:#0F172A;color:#FFFFFF;font-size:12.5px;font-weight:600;cursor:pointer;box-shadow:0 1px 2px rgba(15,23,42,.2)")} hover="background:#1E293B" onClick={v.openModal}>
              <span style={css("font-size:15px;line-height:1")}>+</span>
              <span>Nova demanda</span>
            </Hover>
          </div>
        </div>
      
        {(v.modalOpen) && (
          <div style={css("position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:50;display:flex;align-items:flex-start;justify-content:center;padding:48px 24px;overflow:auto")} onClick={v.closeModal}>
            <div onClick={v.stop} style={css("background:#FFFFFF;border-radius:16px;box-shadow:0 24px 60px rgba(15,23,42,.25);width:640px;max-width:100%;display:flex;flex-direction:column;overflow:hidden")}>
              <div style={css("display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid #E2E8F0")}>
                <div style={css("display:flex;flex-direction:column;gap:2px")}>
                  <span style={css("font-size:16px;font-weight:700;letter-spacing:-.01em")}>{v.modalTitle}</span>
                  <span style={css("font-size:12px;color:#94A3B8")}>Cadastre um projeto macro ou uma tarefa avulsa.</span>
                </div>
                <Hover as="button" style={css("width:30px;height:30px;border:0;border-radius:8px;background:#F1F5F9;color:#64748B;font-size:14px;cursor:pointer")} hover="background:#E2E8F0;color:#0F172A" onClick={v.closeModal}>✕</Hover>
              </div>
      
              <div style={css("display:flex;flex-direction:column;gap:16px;padding:22px 24px;max-height:64vh;overflow:auto")}>
                {(v.modalNeedsSetup) && (
                  <div style={css("display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border-radius:10px;background:#FFFBEB;border:1px solid #FDE68A")}>
                    <span style={css("font-size:12.5px;color:#92400E;font-weight:500")}>Cadastre ao menos 1 colaborador e 1 requerente antes de criar demandas.</span>
                    {(v.showCadastrosNav) && (
                      <button onClick={v.goRegFromModal} style={css("padding:7px 14px;border:0;border-radius:8px;background:#D97706;color:#FFFFFF;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap")}>Ir para Cadastros</button>
                    )}
                  </div>
                )}
      
                {(v.isCreating) && (
                  <div style={css("display:flex;background:#F1F5F9;border:1px solid #E2E8F0;border-radius:10px;padding:3px;gap:3px;align-self:flex-start")}>
                    <button onClick={v.setKindProject} style={css("padding:7px 18px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{kindProjBg};color:{kindProjFg};box-shadow:{kindProjShadow}", v)}>Projeto macro</button>
                    <button onClick={v.setKindLoose} style={css("padding:7px 18px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{kindLooseBg};color:{kindLooseFg};box-shadow:{kindLooseShadow}", v)}>Tarefa avulsa</button>
                  </div>
                )}
      
                <div style={css("display:flex;flex-direction:column;gap:6px")}>
                  <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Nome da demanda *</label>
                  <input value={v.dName} onChange={v.onDName} placeholder={v.dNamePlaceholder} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13.5px;outline:none")} />
                </div>
      
                {(v.isProjDraft) && (
                  <div style={css("display:flex;flex-direction:column;gap:6px")}>
                    <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Descrição</label>
                    <textarea value={v.dDesc} onChange={v.onDDesc} placeholder="Escopo, contexto e resultado esperado..." rows={2} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;outline:none;resize:vertical")}></textarea>
                  </div>
                )}
      
                <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:14px")}>
                  <div style={css("display:flex;flex-direction:column;gap:6px")}>
                    <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Quem demandou *</label>
                    <select value={v.dRequester} onChange={v.onDRequester} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none;cursor:pointer")}>
                      {v.requesterList.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  {(v.isLooseDraft) && (
                    <div style={css("display:flex;flex-direction:column;gap:6px")}>
                      <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Pessoa responsável *</label>
                      <select value={v.dOwner} onChange={v.onDOwner} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none;cursor:pointer")}>
                        {v.peopleList.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div style={css("display:flex;flex-direction:column;gap:6px")}>
                    <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Equipe</label>
                    <select value={v.dTeam} onChange={v.onDTeam} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none;cursor:pointer")}>
                      {v.teamList.map((tm) => (
                        <option key={tm} value={tm}>{tm}</option>
                      ))}
                    </select>
                  </div>
                  <div style={css("display:flex;flex-direction:column;gap:6px")}>
                    <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Prazo final *</label>
                    <input type="date" value={v.dDue} onChange={v.onDDue} style={css("padding:9px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;outline:none;color:#334155")} />
                  </div>
                  {(v.isLooseDraft) && (
                    <div style={css("display:flex;flex-direction:column;gap:6px")}>
                      <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Prioridade</label>
                      <select value={v.dPriority} onChange={v.onDPriority} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none;cursor:pointer")}>
                        <option value="Alta">Alta</option>
                        <option value="Média">Média</option>
                        <option value="Baixa">Baixa</option>
                      </select>
                    </div>
                  )}
                </div>
      
                {(v.showTaskRows) && (
                  <div style={css("display:flex;flex-direction:column;gap:10px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:14px 16px")}>
                    <div style={css("display:flex;align-items:center;justify-content:space-between")}>
                      <span style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Microtarefas do projeto</span>
                      <Hover as="button" style={css("padding:5px 12px;border:1px solid #E2E8F0;border-radius:7px;background:#FFFFFF;color:#2563EB;font-size:12px;font-weight:600;cursor:pointer")} hover="border-color:#93C5FD" onClick={v.addTaskRow}>+ Adicionar</Hover>
                    </div>
                    {v.draftTasks.map((row) => (
                      <div key={row} style={css("display:grid;grid-template-columns:1fr 150px 130px 28px;gap:8px;align-items:center")}>
                        <input value={row.name} onChange={row.onName} placeholder="Descrição da microtarefa" style={css("padding:8px 11px;border:1px solid #E2E8F0;border-radius:8px;font-size:12.5px;outline:none;background:#FFFFFF")} />
                        <select value={row.owner} onChange={row.onOwner} style={css("padding:8px 9px;border:1px solid #E2E8F0;border-radius:8px;font-size:12px;background:#FFFFFF;outline:none;cursor:pointer")}>
                          {v.peopleList.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                        <input type="date" value={row.due} onChange={row.onDue} style={css("padding:7px 9px;border:1px solid #E2E8F0;border-radius:8px;font-size:12px;outline:none;color:#334155;background:#FFFFFF")} />
                        <Hover as="button" style={css("width:28px;height:28px;border:0;border-radius:7px;background:transparent;color:#94A3B8;font-size:13px;cursor:pointer")} hover="background:#FEF2F2;color:#DC2626" onClick={row.remove} title="Remover">✕</Hover>
                      </div>
                    ))}
                    <span style={css("font-size:11px;color:#94A3B8")}>Microtarefas sem prazo herdam o prazo final do projeto.</span>
                  </div>
                )}
      
                {(v.hasDraftError) && (
                  <div style={css("padding:10px 14px;border-radius:9px;background:#FEF2F2;border:1px solid #FECACA;color:#B91C1C;font-size:12.5px;font-weight:500")}>{v.draftError}</div>
                )}
              </div>
      
              <div style={css("display:flex;justify-content:flex-end;gap:10px;padding:16px 24px;border-top:1px solid #E2E8F0;background:#F8FAFC")}>
                <Hover as="button" style={css("padding:9px 18px;border:1px solid #E2E8F0;border-radius:9px;background:#FFFFFF;color:#475569;font-size:13px;font-weight:600;cursor:pointer")} hover="border-color:#CBD5E1" onClick={v.closeModal}>Cancelar</Hover>
                <Hover as="button" style={css("padding:9px 20px;border:0;border-radius:9px;background:#0F172A;color:#FFFFFF;font-size:13px;font-weight:600;cursor:pointer")} hover="background:#1E293B" onClick={v.submitDraft}>{v.submitLabel}</Hover>
              </div>
            </div>
          </div>
        )}
      
        {(v.taskEditOpen) && (
          <div style={css("position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:60;display:flex;align-items:flex-start;justify-content:center;padding:48px 24px;overflow:auto")} onClick={v.closeTask}>
            <div onClick={v.stop} style={css("background:#FFFFFF;border-radius:16px;box-shadow:0 24px 60px rgba(15,23,42,.25);width:520px;max-width:100%;display:flex;flex-direction:column;overflow:hidden")}>
              <div style={css("display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid #E2E8F0")}>
                <span style={css("font-size:15px;font-weight:700;letter-spacing:-.01em")}>{v.taskModalTitle}</span>
                <Hover as="button" style={css("width:30px;height:30px;border:0;border-radius:8px;background:#F1F5F9;color:#64748B;font-size:14px;cursor:pointer")} hover="background:#E2E8F0;color:#0F172A" onClick={v.closeTask}>✕</Hover>
              </div>
              <div style={css("display:flex;flex-direction:column;gap:14px;padding:20px 22px;max-height:64vh;overflow:auto")}>
                <div style={css("display:flex;flex-direction:column;gap:6px")}>
                  <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Descrição *</label>
                  <input value={v.tName} onChange={v.onTName} placeholder="O que precisa ser feito" style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13.5px;outline:none")} />
                </div>
                <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:12px")}>
                  <div style={css("display:flex;flex-direction:column;gap:6px")}>
                    <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Responsável</label>
                    <select value={v.tOwner} onChange={v.onTOwner} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none;cursor:pointer")}>
                      {v.peopleList.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div style={css("display:flex;flex-direction:column;gap:6px")}>
                    <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Quem demandou</label>
                    <select value={v.tRequester} onChange={v.onTRequester} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none;cursor:pointer")}>
                      {v.requesterList.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div style={css("display:flex;flex-direction:column;gap:6px")}>
                    <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Prazo *</label>
                    <input type="date" value={v.tDue} onChange={v.onTDue} style={css("padding:9px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;outline:none;color:#334155")} />
                  </div>
                  {(v.tIsProj) && (
                    <div style={css("display:flex;flex-direction:column;gap:6px")}>
                      <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Categoria</label>
                      <input value={v.tTag} onChange={v.onTTag} placeholder="Ex.: Mídia paga, Web, Jurídico" style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;outline:none")} />
                    </div>
                  )}
                  {(v.tIsLoose) && (
                    <div style={css("display:flex;flex-direction:column;gap:6px")}>
                      <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Prioridade</label>
                      <select value={v.tPriority} onChange={v.onTPriority} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none;cursor:pointer")}>
                        <option value="Alta">Alta</option>
                        <option value="Média">Média</option>
                        <option value="Baixa">Baixa</option>
                      </select>
                    </div>
                  )}
                  <div style={css("display:flex;flex-direction:column;gap:6px")}>
                    <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Status</label>
                    <select value={v.tStatus} onChange={v.onTStatus} style={css("padding:10px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none;cursor:pointer")}>
                      {v.statusKeys.map((s) => (
                        <option key={s} value={s.key}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={css("display:flex;flex-direction:column;gap:8px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:13px 15px")}>
                  <div style={css("display:flex;justify-content:space-between;align-items:baseline")}>
                    <label style={css("font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748B")}>Progresso</label>
                    <span style={css("font-size:14px;font-weight:700")}>{v.tProgress}%</span>
                  </div>
                  <input type="range" min={0} max={100} step={5} value={v.tProgress} onChange={v.onTProgress} style={css("width:100%;accent-color:#0F172A;cursor:pointer")} />
                  <span style={css("font-size:11px;color:#94A3B8")}>Marcar como Concluído define automaticamente 100% e registra a data de entrega.</span>
                </div>
                {(v.hasTaskError) && (
                  <div style={css("padding:10px 14px;border-radius:9px;background:#FEF2F2;border:1px solid #FECACA;color:#B91C1C;font-size:12.5px;font-weight:500")}>{v.taskError}</div>
                )}
              </div>
              <div style={css("display:flex;align-items:center;gap:10px;padding:15px 22px;border-top:1px solid #E2E8F0;background:#F8FAFC")}>
                {(v.tCanDelete) && (
                  <Hover as="button" style={css("padding:9px 16px;border:1px solid #FECACA;border-radius:9px;background:#FFFFFF;color:#DC2626;font-size:13px;font-weight:600;cursor:pointer")} hover="background:#FEF2F2" onClick={v.deleteTask}>Excluir</Hover>
                )}
                <div style={css("flex:1")}></div>
                <Hover as="button" style={css("padding:9px 18px;border:1px solid #E2E8F0;border-radius:9px;background:#FFFFFF;color:#475569;font-size:13px;font-weight:600;cursor:pointer")} hover="border-color:#CBD5E1" onClick={v.closeTask}>Cancelar</Hover>
                <Hover as="button" style={css("padding:9px 20px;border:0;border-radius:9px;background:#0F172A;color:#FFFFFF;font-size:13px;font-weight:600;cursor:pointer")} hover="background:#1E293B" onClick={v.saveTask}>Salvar</Hover>
              </div>
            </div>
          </div>
        )}
      
        {(v.showProjects) && (
          <div style={css("display:flex;flex-direction:column;gap:18px")}>
            {(v.needsSetup && v.showCadastrosNav) && (
              <div style={css("display:flex;align-items:center;justify-content:space-between;gap:16px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:18px 22px;flex-wrap:wrap")}>
                <div style={css("display:flex;flex-direction:column;gap:3px")}>
                  <span style={css("font-size:14.5px;font-weight:700")}>Comece configurando sua operação</span>
                  <span style={css("font-size:12.5px;color:#64748B")}>Cadastre colaboradores, equipes e requerentes para depois criar projetos e tarefas.</span>
                </div>
                <Hover as="button" style={css("padding:9px 18px;border:0;border-radius:9px;background:#0F172A;color:#FFFFFF;font-size:13px;font-weight:600;cursor:pointer")} hover="background:#1E293B" onClick={v.goReg}>Abrir Cadastros ›</Hover>
              </div>
            )}
            <div style={css("display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap")}>
              <div style={css("display:flex;flex-direction:column;gap:5px")}>
                <h1 style={css("margin:0;font-size:26px;font-weight:700;letter-spacing:-.02em")}>Todos os projetos</h1>
                <p style={css("margin:0;font-size:13px;color:#64748B")}>Clique em um projeto para abrir os desdobramentos em microtarefas.</p>
              </div>
              <div style={css("display:flex;gap:14px;flex-wrap:wrap")}>
                {v.portfolioStats.map((s) => (
                  <div key={s.label} style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;padding:12px 18px;display:flex;flex-direction:column;gap:3px;min-width:120px")}>
                    <span style={css("font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#94A3B8")}>{s.label}</span>
                    <span style={css("font-size:22px;font-weight:700;letter-spacing:-.02em;color:{color}", s)}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
      
            {(v.noProjects) && (
              <div style={css("padding:64px 24px;text-align:center;background:#FFFFFF;border:1px dashed #CBD5E1;border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:12px")}>
                <span style={css("font-size:15px;font-weight:700;color:#334155")}>Nenhum projeto cadastrado</span>
                <span style={css("font-size:13px;color:#94A3B8;max-width:44ch;text-wrap:pretty")}>Crie seu primeiro projeto macro com as microtarefas, responsáveis e prazos da sua operação.</span>
                <Hover as="button" style={css("margin-top:6px;padding:10px 20px;border:0;border-radius:10px;background:#0F172A;color:#FFFFFF;font-size:13px;font-weight:600;cursor:pointer")} hover="background:#1E293B" onClick={v.openModal}>+ Criar primeiro projeto</Hover>
              </div>
            )}
      
            <div style={css("display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:16px")}>
              {v.projects.map((p) => (
                <Hover as="div" style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:20px 22px;display:flex;flex-direction:column;gap:16px;box-shadow:0 1px 2px rgba(15,23,42,.04);cursor:pointer;transition:box-shadow .15s ease,transform .15s ease,border-color .15s ease")} hover="box-shadow:0 10px 26px rgba(15,23,42,.10);transform:translateY(-2px);border-color:#CBD5E1" onClick={p.open}>
                  <div style={css("display:flex;justify-content:space-between;align-items:flex-start;gap:14px")}>
                    <div style={css("display:flex;flex-direction:column;gap:6px;min-width:0")}>
                      <div style={css("display:flex;align-items:center;gap:8px")}>
                        <span style={css("font-size:10.5px;font-weight:700;letter-spacing:.06em;color:#94A3B8")}>{p.code}</span>
                        <span style={css("font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:99px;background:{stBg};color:{stFg}", p)}>{p.stLabel}</span>
                        <span style={css("font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:99px;background:{teamBg};color:{teamFg}", p)}>{p.teamName}</span>
                      </div>
                      <span style={css("font-size:17px;font-weight:700;line-height:1.25;letter-spacing:-.01em;text-wrap:pretty")}>{p.name}</span>
                    </div>
                    <span style={css("font-size:18px;color:#CBD5E1;padding-top:2px")}>›</span>
                  </div>
                  <div style={css("display:flex;gap:22px;flex-wrap:wrap")}>
                    <div style={css("display:flex;flex-direction:column;gap:4px")}>
                      <span style={css("font-size:10.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#94A3B8")}>Requerente</span>
                      <div style={css("display:flex;align-items:center;gap:7px")}>
                        <span style={css("width:22px;height:22px;border-radius:99px;background:{reqBg};color:{reqFg};display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700", p)}>{p.reqInitials}</span>
                        <div style={css("display:flex;flex-direction:column")}>
                          <span style={css("font-size:12.5px;font-weight:600;color:#334155")}>{p.requester}</span>
                          <span style={css("font-size:10.5px;color:#94A3B8")}>{p.requesterRole}</span>
                        </div>
                      </div>
                    </div>
                    <div style={css("display:flex;flex-direction:column;gap:4px")}>
                      <span style={css("font-size:10.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#94A3B8")}>Entrega</span>
                      <span style={css("font-size:12.5px;font-weight:600;color:{dueFg}", p)}>{p.dueLabel}</span>
                    </div>
                    <div style={css("display:flex;flex-direction:column;gap:4px")}>
                      <span style={css("font-size:10.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#94A3B8")}>Microtarefas</span>
                      <span style={css("font-size:12.5px;font-weight:600;color:#334155")}>{p.taskSummary}</span>
                    </div>
                  </div>
                  <div style={css("display:flex;flex-direction:column;gap:7px")}>
                    <div style={css("display:flex;justify-content:space-between;align-items:baseline")}>
                      <span style={css("font-size:11.5px;color:#64748B")}>Progresso</span>
                      <span style={css("font-size:12px;font-weight:700;color:{barColor}", p)}>{p.progress}%</span>
                    </div>
                    <div style={css("height:8px;border-radius:99px;background:#F1F5F9;overflow:hidden")}>
                      <div style={css("height:100%;border-radius:99px;background:{barColor};width:{pct};transition:width .4s ease", p)}></div>
                    </div>
                  </div>
                  <div style={css("display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:13px;border-top:1px solid #F1F5F9")}>
                    <div style={css("display:flex;align-items:center")}>
                      {p.team.map((m) => (
                        <span key={m} title={m.name} style={css("width:26px;height:26px;border-radius:99px;background:{bg};color:{fg};border:2px solid #FFFFFF;margin-left:-7px;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700", m)}>{m.initials}</span>
                      ))}
                    </div>
                    {(p.hasAlert) && (
                      <span style={css("font-size:11px;font-weight:600;color:#DC2626;background:#FEF2F2;border-radius:6px;padding:3px 9px")}>{p.alertLabel}</span>
                    )}
                  </div>
                </Hover>
              ))}
            </div>
          </div>
        )}
      
        {(v.showDetail) && (
          <div style={css("display:flex;flex-direction:column;gap:20px")}>
            <div style={css("display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap")}>
              <Hover as="button" style={css("align-self:flex-start;background:transparent;border:0;padding:0;font-size:12.5px;font-weight:600;color:#64748B;cursor:pointer")} hover="color:#0F172A" onClick={v.goProjects}>‹ Todos os projetos</Hover>
              <div style={css("display:flex;gap:8px")}>
                <Hover as="button" style={css("padding:8px 15px;border:0;border-radius:9px;background:#0F172A;color:#FFFFFF;font-size:12.5px;font-weight:600;cursor:pointer")} hover="background:#1E293B" onClick={v.addMicroTask}>+ Microtarefa</Hover>
                <Hover as="button" style={css("padding:8px 15px;border:1px solid #E2E8F0;border-radius:9px;background:#FFFFFF;color:#475569;font-size:12.5px;font-weight:600;cursor:pointer")} hover="border-color:#CBD5E1" onClick={v.editProject}>✎ Editar projeto</Hover>
                {(v.canDelete) && (
                <Hover as="button" style={css("padding:8px 15px;border:1px solid #FECACA;border-radius:9px;background:#FFFFFF;color:#DC2626;font-size:12.5px;font-weight:600;cursor:pointer")} hover="background:#FEF2F2" onClick={v.deleteProject}>Excluir</Hover>
                )}
              </div>
            </div>
      
            <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);padding:24px 26px;display:flex;flex-direction:column;gap:22px")}>
              <div style={css("display:flex;justify-content:space-between;align-items:flex-start;gap:32px;flex-wrap:wrap")}>
                <div style={css("display:flex;flex-direction:column;gap:8px;min-width:320px")}>
                  <div style={css("display:flex;align-items:center;gap:10px")}>
                    <span style={css("font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#64748B")}>{v.cur.code} · Projeto macro</span>
                    <span style={css("padding:3px 9px;border-radius:99px;background:{v.cur.stBg};color:{v.cur.stFg};font-size:11px;font-weight:600")}>{v.cur.stLabel}</span>
                    <span style={css("padding:3px 9px;border-radius:99px;background:{v.cur.teamBg};color:{v.cur.teamFg};font-size:11px;font-weight:600")}>{v.cur.teamName}</span>
                  </div>
                  <h1 style={css("margin:0;font-size:30px;line-height:1.15;font-weight:700;letter-spacing:-.02em;text-wrap:pretty")}>{v.cur.name}</h1>
                  <p style={css("margin:0;font-size:13.5px;color:#64748B;max-width:62ch;text-wrap:pretty")}>{v.cur.description}</p>
                </div>
                <div style={css("display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap")}>
                  <div style={css("display:flex;flex-direction:column;gap:6px")}>
                    <span style={css("font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>Requerente</span>
                    <div style={css("display:flex;align-items:center;gap:8px")}>
                      <span style={css("width:30px;height:30px;border-radius:99px;background:{v.cur.reqBg};color:{v.cur.reqFg};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700")}>{v.cur.reqInitials}</span>
                      <div style={css("display:flex;flex-direction:column")}>
                        <span style={css("font-size:13px;font-weight:600")}>{v.cur.requester}</span>
                        <span style={css("font-size:11px;color:#94A3B8")}>{v.cur.requesterRole}</span>
                      </div>
                    </div>
                  </div>
                  <div style={css("width:1px;align-self:stretch;background:#E2E8F0")}></div>
                  <div style={css("display:flex;flex-direction:column;gap:5px")}>
                    <span style={css("font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>Prazo final</span>
                    <span style={css("font-size:16px;font-weight:600")}>{v.cur.dueFull}</span>
                    <span style={css("font-size:12px;font-weight:500;color:{v.cur.dueFg}")}>{v.cur.dueRelative}</span>
                  </div>
                  <div style={css("width:1px;align-self:stretch;background:#E2E8F0")}></div>
                  <div style={css("display:flex;flex-direction:column;gap:7px")}>
                    <span style={css("font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>Equipe</span>
                    <div style={css("display:flex;align-items:center")}>
                      {v.cur.team.map((m) => (
                        <span key={m} title={m.name} style={css("width:32px;height:32px;border-radius:99px;background:{bg};color:{fg};border:2px solid #FFFFFF;margin-left:-8px;display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:600", m)}>{m.initials}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
      
              <div style={css("display:flex;flex-direction:column;gap:8px")}>
                <div style={css("display:flex;justify-content:space-between;align-items:baseline")}>
                  <span style={css("font-size:12.5px;font-weight:600;color:#334155")}>Progresso geral do projeto</span>
                  <span style={css("font-size:13px;font-weight:700;color:#16A34A")}>{v.overall}%</span>
                </div>
                <div style={css("height:10px;border-radius:99px;background:#F1F5F9;overflow:hidden")}>
                  <div style={css("height:100%;border-radius:99px;background:linear-gradient(90deg,#22C55E,#16A34A);width:{overallW};transition:width .4s ease", v)}></div>
                </div>
              </div>
      
              <div style={css("display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding-top:2px")}>
                <div style={css("position:relative;display:flex;align-items:center;flex:1 1 240px;max-width:320px")}>
                  <span style={css("position:absolute;left:12px;font-size:13px;color:#94A3B8")}>⌕</span>
                  <input value={v.q} onChange={v.onSearch} placeholder="Buscar microtarefa..." style={css("width:100%;padding:9px 12px 9px 30px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none")} />
                </div>
                <select value={v.owner} onChange={v.onOwner} style={css("padding:9px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;color:#334155;outline:none;cursor:pointer")}>
                  {v.ownerOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <select value={v.requester} onChange={v.onRequester} style={css("padding:9px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;color:#334155;outline:none;cursor:pointer")}>
                  {v.requesterOptions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <select value={v.status} onChange={v.onStatus} style={css("padding:9px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;color:#334155;outline:none;cursor:pointer")}>
                  {v.statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button onClick={v.onLate} style={css("padding:9px 13px;border-radius:9px;font-size:13px;font-weight:500;cursor:pointer;border:1px solid {lateBorder};background:{lateBg};color:{lateFg}", v)}>Somente atrasadas</button>
                <div style={css("flex:1")}></div>
                <span style={css("font-size:12.5px;color:#64748B")}>{v.visibleCount} de {v.totalTasks} exibidas</span>
                <div style={css("display:flex;background:#F1F5F9;border-radius:9px;padding:3px;gap:3px")}>
                  <button onClick={v.setKanban} style={css("padding:6px 14px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{kanbanBg};color:{kanbanFg};box-shadow:{kanbanShadow}", v)}>Kanban</button>
                  <button onClick={v.setTable} style={css("padding:6px 14px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{tableBg};color:{tableFg};box-shadow:{tableShadow}", v)}>Tabela</button>
                  <button onClick={v.setGantt} style={css("padding:6px 14px;border:0;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer;background:{ganttBg};color:{ganttFg};box-shadow:{ganttShadow}", v)}>Gantt</button>
                </div>
              </div>
            </div>
      
            <div style={css("display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px")}>
              {v.kpis.map((k) => (
                <div key={k.label} style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);padding:18px 20px;display:flex;flex-direction:column;gap:12px;position:relative;overflow:hidden")}>
                  <div style={css("position:absolute;left:0;top:0;bottom:0;width:3px;background:{color}", k)}></div>
                  <div style={css("display:flex;justify-content:space-between;align-items:flex-start;gap:12px")}>
                    <span style={css("font-size:12.5px;font-weight:600;color:#64748B")}>{k.label}</span>
                    <span style={css("width:28px;height:28px;border-radius:8px;background:{bg};color:{color};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700", k)}>{k.icon}</span>
                  </div>
                  <div style={css("display:flex;align-items:flex-end;gap:8px")}>
                    <span style={css("font-size:32px;font-weight:700;letter-spacing:-.03em;line-height:1")}>{k.value}</span>
                    <span style={css("font-size:12px;color:#94A3B8;padding-bottom:4px")}>{k.unit}</span>
                  </div>
                  <span style={css("font-size:12px;color:{subColor}", k)}>{k.sub}</span>
                </div>
              ))}
            </div>
      
            {(v.isKanban) && (
              <>
              <div style={css("display:grid;grid-template-columns:repeat(4,minmax(260px,1fr));gap:16px;align-items:start")}>
                {v.columns.map((col) => (
                  <div key={col.key} onDragOver={col.over} onDrop={col.drop} style={css("background:#F1F5F9;border:1px solid #E2E8F0;border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:10px;min-height:180px")}>
                    <div style={css("display:flex;align-items:center;justify-content:space-between;padding:2px 4px")}>
                      <div style={css("display:flex;align-items:center;gap:8px")}>
                        <span style={css("width:8px;height:8px;border-radius:99px;background:{color}", col)}></span>
                        <span style={css("font-size:13px;font-weight:600;color:#334155")}>{col.label}</span>
                      </div>
                      <span style={css("font-size:11.5px;font-weight:600;color:#64748B;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:99px;padding:1px 8px")}>{col.count}</span>
                    </div>
                    {col.tasks.map((t) => (
                      <Hover as="div" style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:11px;padding:13px 14px;display:flex;flex-direction:column;gap:11px;box-shadow:0 1px 2px rgba(15,23,42,.04);cursor:grab;transition:box-shadow .15s ease,transform .15s ease")} hover="box-shadow:0 6px 18px rgba(15,23,42,.09);transform:translateY(-1px)" draggable onDragStart={t.drag} onClick={t.openEdit}>
                        <div style={css("display:flex;justify-content:space-between;align-items:flex-start;gap:10px")}>
                          <span style={css("font-size:13.5px;font-weight:600;line-height:1.35;text-wrap:pretty")}>{t.name}</span>
                          <span style={css("font-size:10.5px;font-weight:600;color:#94A3B8;white-space:nowrap;padding-top:2px")}>{t.code}</span>
                        </div>
                        <div style={css("display:flex;gap:6px;flex-wrap:wrap")}>
                          <span style={css("font-size:10.5px;font-weight:600;padding:3px 8px;border-radius:6px;background:{badgeBg};color:{badgeFg}", t)}>{t.status}</span>
                          <span style={css("font-size:10.5px;font-weight:500;padding:3px 8px;border-radius:6px;background:#F8FAFC;border:1px solid #E2E8F0;color:#64748B")}>{t.tag}</span>
                          <span style={css("font-size:10.5px;font-weight:600;padding:3px 8px;border-radius:6px;background:{teamBg};color:{teamFg}", t)}>{t.team}</span>
                        </div>
                        <div style={css("display:flex;align-items:center;gap:6px;font-size:11px;color:#64748B;background:#F8FAFC;border-radius:7px;padding:5px 8px")}>
                          <span style={css("font-weight:600;color:#94A3B8")}>Solicitado por</span>
                          <span style={css("font-weight:600;color:#475569")}>{t.requester}</span>
                        </div>
                        <div style={css("display:flex;flex-direction:column;gap:5px")}>
                          <div style={css("display:flex;justify-content:space-between;font-size:11px;color:#64748B")}>
                            <span>Progresso</span>
                            <span style={css("font-weight:600;color:#334155")}>{t.progress}%</span>
                          </div>
                          <div style={css("height:6px;border-radius:99px;background:#F1F5F9;overflow:hidden")}>
                            <div style={css("height:100%;border-radius:99px;background:{badgeFg};width:{pct};transition:width .4s ease", t)}></div>
                          </div>
                        </div>
                        <div style={css("display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:11px;border-top:1px solid #F1F5F9")}>
                          <div style={css("display:flex;align-items:center;gap:7px")}>
                            <span style={css("width:24px;height:24px;border-radius:99px;background:{avBg};color:{avFg};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700", t)}>{t.initials}</span>
                            <span style={css("font-size:11.5px;color:#475569;font-weight:500")}>{t.owner}</span>
                          </div>
                          <span style={css("font-size:11px;font-weight:600;padding:3px 8px;border-radius:6px;background:{dueBg};color:{dueFg};white-space:nowrap", t)}>{t.dueLabel}</span>
                        </div>
                      </Hover>
                    ))}
                  </div>
                ))}
              </div>
              <span style={css("font-size:11.5px;color:#94A3B8;text-align:center")}>Arraste um cartão para outra coluna para mudar o status · clique para editar</span>
              </>
            )}
      
            {(v.isTable) && (
              <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);overflow:hidden")}>
                <div style={css("display:grid;grid-template-columns:minmax(260px,2.2fr) 1.1fr 1.1fr 1.1fr 1.2fr .9fr;gap:16px;padding:12px 20px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>
                  <span>Microtarefa</span>
                  <span>Requerente</span>
                  <span>Responsável</span>
                  <span>Status</span>
                  <span>Progresso</span>
                  <span>Entrega</span>
                </div>
                {v.rows.map((t) => (
                  <Hover as="div" style={css("display:grid;grid-template-columns:minmax(260px,2.2fr) 1.1fr 1.1fr 1.1fr 1.2fr .9fr;gap:16px;padding:13px 20px;border-bottom:1px solid #F1F5F9;align-items:center;cursor:pointer;transition:background .12s ease")} hover="background:#F8FAFC" onClick={t.openEdit}>
                    <div style={css("display:flex;flex-direction:column;gap:3px;min-width:0")}>
                      <span style={css("font-size:13.5px;font-weight:600;text-wrap:pretty")}>{t.name}</span>
                      <span style={css("font-size:11px;color:#94A3B8")}>{t.code} · {t.tag} · {t.team}</span>
                    </div>
                    <div style={css("display:flex;align-items:center;gap:7px;min-width:0")}>
                      <span style={css("width:24px;height:24px;border-radius:99px;background:{reqBg};color:{reqFg};display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;flex:none", t)}>{t.reqInitials}</span>
                      <span style={css("font-size:12px;color:#475569;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{t.requester}</span>
                    </div>
                    <div style={css("display:flex;align-items:center;gap:7px;min-width:0")}>
                      <span style={css("width:24px;height:24px;border-radius:99px;background:{avBg};color:{avFg};display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;flex:none", t)}>{t.initials}</span>
                      <span style={css("font-size:12px;color:#475569;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{t.owner}</span>
                    </div>
                    <div>
                      <span style={css("font-size:10.5px;font-weight:600;padding:4px 9px;border-radius:6px;background:{badgeBg};color:{badgeFg};white-space:nowrap", t)}>{t.status}</span>
                    </div>
                    <div style={css("display:flex;align-items:center;gap:10px")}>
                      <div style={css("flex:1;height:6px;border-radius:99px;background:#F1F5F9;overflow:hidden")}>
                        <div style={css("height:100%;border-radius:99px;background:{badgeFg};width:{pct};transition:width .4s ease", t)}></div>
                      </div>
                      <span style={css("font-size:11.5px;font-weight:600;color:#475569;width:34px;text-align:right")}>{t.progress}%</span>
                    </div>
                    <span style={css("font-size:11.5px;font-weight:600;color:{dueFg}", t)}>{t.dueLabel}</span>
                  </Hover>
                ))}
              </div>
            )}
      
            {(v.isGantt) && (
              <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);overflow:hidden")}>
                <div style={css("display:grid;grid-template-columns:280px 1fr")}>
                  <div style={css("padding:12px 20px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>Microtarefa</div>
                  <div style={css("position:relative;height:40px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;border-left:1px solid #E2E8F0;overflow:hidden")}>
                    {v.ganttTicks.map((tk) => (
                      <div key={tk.left} style={css("position:absolute;top:0;bottom:0;left:{left};border-left:1px solid #E2E8F0;display:flex;align-items:center", tk)}>
                        <span style={css("font-size:10.5px;font-weight:600;color:#94A3B8;padding-left:6px;white-space:nowrap")}>{tk.label}</span>
                      </div>
                    ))}
                    {(v.todayVisible) && (
                      <div style={css("position:absolute;top:0;bottom:0;left:{todayLeft};border-left:2px solid #DC2626;display:flex;align-items:flex-start", v)}>
                        <span style={css("font-size:9.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#FFFFFF;background:#DC2626;border-radius:0 4px 4px 0;padding:2px 6px;margin-top:4px")}>Hoje</span>
                      </div>
                    )}
                  </div>
                  {v.ganttRows.map((g) => (
                    <>
                    <Hover as="div" style={css("padding:11px 20px;border-bottom:1px solid #F1F5F9;display:flex;flex-direction:column;gap:3px;min-width:0;justify-content:center;cursor:pointer")} hover="background:#F8FAFC" onClick={g.openEdit}>
                      <span style={css("font-size:12.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{g.name}</span>
                      <div style={css("display:flex;align-items:center;gap:6px")}>
                        <span style={css("width:18px;height:18px;border-radius:99px;background:{avBg};color:{avFg};display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:700;flex:none", g)}>{g.initials}</span>
                        <span style={css("font-size:11px;color:#94A3B8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{g.owner} · {g.status}</span>
                      </div>
                    </Hover>
                    <div style={css("position:relative;border-bottom:1px solid #F1F5F9;border-left:1px solid #E2E8F0;min-height:52px;overflow:hidden")}>
                      {v.ganttTicks.map((tk) => (
                        <div key={tk.left} style={css("position:absolute;top:0;bottom:0;left:{left};border-left:1px solid #F1F5F9", tk)}></div>
                      ))}
                      {(v.todayVisible) && (
                        <div style={css("position:absolute;top:0;bottom:0;left:{todayLeft};border-left:2px solid rgba(220,38,38,.35)", v)}></div>
                      )}
                      <div title={g.tooltip} style={css("position:absolute;top:50%;transform:translateY(-50%);left:{left};width:{width};height:20px;border-radius:6px;background:{barBg};border:1px solid {barFg};overflow:hidden;cursor:default", g)}>
                        <div style={css("height:100%;background:{barFg};opacity:.85;width:{fill};border-radius:5px 0 0 5px", g)}></div>
                      </div>
                      <span style={css("position:absolute;top:50%;transform:translateY(-50%);left:{labelLeft};font-size:10.5px;font-weight:600;color:{dueFg};white-space:nowrap;padding-left:8px", g)}>{g.dueLabel}</span>
                    </div>
                    </>
                  ))}
                </div>
                <div style={css("display:flex;align-items:center;gap:18px;padding:12px 20px;background:#F8FAFC;border-top:1px solid #E2E8F0;flex-wrap:wrap")}>
                  {v.ganttLegend.map((l) => (
                    <div key={l} style={css("display:flex;align-items:center;gap:7px")}>
                      <span style={css("width:18px;height:10px;border-radius:3px;background:{bg};border:1px solid {fg}", l)}></span>
                      <span style={css("font-size:11px;color:#64748B")}>{l.label}</span>
                    </div>
                  ))}
                  <span style={css("font-size:11px;color:#94A3B8;margin-left:auto")}>Barra: da abertura à entrega · preenchimento = progresso · linha vermelha = hoje</span>
                </div>
              </div>
            )}
      
            {(v.empty) && (
              <div style={css("padding:48px;text-align:center;color:#94A3B8;font-size:13.5px;background:#FFFFFF;border:1px dashed #E2E8F0;border-radius:14px")}>Nenhuma microtarefa encontrada com os filtros atuais.</div>
            )}
          </div>
        )}
      
        {(v.showLoose) && (
          <div style={css("display:flex;flex-direction:column;gap:18px")}>
            <div style={css("display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap")}>
              <div style={css("display:flex;flex-direction:column;gap:5px")}>
                <h1 style={css("margin:0;font-size:26px;font-weight:700;letter-spacing:-.02em")}>Tarefas avulsas</h1>
                <p style={css("margin:0;font-size:13px;color:#64748B")}>Demandas pontuais que não pertencem a nenhum projeto macro. Clique numa linha para editar.</p>
              </div>
              <div style={css("display:flex;gap:10px;align-items:center;flex-wrap:wrap")}>
                <div style={css("position:relative;display:flex;align-items:center")}>
                  <span style={css("position:absolute;left:12px;font-size:13px;color:#94A3B8")}>⌕</span>
                  <input value={v.looseQ} onChange={v.onLooseSearch} placeholder="Buscar tarefa avulsa..." style={css("width:240px;padding:9px 12px 9px 30px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;outline:none")} />
                </div>
                <select value={v.looseStatus} onChange={v.onLooseStatus} style={css("padding:9px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;color:#334155;outline:none;cursor:pointer")}>
                  {v.statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
      
            <div style={css("display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px")}>
              {v.looseKpis.map((k) => (
                <div key={k.label} style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);padding:18px 20px;display:flex;flex-direction:column;gap:10px;position:relative;overflow:hidden")}>
                  <div style={css("position:absolute;left:0;top:0;bottom:0;width:3px;background:{color}", k)}></div>
                  <span style={css("font-size:12.5px;font-weight:600;color:#64748B")}>{k.label}</span>
                  <div style={css("display:flex;align-items:flex-end;gap:8px")}>
                    <span style={css("font-size:30px;font-weight:700;letter-spacing:-.03em;line-height:1")}>{k.value}</span>
                    <span style={css("font-size:12px;color:#94A3B8;padding-bottom:3px")}>{k.unit}</span>
                  </div>
                </div>
              ))}
            </div>
      
            <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);overflow:hidden")}>
              <div style={css("display:grid;grid-template-columns:minmax(240px,2fr) 1.1fr 1.1fr .8fr 1.1fr 1.1fr .9fr;gap:14px;padding:12px 20px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>
                <span>Tarefa</span>
                <span>Requerente</span>
                <span>Responsável</span>
                <span>Prioridade</span>
                <span>Status</span>
                <span>Progresso</span>
                <span>Entrega</span>
              </div>
              {v.looseRows.map((t) => (
                <Hover as="div" style={css("display:grid;grid-template-columns:minmax(240px,2fr) 1.1fr 1.1fr .8fr 1.1fr 1.1fr .9fr;gap:14px;padding:13px 20px;border-bottom:1px solid #F1F5F9;align-items:center;cursor:pointer;transition:background .12s ease")} hover="background:#F8FAFC" onClick={t.openEdit}>
                  <div style={css("display:flex;flex-direction:column;gap:3px;min-width:0")}>
                    <span style={css("font-size:13.5px;font-weight:600;text-wrap:pretty")}>{t.name}</span>
                    <div style={css("display:flex;align-items:center;gap:7px")}>
                      <span style={css("font-size:11px;color:#94A3B8")}>{t.code} · aberta em {t.openedLabel}</span>
                      <span style={css("font-size:10px;font-weight:600;padding:1px 7px;border-radius:99px;background:{teamBg};color:{teamFg}", t)}>{t.team}</span>
                    </div>
                  </div>
                  <div style={css("display:flex;align-items:center;gap:7px;min-width:0")}>
                    <span style={css("width:24px;height:24px;border-radius:99px;background:{reqBg};color:{reqFg};display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;flex:none", t)}>{t.reqInitials}</span>
                    <span style={css("font-size:12px;color:#475569;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{t.requester}</span>
                  </div>
                  <div style={css("display:flex;align-items:center;gap:7px;min-width:0")}>
                    <span style={css("width:24px;height:24px;border-radius:99px;background:{avBg};color:{avFg};display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;flex:none", t)}>{t.initials}</span>
                    <span style={css("font-size:12px;color:#475569;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{t.owner}</span>
                  </div>
                  <span style={css("font-size:10.5px;font-weight:600;padding:4px 9px;border-radius:6px;background:{prioBg};color:{prioFg};justify-self:start", t)}>{t.priority}</span>
                  <span style={css("font-size:10.5px;font-weight:600;padding:4px 9px;border-radius:6px;background:{badgeBg};color:{badgeFg};justify-self:start;white-space:nowrap", t)}>{t.status}</span>
                  <div style={css("display:flex;align-items:center;gap:10px")}>
                    <div style={css("flex:1;height:6px;border-radius:99px;background:#F1F5F9;overflow:hidden")}>
                      <div style={css("height:100%;border-radius:99px;background:{badgeFg};width:{pct};transition:width .4s ease", t)}></div>
                    </div>
                    <span style={css("font-size:11.5px;font-weight:600;color:#475569;width:34px;text-align:right")}>{t.progress}%</span>
                  </div>
                  <span style={css("font-size:11.5px;font-weight:600;color:{dueFg}", t)}>{t.dueLabel}</span>
                </Hover>
              ))}
            </div>
      
            {(v.looseEmpty) && (
              <div style={css("padding:48px;text-align:center;color:#94A3B8;font-size:13.5px;background:#FFFFFF;border:1px dashed #E2E8F0;border-radius:14px")}>Nenhuma tarefa avulsa. Use "+ Nova demanda" para criar a primeira.</div>
            )}
          </div>
        )}
      
        {(v.showCal) && (
          <div style={css("display:flex;flex-direction:column;gap:18px")}>
            <div style={css("display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap")}>
              <div style={css("display:flex;flex-direction:column;gap:5px")}>
                <h1 style={css("margin:0;font-size:26px;font-weight:700;letter-spacing:-.02em")}>Calendário de entregas</h1>
                <p style={css("margin:0;font-size:13px;color:#64748B")}>Todas as microtarefas de todos os projetos e tarefas avulsas, organizadas pela data de entrega.</p>
              </div>
              <div style={css("display:flex;align-items:center;gap:10px")}>
                <Hover as="button" style={css("width:34px;height:34px;border:1px solid #E2E8F0;border-radius:9px;background:#FFFFFF;color:#475569;font-size:15px;cursor:pointer")} hover="border-color:#CBD5E1;background:#F8FAFC" onClick={v.calPrev}>‹</Hover>
                <span style={css("font-size:15px;font-weight:700;letter-spacing:-.01em;min-width:150px;text-align:center;text-transform:capitalize")}>{v.calLabel}</span>
                <Hover as="button" style={css("width:34px;height:34px;border:1px solid #E2E8F0;border-radius:9px;background:#FFFFFF;color:#475569;font-size:15px;cursor:pointer")} hover="border-color:#CBD5E1;background:#F8FAFC" onClick={v.calNext}>›</Hover>
                <Hover as="button" style={css("padding:8px 14px;border:1px solid #E2E8F0;border-radius:9px;background:#FFFFFF;color:#475569;font-size:12.5px;font-weight:600;cursor:pointer")} hover="border-color:#CBD5E1;background:#F8FAFC" onClick={v.calToday}>Hoje</Hover>
              </div>
            </div>
      
            <div style={css("display:flex;align-items:center;gap:18px;flex-wrap:wrap")}>
              {v.calLegend.map((l) => (
                <div key={l} style={css("display:flex;align-items:center;gap:7px")}>
                  <span style={css("width:10px;height:10px;border-radius:3px;background:{color}", l)}></span>
                  <span style={css("font-size:11.5px;color:#64748B")}>{l.label}</span>
                </div>
              ))}
              <span style={css("font-size:11.5px;color:#94A3B8;margin-left:auto")}>{v.calCount} entregas no mês</span>
            </div>
      
            <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);overflow:hidden")}>
              <div style={css("display:grid;grid-template-columns:repeat(7,minmax(0,1fr));background:#F8FAFC;border-bottom:1px solid #E2E8F0")}>
                {v.calWeekdays.map((w) => (
                  <span key={w} style={css("padding:10px 12px;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>{w}</span>
                ))}
              </div>
              {v.calWeeks.map((wk) => (
                <div key={wk} style={css("display:grid;grid-template-columns:repeat(7,minmax(0,1fr));border-bottom:1px solid #F1F5F9")}>
                  {wk.days.map((d) => (
                    <div key={d} style={css("min-height:118px;padding:8px;border-right:1px solid #F1F5F9;background:{bg};display:flex;flex-direction:column;gap:5px;min-width:0", d)}>
                      <span style={css("align-self:flex-start;font-size:11.5px;font-weight:{numWeight};color:{numFg};background:{numBg};border-radius:99px;min-width:22px;height:22px;display:flex;align-items:center;justify-content:center;padding:0 4px", d)}>{d.num}</span>
                      {d.items.map((it) => (
                        <Hover as="div" style={css("display:flex;align-items:center;gap:5px;background:{bg};border-radius:6px;padding:3px 7px;cursor:pointer;min-width:0", it)} hover="filter:brightness(.96)" title={it.tooltip} onClick={it.open}>
                          <span style={css("width:6px;height:6px;border-radius:99px;background:{fg};flex:none", it)}></span>
                          <span style={css("font-size:10.5px;font-weight:600;color:{fg};overflow:hidden;text-overflow:ellipsis;white-space:nowrap", it)}>{it.label}</span>
                        </Hover>
                      ))}
                      {(d.hasMore) && (
                        <span style={css("font-size:10.5px;font-weight:600;color:#94A3B8;padding-left:2px")}>+ {d.more} mais</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      
        {(v.showPerf) && (
          <div style={css("display:flex;flex-direction:column;gap:18px")}>
            <div style={css("display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap")}>
              <div style={css("display:flex;flex-direction:column;gap:5px")}>
                <h1 style={css("margin:0;font-size:26px;font-weight:700;letter-spacing:-.02em")}>Gestão de desempenho</h1>
                <p style={css("margin:0;font-size:13px;color:#64748B")}>Calculado automaticamente a partir das tarefas registradas no sistema — nota por prazo, velocidade e volume.</p>
              </div>
              <div style={css("display:flex;align-items:center;gap:10px")}>
                <span style={css("font-size:12px;color:#94A3B8;font-weight:600")}>Mês de referência</span>
                <select value={v.perfMonth} onChange={v.onPerfMonth} style={css("padding:9px 12px;border:1px solid #E2E8F0;border-radius:9px;font-size:13px;background:#FFFFFF;color:#334155;outline:none;cursor:pointer")}>
                  {v.monthOptions.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
      
            {(v.perfEmpty) && (
              <div style={css("padding:56px 24px;text-align:center;background:#FFFFFF;border:1px dashed #CBD5E1;border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:10px")}>
                <span style={css("font-size:14.5px;font-weight:700;color:#334155")}>Sem dados de desempenho neste mês</span>
                <span style={css("font-size:12.5px;color:#94A3B8;max-width:52ch;text-wrap:pretty")}>As métricas aparecem automaticamente conforme tarefas são atribuídas e concluídas pelos colaboradores cadastrados.</span>
              </div>
            )}
      
            {(v.perfHasData) && (
              <>
              <div style={css("display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px")}>
                {v.perfKpis.map((k) => (
                  <div key={k.label} style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);padding:18px 20px;display:flex;flex-direction:column;gap:11px;position:relative;overflow:hidden")}>
                    <div style={css("position:absolute;left:0;top:0;bottom:0;width:3px;background:{color}", k)}></div>
                    <span style={css("font-size:12.5px;font-weight:600;color:#64748B")}>{k.label}</span>
                    <div style={css("display:flex;align-items:flex-end;gap:8px")}>
                      <span style={css("font-size:30px;font-weight:700;letter-spacing:-.03em;line-height:1;color:{valueColor}", k)}>{k.value}</span>
                      <span style={css("font-size:12px;color:#94A3B8;padding-bottom:3px")}>{k.unit}</span>
                    </div>
                    <span style={css("font-size:12px;color:{subColor}", k)}>{k.sub}</span>
                  </div>
                ))}
              </div>
      
              <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);padding:18px 22px;display:flex;align-items:center;gap:26px;flex-wrap:wrap")}>
                <div style={css("display:flex;flex-direction:column;gap:3px")}>
                  <span style={css("font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>Nota média da equipe</span>
                  <div style={css("display:flex;align-items:baseline;gap:6px")}>
                    <span style={css("font-size:28px;font-weight:700;letter-spacing:-.03em")}>{v.teamAvg}</span>
                    <span style={css("font-size:13px;color:#94A3B8")}>/ 10</span>
                  </div>
                </div>
                <div style={css("width:1px;align-self:stretch;background:#E2E8F0")}></div>
                <div style={css("flex:1;min-width:220px;display:flex;flex-direction:column;gap:7px")}>
                  <div style={css("display:flex;justify-content:space-between;font-size:11.5px;color:#64748B")}>
                    <span>{v.aboveCount} acima ou na média</span>
                    <span style={css("color:#DC2626;font-weight:600")}>{v.belowCount} abaixo da média — feedback necessário</span>
                  </div>
                  <div style={css("display:flex;height:8px;border-radius:99px;overflow:hidden;background:#F1F5F9")}>
                    <div style={css("background:#16A34A;width:{aboveW};transition:width .4s ease", v)}></div>
                    <div style={css("background:#DC2626;width:{belowW};transition:width .4s ease", v)}></div>
                  </div>
                </div>
                <div style={css("width:1px;align-self:stretch;background:#E2E8F0")}></div>
                <div style={css("display:flex;flex-direction:column;gap:3px;max-width:280px")}>
                  <span style={css("font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>Critério da nota</span>
                  <span style={css("font-size:12px;color:#64748B;text-wrap:pretty")}>50% entregas no prazo · 30% velocidade vs. média · 20% volume entregue.</span>
                </div>
              </div>
      
              <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);overflow:hidden")}>
                <div style={css("display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #E2E8F0")}>
                  <span style={css("font-size:14px;font-weight:700;letter-spacing:-.01em")}>Ranking de produtividade</span>
                  <span style={css("font-size:11.5px;color:#94A3B8")}>{v.perfMonth}</span>
                </div>
                <div style={css("display:grid;grid-template-columns:40px minmax(190px,1.5fr) .8fr .8fr 1.2fr .8fr .9fr .9fr 1.3fr;gap:12px;padding:11px 20px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#94A3B8")}>
                  <span>#</span>
                  <span>Colaborador</span>
                  <span>Atribuídas</span>
                  <span>Concluídas</span>
                  <span>Conclusão</span>
                  <span>Projetos</span>
                  <span>Tempo médio</span>
                  <span>Atrasadas</span>
                  <span>Nota</span>
                </div>
                {v.ranking.map((p) => (
                  <div key={p.name} style={css("display:grid;grid-template-columns:40px minmax(190px,1.5fr) .8fr .8fr 1.2fr .8fr .9fr .9fr 1.3fr;gap:12px;padding:14px 20px;border-bottom:1px solid #F1F5F9;align-items:center;background:{rowBg};transition:background .12s ease", p)}>
                    <span style={css("font-size:13px;font-weight:700;color:{rankColor}", p)}>{p.rank}</span>
                    <div style={css("display:flex;align-items:center;gap:10px;min-width:0")}>
                      <span style={css("width:32px;height:32px;border-radius:99px;background:{bg};color:{fg};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex:none", p)}>{p.initials}</span>
                      <div style={css("display:flex;flex-direction:column;min-width:0")}>
                        <div style={css("display:flex;align-items:center;gap:7px")}>
                          <span style={css("font-size:13.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{p.name}</span>
                          {(p.below) && (
                            <span style={css("font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:2px 7px;border-radius:5px;background:#FEE2E2;color:#B91C1C;white-space:nowrap")}>Feedback</span>
                          )}
                        </div>
                        <div style={css("display:flex;align-items:center;gap:6px")}>
                          <span style={css("font-size:11px;color:#94A3B8")}>{p.role}</span>
                          <span style={css("font-size:10px;font-weight:600;padding:1px 7px;border-radius:99px;background:{teamBg};color:{teamFg}", p)}>{p.team}</span>
                        </div>
                      </div>
                    </div>
                    <div style={css("display:flex;flex-direction:column")}>
                      <span style={css("font-size:13px;font-weight:700;color:#334155")}>{p.assigned}</span>
                      <span style={css("font-size:10.5px;color:#94A3B8")}>{p.openTasks} em aberto</span>
                    </div>
                    <span style={css("font-size:13px;font-weight:700;color:#16A34A")}>{p.delivered}</span>
                    <div style={css("display:flex;align-items:center;gap:8px")}>
                      <div style={css("flex:1;height:6px;border-radius:99px;background:#F1F5F9;overflow:hidden")}>
                        <div style={css("height:100%;border-radius:99px;background:{completionColor};width:{completionW};transition:width .4s ease", p)}></div>
                      </div>
                      <span style={css("font-size:11.5px;font-weight:600;color:{completionColor};width:32px;text-align:right", p)}>{p.completion}</span>
                    </div>
                    <span style={css("font-size:13px;font-weight:600;color:#334155")}>{p.projects}</span>
                    <span style={css("font-size:13px;font-weight:600;color:{speedColor}", p)}>{p.avgDays} dias</span>
                    <span style={css("font-size:13px;font-weight:700;color:{lateColor}", p)}>{p.late}</span>
                    <div style={css("display:flex;align-items:center;gap:10px")}>
                      <div style={css("flex:1;height:7px;border-radius:99px;background:#F1F5F9;overflow:hidden")}>
                        <div style={css("height:100%;border-radius:99px;background:{scoreColor};width:{scoreW};transition:width .4s ease", p)}></div>
                      </div>
                      <span style={css("font-size:13px;font-weight:700;color:{scoreColor};width:34px;text-align:right", p)}>{p.score}</span>
                    </div>
                  </div>
                ))}
              </div>
      
              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px")}>
                <div style={css("background:#FFFFFF;border:1px solid #FECACA;border-radius:14px;padding:20px 22px;display:flex;flex-direction:column;gap:14px")}>
                  <div style={css("display:flex;align-items:center;gap:9px")}>
                    <span style={css("width:8px;height:8px;border-radius:99px;background:#DC2626")}></span>
                    <span style={css("font-size:13.5px;font-weight:700")}>Pontos de atenção do mês</span>
                  </div>
                  {v.attention.map((a) => (
                    <div key={a} style={css("display:flex;align-items:flex-start;gap:11px;padding-bottom:11px;border-bottom:1px solid #F1F5F9")}>
                      <span style={css("width:28px;height:28px;border-radius:99px;background:{bg};color:{fg};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex:none", a)}>{a.initials}</span>
                      <div style={css("display:flex;flex-direction:column;gap:2px")}>
                        <span style={css("font-size:12.5px;font-weight:600;color:#334155")}>{a.name}</span>
                        <span style={css("font-size:12px;color:#64748B;text-wrap:pretty")}>{a.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:20px 22px;display:flex;flex-direction:column;gap:14px")}>
                  <div style={css("display:flex;align-items:center;gap:9px")}>
                    <span style={css("width:8px;height:8px;border-radius:99px;background:#16A34A")}></span>
                    <span style={css("font-size:13.5px;font-weight:700")}>Destaques do mês</span>
                  </div>
                  {v.highlights.map((a) => (
                    <div key={a} style={css("display:flex;align-items:flex-start;gap:11px;padding-bottom:11px;border-bottom:1px solid #F1F5F9")}>
                      <span style={css("width:28px;height:28px;border-radius:99px;background:{bg};color:{fg};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex:none", a)}>{a.initials}</span>
                      <div style={css("display:flex;flex-direction:column;gap:2px")}>
                        <span style={css("font-size:12.5px;font-weight:600;color:#334155")}>{a.name}</span>
                        <span style={css("font-size:12px;color:#64748B;text-wrap:pretty")}>{a.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </>
            )}
          </div>
        )}
      
        {(v.showReg) && (
          <div style={css("display:flex;flex-direction:column;gap:18px")}>
            <div style={css("display:flex;flex-direction:column;gap:5px")}>
              <h1 style={css("margin:0;font-size:26px;font-weight:700;letter-spacing:-.02em")}>Cadastros</h1>
              <p style={css("margin:0;font-size:13px;color:#64748B")}>Gerencie colaboradores, requerentes e equipes. Tudo fica salvo neste navegador.</p>
            </div>
      
            {(v.hasRegError) && (
              <div style={css("padding:10px 14px;border-radius:9px;background:#FEF2F2;border:1px solid #FECACA;color:#B91C1C;font-size:12.5px;font-weight:500;align-self:flex-start")}>{v.regError}</div>
            )}
      
            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;align-items:start")}>
              <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);padding:20px 22px;display:flex;flex-direction:column;gap:14px")}>
                <div style={css("display:flex;align-items:center;justify-content:space-between")}>
                  <span style={css("font-size:14px;font-weight:700")}>Colaboradores</span>
                  <span style={css("font-size:11.5px;font-weight:600;color:#64748B;background:#F1F5F9;border-radius:99px;padding:2px 9px")}>{v.peopleCount}</span>
                </div>
                {v.regPeople.map((m) => (
                  <div key={m.name} style={css("display:flex;flex-direction:column;gap:8px;padding-bottom:11px;border-bottom:1px solid #F1F5F9")}>
                    <div style={css("display:flex;align-items:center;gap:10px")}>
                      <span style={css("width:30px;height:30px;border-radius:99px;background:{bg};color:{fg};display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;flex:none", m)}>{m.initials}</span>
                      <div style={css("display:flex;flex-direction:column;min-width:0;flex:1")}>
                        <span style={css("font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{m.name}</span>
                        <div style={css("display:flex;align-items:center;gap:6px")}>
                          <span style={css("font-size:11px;color:#94A3B8")}>{m.role}</span>
                          <span style={css("font-size:10px;font-weight:600;padding:1px 7px;border-radius:99px;background:{teamBg};color:{teamFg}", m)}>{m.team}</span>
                        </div>
                      </div>
                      {(m.canRemove) && (
                        <Hover as="button" style={css("width:26px;height:26px;border:0;border-radius:7px;background:transparent;color:#CBD5E1;font-size:12px;cursor:pointer;flex:none")} hover="background:#FEF2F2;color:#DC2626" onClick={m.remove} title="Remover">✕</Hover>
                      )}
                    </div>
                    {(m.canManagePassword) && (
                      <div style={css("display:flex;flex-direction:column;gap:6px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:8px 10px")}>
                        {(m.isEditingPassword) ? (
                          <div style={css("display:flex;flex-direction:column;gap:6px")}>
                            <span style={css("font-size:10.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#94A3B8")}>Nova senha</span>
                            <input
                              value={m.editPasswordValue}
                              onChange={m.onEditPassword}
                              type="text"
                              placeholder="Senha de acesso"
                              style={css("padding:7px 10px;border:1px solid #E2E8F0;border-radius:7px;font-size:12px;outline:none;background:#FFFFFF")}
                            />
                            <div style={css("display:flex;gap:6px")}>
                              <button type="button" onClick={m.savePassword} style={css("padding:6px 10px;border:0;border-radius:7px;background:#0F172A;color:#FFFFFF;font-size:11.5px;font-weight:600;cursor:pointer")}>Salvar</button>
                              <button type="button" onClick={m.cancelEditPassword} style={css("padding:6px 10px;border:1px solid #E2E8F0;border-radius:7px;background:#FFFFFF;color:#475569;font-size:11.5px;font-weight:600;cursor:pointer")}>Cancelar</button>
                            </div>
                          </div>
                        ) : (
                          <div style={css("display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap")}>
                            <div style={css("display:flex;align-items:center;gap:6px;min-width:0")}>
                              <span style={css("font-size:10.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#94A3B8")}>Senha</span>
                              <span style={css("font-size:12px;color:#475569;font-family:ui-monospace,monospace")}>{m.passwordLabel}</span>
                            </div>
                            <div style={css("display:flex;gap:4px")}>
                              <button type="button" onClick={m.togglePasswordVisible} style={css("padding:4px 8px;border:1px solid #E2E8F0;border-radius:6px;background:#FFFFFF;color:#475569;font-size:11px;font-weight:600;cursor:pointer")}>
                                {m.isPasswordVisible ? 'Ocultar' : 'Ver'}
                              </button>
                              <button type="button" onClick={m.startEditPassword} style={css("padding:4px 8px;border:1px solid #E2E8F0;border-radius:6px;background:#FFFFFF;color:#475569;font-size:11px;font-weight:600;cursor:pointer")}>Editar</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div style={css("display:flex;flex-direction:column;gap:8px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:12px 14px")}>
                  <span style={css("font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#94A3B8")}>Adicionar colaborador</span>
                  <input value={v.pName} onChange={v.onPName} placeholder="Nome completo" style={css("padding:8px 11px;border:1px solid #E2E8F0;border-radius:8px;font-size:12.5px;outline:none;background:#FFFFFF")} />
                  <div style={css("display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center")}>
                    <input value={v.pPassword} onChange={v.onPPassword} placeholder="Senha de acesso" type={v.pPasswordVisible ? 'text' : 'password'} style={css("padding:8px 11px;border:1px solid #E2E8F0;border-radius:8px;font-size:12.5px;outline:none;background:#FFFFFF")} />
                    <button type="button" onClick={v.toggleNewPasswordVisible} style={css("padding:8px 10px;border:1px solid #E2E8F0;border-radius:8px;background:#FFFFFF;color:#475569;font-size:11.5px;font-weight:600;cursor:pointer;white-space:nowrap")}>
                      {v.pPasswordVisible ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
                  <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:8px")}>
                    <input value={v.pRole} onChange={v.onPRole} placeholder="Função (ex.: Design)" style={css("padding:8px 11px;border:1px solid #E2E8F0;border-radius:8px;font-size:12.5px;outline:none;background:#FFFFFF")} />
                    <select value={v.pTeam} onChange={v.onPTeam} style={css("padding:8px 9px;border:1px solid #E2E8F0;border-radius:8px;font-size:12px;background:#FFFFFF;outline:none;cursor:pointer")}>
                      {v.teamList.map((tm) => (
                        <option key={tm} value={tm}>{tm}</option>
                      ))}
                    </select>
                  </div>
                  <Hover as="button" style={css("padding:8px;border:0;border-radius:8px;background:#0F172A;color:#FFFFFF;font-size:12.5px;font-weight:600;cursor:pointer")} hover="background:#1E293B" onClick={v.addPerson}>Adicionar</Hover>
                </div>
              </div>
      
              <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);padding:20px 22px;display:flex;flex-direction:column;gap:14px")}>
                <div style={css("display:flex;align-items:center;justify-content:space-between")}>
                  <span style={css("font-size:14px;font-weight:700")}>Requerentes</span>
                  <span style={css("font-size:11.5px;font-weight:600;color:#64748B;background:#F1F5F9;border-radius:99px;padding:2px 9px")}>{v.reqCount}</span>
                </div>
                {v.regReqs.map((m) => (
                  <div key={m} style={css("display:flex;align-items:center;gap:10px;padding-bottom:11px;border-bottom:1px solid #F1F5F9")}>
                    <span style={css("width:30px;height:30px;border-radius:99px;background:{bg};color:{fg};display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;flex:none", m)}>{m.initials}</span>
                    <div style={css("display:flex;flex-direction:column;min-width:0;flex:1")}>
                      <span style={css("font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{m.name}</span>
                      <span style={css("font-size:11px;color:#94A3B8")}>{m.role}</span>
                    </div>
                    {(m.canRemove) && (
                    <Hover as="button" style={css("width:26px;height:26px;border:0;border-radius:7px;background:transparent;color:#CBD5E1;font-size:12px;cursor:pointer;flex:none")} hover="background:#FEF2F2;color:#DC2626" onClick={m.remove} title="Remover">✕</Hover>
                    )}
                  </div>
                ))}
                <div style={css("display:flex;flex-direction:column;gap:8px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:12px 14px")}>
                  <span style={css("font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#94A3B8")}>Adicionar requerente</span>
                  <input value={v.rName} onChange={v.onRName} placeholder="Nome" style={css("padding:8px 11px;border:1px solid #E2E8F0;border-radius:8px;font-size:12.5px;outline:none;background:#FFFFFF")} />
                  <input value={v.rRole} onChange={v.onRRole} placeholder="Cargo / área (ex.: Diretor Comercial)" style={css("padding:8px 11px;border:1px solid #E2E8F0;border-radius:8px;font-size:12.5px;outline:none;background:#FFFFFF")} />
                  <Hover as="button" style={css("padding:8px;border:0;border-radius:8px;background:#0F172A;color:#FFFFFF;font-size:12.5px;font-weight:600;cursor:pointer")} hover="background:#1E293B" onClick={v.addRequester}>Adicionar</Hover>
                </div>
              </div>
      
              <div style={css("background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,42,.04);padding:20px 22px;display:flex;flex-direction:column;gap:14px")}>
                <div style={css("display:flex;align-items:center;justify-content:space-between")}>
                  <span style={css("font-size:14px;font-weight:700")}>Equipes</span>
                  <span style={css("font-size:11.5px;font-weight:600;color:#64748B;background:#F1F5F9;border-radius:99px;padding:2px 9px")}>{v.teamCount}</span>
                </div>
                {v.regTeams.map((m) => (
                  <div key={m} style={css("display:flex;align-items:center;gap:10px;padding-bottom:11px;border-bottom:1px solid #F1F5F9")}>
                    <span style={css("width:10px;height:10px;border-radius:99px;background:{dot};flex:none", m)}></span>
                    <div style={css("display:flex;flex-direction:column;min-width:0;flex:1")}>
                      <span style={css("font-size:13px;font-weight:600")}>{m.name}</span>
                      <span style={css("font-size:11px;color:#94A3B8")}>{m.count} colaborador(es)</span>
                    </div>
                    {(m.canRemove) && (
                    <Hover as="button" style={css("width:26px;height:26px;border:0;border-radius:7px;background:transparent;color:#CBD5E1;font-size:12px;cursor:pointer;flex:none")} hover="background:#FEF2F2;color:#DC2626" onClick={m.remove} title="Remover">✕</Hover>
                    )}
                  </div>
                ))}
                <div style={css("display:flex;flex-direction:column;gap:8px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:12px 14px")}>
                  <span style={css("font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#94A3B8")}>Adicionar equipe</span>
                  <div style={css("display:grid;grid-template-columns:1fr auto;gap:8px")}>
                    <input value={v.tmName} onChange={v.onTmName} placeholder="Nome da equipe" style={css("padding:8px 11px;border:1px solid #E2E8F0;border-radius:8px;font-size:12.5px;outline:none;background:#FFFFFF")} />
                    <Hover as="button" style={css("padding:8px 16px;border:0;border-radius:8px;background:#0F172A;color:#FFFFFF;font-size:12.5px;font-weight:600;cursor:pointer")} hover="background:#1E293B" onClick={v.addTeam}>Adicionar</Hover>
                  </div>
                </div>
                <span style={css("font-size:11px;color:#94A3B8;text-wrap:pretty")}>Equipes com colaboradores vinculados não podem ser removidas.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
