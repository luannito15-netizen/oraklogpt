-- ═══════════════════════════════════════════════════════════════════
-- ORAKLO — Schema inicial
-- Migração 001
-- ═══════════════════════════════════════════════════════════════════

-- ── Extensões ────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════════════════════════
-- TABELAS
-- ══════════════════════════════════════════════════════════════════

-- ── profiles ─────────────────────────────────────────────────────
-- Estende auth.users com dados públicos e métricas de mercado
CREATE TABLE public.profiles (
  id              uuid        REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username        text        UNIQUE NOT NULL,
  display_name    text,
  avatar_url      text,
  is_admin        boolean     DEFAULT false,
  tier            text        DEFAULT 'observador'
                              CHECK (tier IN ('observador','analista','estrategista','oraculo')),

  -- Métricas de performance
  total_positions int         DEFAULT 0,
  correct_positions int       DEFAULT 0,
  total_invested  numeric(14,2) DEFAULT 0,
  total_returned  numeric(14,2) DEFAULT 0,
  brier_score     numeric(8,6),  -- lower = better calibration

  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- ── events ───────────────────────────────────────────────────────
-- Os mercados de previsão
CREATE TABLE public.events (
  id                  text        PRIMARY KEY,          -- slug legível: "ibovespa-200k-maio"
  title               text        NOT NULL,
  category            text        NOT NULL
                                  CHECK (category IN ('Economia','Esportes','Política','Clima')),
  status              text        DEFAULT 'draft'
                                  CHECK (status IN ('draft','open','closed','resolving','resolved','canceled')),
  is_flash            boolean     DEFAULT false,

  -- Resolução
  source              text        NOT NULL,
  source_url          text,
  resolution_criteria text        NOT NULL,
  deadline_at         timestamptz NOT NULL,

  -- Resultado
  resolution_result   text        CHECK (resolution_result IN ('SIM','NAO','CANCELED')),
  resolution_note     text,
  resolved_at         timestamptz,

  -- Auditoria
  created_by          uuid        REFERENCES auth.users,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

-- ── market_state ─────────────────────────────────────────────────
-- Estado atual do mercado — atualizado atomicamente a cada posição
-- Modelo AMM simplificado: price_sim = shares_sim / (shares_sim + shares_nao)
-- Inicializa com b shares virtuais em cada lado (liquidez inicial)
CREATE TABLE public.market_state (
  event_id          text        REFERENCES public.events ON DELETE CASCADE PRIMARY KEY,
  shares_sim        numeric(20,6) DEFAULT 1000,  -- inclui shares virtuais de liquidez inicial
  shares_nao        numeric(20,6) DEFAULT 1000,
  b_param           numeric(10,2) DEFAULT 1000,  -- liquidez inicial (virtual)
  volume_total      numeric(16,2) DEFAULT 0,      -- volume real investido (sem virtual)
  participant_count int           DEFAULT 0,
  last_price_sim    numeric(8,6)  DEFAULT 0.5,   -- cache da última probabilidade calculada
  updated_at        timestamptz   DEFAULT now()
);

-- ── positions ────────────────────────────────────────────────────
-- Posições abertas e históricas de cada usuário
CREATE TABLE public.positions (
  id                    uuid          DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id               uuid          REFERENCES auth.users NOT NULL,
  event_id              text          REFERENCES public.events NOT NULL,
  side                  text          NOT NULL CHECK (side IN ('SIM','NAO')),

  -- Valores
  value_gross           numeric(14,2) NOT NULL,             -- quanto o usuário pagou
  fee                   numeric(14,2) NOT NULL,             -- taxa da plataforma (5%)
  value_net             numeric(14,2) NOT NULL,             -- gross - fee
  cotacao               numeric(10,4) NOT NULL,             -- multiplicador no momento da compra
  price_sim_at_purchase numeric(8,6)  NOT NULL,             -- probabilidade SIM no momento

  -- Estimativas e resultado
  estimated_return      numeric(14,2) NOT NULL,             -- calculado no momento da compra
  actual_return         numeric(14,2),                      -- preenchido na resolução
  profit_loss           numeric(14,2),                      -- preenchido na resolução

  -- Status
  status                text          DEFAULT 'open'
                                      CHECK (status IN ('open','won','lost','canceled')),

  created_at            timestamptz   DEFAULT now()
);

-- ── market_history ───────────────────────────────────────────────
-- Série temporal de probabilidade — alimenta o gráfico de preço
CREATE TABLE public.market_history (
  id                        bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id                  text        REFERENCES public.events NOT NULL,
  price_sim                 numeric(8,6) NOT NULL,
  volume_at_point           numeric(16,2) NOT NULL,
  participant_count_at_point int         NOT NULL,
  recorded_at               timestamptz DEFAULT now()
);

-- ── resolutions ──────────────────────────────────────────────────
-- Registro auditável de cada resolução de mercado
CREATE TABLE public.resolutions (
  id               uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id         text        REFERENCES public.events NOT NULL,
  result           text        NOT NULL CHECK (result IN ('SIM','NAO','CANCELED')),
  resolved_by      uuid        REFERENCES auth.users NOT NULL,
  source_evidence  text        NOT NULL,    -- link ou descrição do dado oficial
  note             text,
  resolved_at      timestamptz DEFAULT now()
);


-- ══════════════════════════════════════════════════════════════════
-- ÍNDICES
-- ══════════════════════════════════════════════════════════════════

CREATE INDEX idx_events_status        ON public.events (status);
CREATE INDEX idx_events_category      ON public.events (category);
CREATE INDEX idx_events_deadline      ON public.events (deadline_at);
CREATE INDEX idx_positions_user       ON public.positions (user_id);
CREATE INDEX idx_positions_event      ON public.positions (event_id);
CREATE INDEX idx_positions_user_event ON public.positions (user_id, event_id);
CREATE INDEX idx_market_history_event ON public.market_history (event_id, recorded_at DESC);


-- ══════════════════════════════════════════════════════════════════
-- TRIGGERS — updated_at automático
-- ══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ══════════════════════════════════════════════════════════════════
-- TRIGGER — criar profile automaticamente após signup Supabase Auth
-- ══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ══════════════════════════════════════════════════════════════════
-- TRIGGER — criar market_state automaticamente ao abrir evento
-- ══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.handle_event_opened()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = 'open' AND (OLD.status IS NULL OR OLD.status = 'draft') THEN
    INSERT INTO public.market_state (event_id)
    VALUES (NEW.id)
    ON CONFLICT (event_id) DO NOTHING;

    -- Ponto inicial no histórico
    INSERT INTO public.market_history (event_id, price_sim, volume_at_point, participant_count_at_point)
    VALUES (NEW.id, 0.5, 0, 0);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_event_opened
  AFTER INSERT OR UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.handle_event_opened();


-- ══════════════════════════════════════════════════════════════════
-- FUNÇÃO CENTRAL: place_position
-- Registra uma posição de forma atômica — preço, position e histórico
-- em uma única transação com lock de linha.
-- ══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.place_position(
  p_user_id       uuid,
  p_event_id      text,
  p_side          text,       -- 'SIM' | 'NAO'
  p_value_gross   numeric
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_state         public.market_state%ROWTYPE;
  v_fee           numeric;
  v_net           numeric;
  v_price_sim     numeric;
  v_cotacao       numeric;
  v_estimated     numeric;
  v_new_sim       numeric;
  v_new_nao       numeric;
  v_new_price_sim numeric;
  v_position_id   uuid;
  c_fee_rate      CONSTANT numeric := 0.05;
  c_min_value     CONSTANT numeric := 1.00;
BEGIN
  -- Validações básicas
  IF p_value_gross < c_min_value THEN
    RAISE EXCEPTION 'Valor mínimo é R$ %.2f', c_min_value;
  END IF;

  IF p_side NOT IN ('SIM', 'NAO') THEN
    RAISE EXCEPTION 'Lado inválido: %', p_side;
  END IF;

  -- Verificar evento aberto
  IF NOT EXISTS (
    SELECT 1 FROM public.events WHERE id = p_event_id AND status = 'open'
  ) THEN
    RAISE EXCEPTION 'Evento % não encontrado ou não está aberto', p_event_id;
  END IF;

  -- Lock pessimista na linha do mercado (evita race condition)
  SELECT * INTO v_state
  FROM public.market_state
  WHERE event_id = p_event_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Estado de mercado não encontrado para evento %', p_event_id;
  END IF;

  -- ── Calcular trade ────────────────────────────────────────────
  v_fee       := p_value_gross * c_fee_rate;
  v_net       := p_value_gross - v_fee;
  v_price_sim := v_state.shares_sim / (v_state.shares_sim + v_state.shares_nao);

  IF p_side = 'SIM' THEN
    v_cotacao   := (1 - c_fee_rate) / v_price_sim;
    v_new_sim   := v_state.shares_sim + v_net;
    v_new_nao   := v_state.shares_nao;
  ELSE
    v_cotacao   := (1 - c_fee_rate) / (1 - v_price_sim);
    v_new_sim   := v_state.shares_sim;
    v_new_nao   := v_state.shares_nao + v_net;
  END IF;

  v_estimated     := v_net * v_cotacao;
  v_new_price_sim := v_new_sim / (v_new_sim + v_new_nao);

  -- ── Inserir posição ───────────────────────────────────────────
  INSERT INTO public.positions (
    user_id, event_id, side,
    value_gross, fee, value_net,
    cotacao, price_sim_at_purchase, estimated_return
  )
  VALUES (
    p_user_id, p_event_id, p_side,
    p_value_gross, v_fee, v_net,
    ROUND(v_cotacao, 4), ROUND(v_price_sim, 6), ROUND(v_estimated, 2)
  )
  RETURNING id INTO v_position_id;

  -- ── Atualizar estado do mercado ───────────────────────────────
  UPDATE public.market_state SET
    shares_sim        = v_new_sim,
    shares_nao        = v_new_nao,
    volume_total      = volume_total + p_value_gross,
    participant_count = participant_count + 1,
    last_price_sim    = ROUND(v_new_price_sim, 6),
    updated_at        = now()
  WHERE event_id = p_event_id;

  -- ── Registrar ponto no histórico ──────────────────────────────
  INSERT INTO public.market_history (
    event_id, price_sim, volume_at_point, participant_count_at_point
  )
  VALUES (
    p_event_id,
    ROUND(v_new_price_sim, 6),
    v_state.volume_total + p_value_gross,
    v_state.participant_count + 1
  );

  -- ── Retornar resultado da operação ────────────────────────────
  RETURN json_build_object(
    'position_id',    v_position_id,
    'cotacao',        ROUND(v_cotacao, 4),
    'estimated_return', ROUND(v_estimated, 2),
    'fee',            ROUND(v_fee, 2),
    'new_price_sim',  ROUND(v_new_price_sim, 6),
    'price_impact',   ROUND(v_new_price_sim - v_price_sim, 6)
  );
END;
$$;


-- ══════════════════════════════════════════════════════════════════
-- FUNÇÃO: resolve_event
-- Fecha o mercado, distribui retornos e registra resolução.
-- ══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.resolve_event(
  p_event_id        text,
  p_result          text,         -- 'SIM' | 'NAO' | 'CANCELED'
  p_resolved_by     uuid,
  p_source_evidence text,
  p_note            text DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_winner_count  int;
  v_total_payout  numeric;
BEGIN
  IF p_result NOT IN ('SIM', 'NAO', 'CANCELED') THEN
    RAISE EXCEPTION 'Resultado inválido: %', p_result;
  END IF;

  -- Atualizar evento
  UPDATE public.events SET
    status            = 'resolved',
    resolution_result = p_result,
    resolution_note   = p_note,
    resolved_at       = now()
  WHERE id = p_event_id AND status IN ('open', 'closed', 'resolving');

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Evento % não encontrado ou já resolvido', p_event_id;
  END IF;

  -- Registro de auditoria
  INSERT INTO public.resolutions (event_id, result, resolved_by, source_evidence, note)
  VALUES (p_event_id, p_result, p_resolved_by, p_source_evidence, p_note);

  IF p_result = 'CANCELED' THEN
    -- Devolve o valor bruto de todas as posições
    UPDATE public.positions SET
      status        = 'canceled',
      actual_return = value_gross,
      profit_loss   = 0
    WHERE event_id = p_event_id AND status = 'open';
  ELSE
    -- Vencedores recebem o retorno estimado
    UPDATE public.positions SET
      status        = 'won',
      actual_return = estimated_return,
      profit_loss   = estimated_return - value_gross
    WHERE event_id = p_event_id AND side = p_result AND status = 'open';

    -- Perdedores perdem o investimento
    UPDATE public.positions SET
      status        = 'lost',
      actual_return = 0,
      profit_loss   = -value_gross
    WHERE event_id = p_event_id AND side != p_result AND status = 'open';
  END IF;

  -- Agregar resultado
  SELECT
    COUNT(*),
    COALESCE(SUM(actual_return), 0)
  INTO v_winner_count, v_total_payout
  FROM public.positions
  WHERE event_id = p_event_id AND status IN ('won', 'canceled');

  RETURN json_build_object(
    'event_id',     p_event_id,
    'result',       p_result,
    'winner_count', v_winner_count,
    'total_payout', v_total_payout
  );
END;
$$;


-- ══════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ══════════════════════════════════════════════════════════════════

ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_state   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resolutions    ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "profiles_public_read"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "profiles_self_update"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- events — draft invisível ao público
CREATE POLICY "events_public_read"
  ON public.events FOR SELECT
  USING (status != 'draft');

CREATE POLICY "events_admin_all"
  ON public.events FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- market_state — leitura pública, escrita apenas via funções SECURITY DEFINER
CREATE POLICY "market_state_public_read"
  ON public.market_state FOR SELECT USING (true);

-- positions — usuário lê apenas as próprias; escrita via funções
CREATE POLICY "positions_self_read"
  ON public.positions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "positions_admin_read"
  ON public.positions FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- market_history — leitura pública
CREATE POLICY "market_history_public_read"
  ON public.market_history FOR SELECT USING (true);

-- resolutions — leitura pública
CREATE POLICY "resolutions_public_read"
  ON public.resolutions FOR SELECT USING (true);


-- ══════════════════════════════════════════════════════════════════
-- VIEWS AUXILIARES
-- ══════════════════════════════════════════════════════════════════

-- Vista de evento completo com estado de mercado
CREATE OR REPLACE VIEW public.v_events_with_state AS
SELECT
  e.*,
  ms.shares_sim,
  ms.shares_nao,
  ms.volume_total,
  ms.participant_count,
  ms.last_price_sim,
  ms.b_param,
  -- Probabilidade atual como percentual (0-100)
  ROUND(ms.last_price_sim * 100, 1) AS sim_percent,
  -- Cotações atuais (apenas indicativas, compra usa place_position)
  CASE WHEN ms.last_price_sim > 0
    THEN ROUND(0.95 / ms.last_price_sim, 4)
    ELSE NULL
  END AS cotacao_sim,
  CASE WHEN ms.last_price_sim < 1
    THEN ROUND(0.95 / (1 - ms.last_price_sim), 4)
    ELSE NULL
  END AS cotacao_nao
FROM public.events e
LEFT JOIN public.market_state ms ON ms.event_id = e.id;

-- Vista de dashboard do usuário
CREATE OR REPLACE VIEW public.v_user_dashboard AS
SELECT
  p.id AS user_id,
  p.username,
  p.display_name,
  p.tier,
  p.brier_score,
  COUNT(pos.id) FILTER (WHERE pos.status = 'open')   AS open_positions,
  COUNT(pos.id) FILTER (WHERE pos.status = 'won')    AS won_positions,
  COUNT(pos.id) FILTER (WHERE pos.status = 'lost')   AS lost_positions,
  COALESCE(SUM(pos.value_gross) FILTER (WHERE pos.status = 'open'), 0) AS invested_open,
  COALESCE(SUM(pos.estimated_return) FILTER (WHERE pos.status = 'open'), 0) AS estimated_return_open,
  COALESCE(SUM(pos.actual_return) FILTER (WHERE pos.status = 'won'), 0)     AS total_returned,
  COALESCE(SUM(pos.profit_loss)   FILTER (WHERE pos.status != 'open'), 0)   AS total_profit_loss
FROM public.profiles p
LEFT JOIN public.positions pos ON pos.user_id = p.id
GROUP BY p.id, p.username, p.display_name, p.tier, p.brier_score;
