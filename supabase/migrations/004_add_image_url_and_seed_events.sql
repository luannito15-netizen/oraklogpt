-- Add image_url column to events
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS image_url text;

-- Seed football and other events with spread deadlines
INSERT INTO public.events (id, title, category, status, source, resolution_criteria, deadline_at, image_url)
VALUES
  (
    'flamengo-x-mirassol',
    'Flamengo vence o próximo jogo contra o Mirassol?',
    'Esportes',
    'open',
    'CBF',
    'Resultado oficial registrado no site da CBF. Resolução em até 24h após o apito final.',
    now() + interval '2 days',
    null
  ),
  (
    'palmeiras-x-botafogo',
    'Palmeiras vence o clássico contra o Botafogo?',
    'Esportes',
    'open',
    'CBF',
    'Resultado oficial registrado no site da CBF. Resolução em até 24h após o apito final.',
    now() + interval '5 days',
    null
  ),
  (
    'ipca-maio-abaixo-05',
    'IPCA de maio fica abaixo de 0,5%?',
    'Economia',
    'open',
    'IBGE',
    'Índice oficial divulgado pelo IBGE. Resolução em até 24h após a publicação.',
    now() + interval '10 days',
    null
  ),
  (
    'selecao-brasil-copa-2026',
    'Brasil se classifica para as oitavas da Copa 2026?',
    'Esportes',
    'open',
    'FIFA',
    'Resultado oficial divulgado pela FIFA. Resolução em até 24h após a fase de grupos.',
    now() + interval '45 days',
    null
  ),
  (
    'selic-queda-junho',
    'Copom corta a Selic em junho de 2026?',
    'Economia',
    'open',
    'Banco Central',
    'Comunicado oficial do Copom publicado no site do Banco Central.',
    now() + interval '20 days',
    null
  )
ON CONFLICT (id) DO NOTHING;
