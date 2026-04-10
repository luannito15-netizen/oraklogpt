# ORAKLO
Inclusive: isso definitivamente não é uma Bet.

ORAKLO é uma plataforma de previsões sobre eventos reais, com validação objetiva e linguagem de produto séria.

## Descrição do ORAKLO
ORAKLO transforma leitura de cenário em participação estruturada. Em vez de estímulo impulsivo, a experiência prioriza contexto, critério, transparência e consequência operacional. A proposta é oferecer uma interface clara para registrar posição sobre eventos verificáveis, acompanhar cotação e entender resultado com base em fonte oficial.

## Fonte de verdade
A documentação oficial do projeto está em `app/docs`.

Arquivos obrigatórios de referência:
- `docs/PRODUCT_SPEC.md`
- `docs/BUSINESS_RULES.md`
- `docs/BRAND_GUIDELINES.md`
- `docs/UI_RULES.md`
- `docs/DECISION_SCREEN_RULES.md`

Se existir conflito entre qualquer outro arquivo e `app/docs`, prevalece `app/docs`.

## Terminologia oficial
- Domínio e backend: `YES | NO`
- Interface e frontend: `SIM | NÃO`
- Na UI, usar exclusivamente `cotação` (nunca `odds`)
- `OddsSelector` pode existir apenas como nome técnico interno de componente

## Arquitetura
A base técnica do projeto utiliza `Next.js` com `App Router`, `TypeScript` e `Tailwind CSS`, com separação explícita entre área pública e área de plataforma.

Estrutura aprovada:
- `src/app/(public)/page.tsx` -> `/`
- `src/app/(public)/login/page.tsx` -> `/login`
- `src/app/(platform)/layout.tsx`
- `src/app/(platform)/dashboard/page.tsx` -> `/dashboard`
- `src/app/(platform)/events/page.tsx` -> `/events`
- `src/app/(platform)/events/[id]/page.tsx` -> `/events/[id]`
- `src/app/(platform)/admin/page.tsx` -> `/admin`

## Regras do MVP
- Taxa fixa de `5%` aplicada por participação
- Autenticação `mock/local` nesta fase
- Dados com `mock estático`, já organizados para substituição futura por API
- Não criar regras de negócio novas sem confirmação explícita

## Fundação visual
Paleta oficial:
- Background principal: `#F5F2EB`
- Texto base: `#1A0F1F`
- Roxo ORAKLO: `#7B2FF7`
- Roxo hover: `#5A1EDC`
- Roxo glow: `#A66BFF`

Gradiente oficial:
- `linear-gradient(135deg, #7B2FF7 0%, #A66BFF 50%, #5A1EDC 100%)`

Direção de uso:
- `80%` neutro / `15%` roxo / `5%` efeitos
- Roxo para ação, foco e marca
- Evitar roxo em textos longos e fundos amplos
- Tipografia única: `Montserrat`, com hierarquia por peso

## Como rodar o projeto
```bash
npm install
npm run dev
```

Aplicação local: `http://localhost:3000`

## Diretrizes de implementação
- Ler `app/docs` antes de implementar qualquer alteração
- Manter linguagem, microcopy e visual fora do território de betting
- Priorizar clareza, sobriedade e estética editorial com padrão fintech
- Reutilizar componentes e padrões antes de criar novas variações
