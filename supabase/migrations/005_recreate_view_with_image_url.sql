-- Migration 005: recreate view to pick up image_url column + seed images
-- The view was created before ALTER TABLE added image_url, so e.* didn't include it.
-- CREATE OR REPLACE VIEW re-evaluates the column list, fixing this.

DROP VIEW IF EXISTS public.v_events_with_state CASCADE;

CREATE VIEW public.v_events_with_state AS
SELECT
  e.id,
  e.title,
  e.category,
  e.status,
  e.is_flash,
  e.source,
  e.source_url,
  e.resolution_criteria,
  e.deadline_at,
  e.resolution_result,
  e.resolution_note,
  e.resolved_at,
  e.created_by,
  e.created_at,
  e.updated_at,
  e.image_url,
  ms.shares_sim,
  ms.shares_nao,
  ms.volume_total,
  ms.participant_count,
  ms.last_price_sim,
  ms.b_param,
  ROUND(ms.last_price_sim * 100, 1)                        AS sim_percent,
  CASE WHEN ms.last_price_sim > 0
    THEN ROUND(0.95 / ms.last_price_sim, 4)  END           AS cotacao_sim,
  CASE WHEN ms.last_price_sim < 1
    THEN ROUND(0.95 / (1 - ms.last_price_sim), 4) END      AS cotacao_nao,
  -- Convenience aliases used by the app
  COALESCE(ms.volume_total, 0)                             AS total_volume,
  ROUND(COALESCE(ms.last_price_sim, 0.5) * 100, 1)        AS yes_percent,
  ROUND((1 - COALESCE(ms.last_price_sim, 0.5)) * 100, 1)  AS no_percent,
  COALESCE(ms.volume_total * COALESCE(ms.last_price_sim, 0.5), 0) AS yes_amount,
  COALESCE(ms.volume_total * (1 - COALESCE(ms.last_price_sim, 0.5)), 0) AS no_amount
FROM public.events e
LEFT JOIN public.market_state ms ON ms.event_id = e.id;

-- Grant read access to anon and authenticated roles
GRANT SELECT ON public.v_events_with_state TO anon, authenticated;

-- Update seeded events with placeholder images (picsum.photos — stable CDN)
UPDATE public.events SET image_url = 'https://picsum.photos/seed/flamengo/800/400'
  WHERE id = 'flamengo-x-mirassol';

UPDATE public.events SET image_url = 'https://picsum.photos/seed/palmeiras/800/400'
  WHERE id = 'palmeiras-x-botafogo';

UPDATE public.events SET image_url = 'https://picsum.photos/seed/ipca2026/800/400'
  WHERE id = 'ipca-maio-abaixo-05';

UPDATE public.events SET image_url = 'https://picsum.photos/seed/copa2026/800/400'
  WHERE id = 'selecao-brasil-copa-2026';

UPDATE public.events SET image_url = 'https://picsum.photos/seed/selic2026/800/400'
  WHERE id = 'selic-queda-junho';
