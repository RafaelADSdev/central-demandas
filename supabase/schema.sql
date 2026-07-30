-- Central de Demandas — tabela única de estado (JSON)
-- Rode no SQL Editor do Supabase: https://supabase.com/dashboard/project/ugusoowvycthzfrmblyl/sql

CREATE TABLE IF NOT EXISTS public.app_store (
  id TEXT PRIMARY KEY DEFAULT 'main',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.app_store ENABLE ROW LEVEL SECURITY;

-- MVP sem auth: leitura/escrita pública (troque quando adicionar login)
DROP POLICY IF EXISTS "app_store_select" ON public.app_store;
DROP POLICY IF EXISTS "app_store_insert" ON public.app_store;
DROP POLICY IF EXISTS "app_store_update" ON public.app_store;

CREATE POLICY "app_store_select" ON public.app_store FOR SELECT USING (true);
CREATE POLICY "app_store_insert" ON public.app_store FOR INSERT WITH CHECK (true);
CREATE POLICY "app_store_update" ON public.app_store FOR UPDATE USING (true) WITH CHECK (true);

-- Linha inicial vazia (opcional)
INSERT INTO public.app_store (id, payload)
VALUES ('main', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Realtime (opcional — sync entre abas/usuários)
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_store;
