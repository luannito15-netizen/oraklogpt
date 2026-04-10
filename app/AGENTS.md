# ORAKLO - AGENTS.md

## Source of truth

Use `app/docs` as the official and primary source.

Mandatory docs:
- `docs/PRODUCT_SPEC.md`
- `docs/BUSINESS_RULES.md`
- `docs/BRAND_GUIDELINES.md`
- `docs/UI_RULES.md`
- `docs/DECISION_SCREEN_RULES.md`

If any other file conflicts with `app/docs`, follow `app/docs`.

## Product boundaries

- ORAKLO is not a betting app.
- ORAKLO is not gambling.
- Do not use betting semantics in product UX.
- Keep language rational, clear, and trustworthy.

## Terminology contract

- Domain/backend values: `YES | NO`
- UI labels: `SIM | NAO`
- UI must use only `cotacao` (never `odds`)
- Internal technical name `OddsSelector` is allowed

## MVP constraints

- Platform fee: fixed `5%` per participation
- Authentication: mock/local only
- Data source: static mocks with structure ready for future API

Do not create new business rules without explicit user confirmation.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Approved route architecture

- Public group: landing and login
- Platform group: dashboard, events, event details, admin

Target structure:
- `src/app/(public)/page.tsx`
- `src/app/(public)/login/page.tsx`
- `src/app/(platform)/layout.tsx`
- `src/app/(platform)/dashboard/page.tsx`
- `src/app/(platform)/events/page.tsx`
- `src/app/(platform)/events/[id]/page.tsx`
- `src/app/(platform)/admin/page.tsx`

## UI and visual direction

- Avoid casino, game, or betting aesthetics.
- Prioritize clean hierarchy, whitespace, and sober layout.
- Use the official palette and token rules from docs.
- Keep motion subtle and informative.

## Implementation behavior

Before coding:
- Read all docs in `app/docs`.
- Validate inconsistencies.
- Ask for clarification when requirements are ambiguous.

During coding:
- Reuse components and patterns.
- Keep components small and maintainable.
- Prefer clarity over complexity.

After coding:
- Verify language compliance (`cotacao`, `SIM/NAO`, anti-betting tone).
- Run lint/build checks when possible.
