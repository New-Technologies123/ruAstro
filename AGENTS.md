# Repository Guidelines

## Project Structure & Module Organization

This is an Astro site with React islands. Route files live in `src/pages/` (for example, `shop.astro`). Put page-specific components and styles in `src/components/content/<feature>/`, such as `shop/Shop.tsx` and `shop/catalog.module.scss`. Reusable controls belong in `src/components/ui/`; shared base components, layouts, hooks, and utilities live in their matching `src/` directories. Static images, documents, and the PHP form handlers are in `public/`. Astro generates `.astro/` and `dist/`; do not edit or commit those directories.

## Build, Test, and Development Commands

- `npm ci` installs the versions recorded in `package-lock.json`.
- `npm run dev` starts the local Astro development server.
- `npm run build` runs `astro check` and builds the production site into `dist/`.
- `npm run preview` serves the built site for a final local check.

Run commands from the repository root. There is currently no `npm test` or lint script.

## Coding Style & Naming Conventions

Follow `.prettierrc.json`: two-space indentation, single quotes, trailing commas, and a 140-character print width. Use PascalCase for React component files and exports (`CatalogCard.tsx`), camelCase for functions and variables, and `*.module.scss` for component-scoped styles. Keep routes thin and place interactive behavior in React components. Match the existing Russian UI copy on user-facing pages.

## Testing Guidelines

No automated test framework or coverage target is configured. Before a pull request, run `npm run build` and manually check the affected route at desktop and mobile widths. For interactive changes, verify the relevant search, filters, forms, navigation, and cart states. If you add automated tests, use descriptive `*.test.ts` or `*.test.tsx` names and add a documented test command.

## Commit & Pull Request Guidelines

Recent commits use short, feature-oriented subjects (for example, `new Services and carousel`); no strict convention is enforced. Prefer a concise subject that names the changed area and action. Pull requests should describe the behavior changed, list verification performed, link any related issue, and include before-and-after screenshots for visual changes. Keep unrelated local edits out of the commit.

## Configuration & Security

Keep secrets in local environment files, which are ignored by Git. Treat `public/submit.php`, `public/sendOrder.php`, and `public/send-question.php` as live submission endpoints; review input handling when changing their forms or request payloads.
