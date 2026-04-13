-- ═══════════════════════════════════════════════════════════════════
-- ORAKLO — Migração 003: Seed do usuário mock para desenvolvimento
-- Insere o usuário mock usado pelo client sem autenticação real.
-- ═══════════════════════════════════════════════════════════════════

-- Inserir o usuário mock em auth.users (necessário pela FK em positions)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'mock@oraklo.dev',
  '',
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"username":"mock","name":"Usuário Dev"}',
  false,
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- Inserir o profile correspondente
INSERT INTO public.profiles (id, username, display_name)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'mock',
  'Usuário Dev'
)
ON CONFLICT (id) DO NOTHING;
