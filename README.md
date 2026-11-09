# Alina Khan — portfolio

Personal site for Alina Khan, built with Vite, React, TypeScript, Tailwind CSS, and shadcn-style `src/components/ui`.

## Run locally

```bash
npm install
npm run dev
```

## Edit content

Project copy, experience, skills, and links live in `src/content/portfolio.ts`. Put the resume PDF in `public/Alina-Khan-Resume.pdf`.

The topographic WebGL background is `src/components/ui/topo-field.tsx`.

## Architecture rules (keep the site from drifting)

- **Content lives in one place:** `src/content/portfolio.ts`. Components render it and never hard-code copy, links or numbers.
- **Adding a project:** add one object to `projects` (see the `Project` type). Optional `links.repo` must be a `https://github.com/alina-khan123/...` URL, and `links.live` only if it is really deployed. The type checker rejects anything else.
- **No new sections without a component:** one section = one file in `src/components`, registered once in `src/App.tsx` and `nav`.
- **Keep it dependency-light:** do not add a library for something a few lines of React can do.
- **Before pushing:** `npm run build` must pass. CI runs the same command on every pull request, and merging to `master` should only happen when it is green.
- **Make changes on a branch** and open a pull request, so each change is small and reviewable.

