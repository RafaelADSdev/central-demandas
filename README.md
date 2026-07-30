# Central de Demandas

Sistema de gestão de demandas — projetos macro, microtarefas, tarefas avulsas, calendário, desempenho e cadastros.

## Stack

- **Vite** + **React 19** + **TypeScript**
- Persistência local via `localStorage` (chave `central-demandas-v1`)
- Deploy: Vercel, Netlify ou qualquer host estático

## Deploy (Vercel)

- **Produção:** https://central-demandas-mu.vercel.app
- **GitHub:** https://github.com/RafaelADSdev/central-demandas
- **Projeto Vercel:** `auzendegbrs-projects/central-demandas`

Cada `git push` na branch `master` dispara deploy automático (conecte o repo no painel Vercel se ainda não estiver linkado).

```bash
vercel link --yes --project central-demandas   # link local
vercel --prod                                  # deploy manual
vercel env ls                                  # ver variáveis
```

## Supabase

1. No painel do Supabase, abra **SQL Editor** e execute o arquivo [`supabase/schema.sql`](supabase/schema.sql).
2. Copie `.env.example` para `.env.local` e preencha:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` (chave **publishable** — nunca a secret no frontend)
3. Na Vercel, adicione as mesmas variáveis em **Settings → Environment Variables**.

Os dados ficam na tabela `app_store` (JSON). O app mantém `localStorage` como cache/fallback e migra automaticamente dados locais na primeira sincronização.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre em [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  App.tsx              — ponto de entrada do app
  AppView.tsx          — UI (gerada do protótipo HTML)
  Hover.tsx            — componente para estilos hover
  hooks/
    useCentralDemandas.ts — toda a lógica de negócio
  lib/
    constants.ts       — STATUS, PRIORITY, PALETTE
    types.ts           — tipos TypeScript
    utils.ts           — helpers (datas, css, localStorage)
legacy/                — protótipo HTML original (referência)
scripts/
  convert-template.mjs — reconverte AppView.tsx a partir do HTML legado
  fix-appview.mjs      — pós-processamento do JSX gerado
```

## Regenerar UI a partir do protótipo

Se editar o HTML legado e quiser atualizar a UI:

```bash
node scripts/convert-template.mjs
node scripts/fix-appview.mjs
```

## Próximos passos (sugeridos)

- Substituir `localStorage` por **Supabase**
- Auth multiusuário
- Deploy na **Vercel**

## Design

Visual idêntico ao protótipo original. Fonte Inter, tokens de cor e layout preservados.
