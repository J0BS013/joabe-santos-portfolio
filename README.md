# Joabe Santos — Decision Science & Analytics Engineering Portfolio

A multilingual portfolio built as an editorial case-study site. It presents selected work through business questions, decisions, evidence, limitations and reproducible technical artifacts—not as a gallery of technologies.

## Live site

The production site is published with GitHub Pages:

- **English:** `https://j0bs013.github.io/joabe-santos-portfolio/`
- **Português:** `https://j0bs013.github.io/joabe-santos-portfolio/pt-br/`
- **Español:** `https://j0bs013.github.io/joabe-santos-portfolio/es/`

The language selector preserves the current route whenever an equivalent translation exists.

## What is included

- Three complete flagship case studies: a thin-file credit decision engine, subscription analytics with dbt and a marketplace event lakehouse.
- Direct links to source repositories and the available live demos.
- English, Brazilian Portuguese and Spanish routes generated statically.
- Accessible semantic HTML, keyboard focus states, reduced-motion support, responsive layouts and search/social metadata.
- Downloadable public résumé with personal phone number and client-sensitive details removed.

## Technology

- Astro 7 with strict TypeScript
- Astro Content Collections for typed case-study metadata
- Native CSS and locally bundled variable fonts
- Static generation hosted on GitHub Pages
- GitHub Actions for checks and deployment

No browser framework or runtime API is required in production.

## Run locally

Requirements: Node.js 24+ and pnpm 11.19.0.

```bash
pnpm install
pnpm dev
```

The local server starts at `http://localhost:4321/joabe-santos-portfolio/`.

Production validation:

```bash
pnpm validate
pnpm preview
```

`pnpm validate` checks Astro and TypeScript diagnostics, builds every localized route, rejects duplicate localized case IDs and checks generated internal links and assets.

## Content structure

```text
src/content/cases/
├── en/
├── es/
└── pt-br/
```

Every case study carries typed metadata for the question, role, data origin, repository, demo, evidence, limitations and the source commit used to substantiate the claims. Narrative content follows the same sequence across languages: decision, context, constraints, approach, evidence, failure or correction, limitations and next step.

## Deployment

A push to `main` runs two workflows:

1. `Quality checks` installs from the lockfile and executes the complete validation suite.
2. `Deploy to GitHub Pages` builds the static site and publishes the generated artifact.

The Astro `site` and `base` settings in `astro.config.mjs` are deliberately tied to the GitHub Pages project URL. Update both before deploying from a different owner or repository name.