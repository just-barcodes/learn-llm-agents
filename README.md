# What is an AI agent?

An interactive, visual learning page that walks from a plain chat model to a
full AI agent — covering tools, retrieval (RAG), orchestration, safety, and
protocols (MCP / A2A).

Built with [Vite](https://vite.dev), [React](https://react.dev), and TypeScript.

## Development

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm test           # run the test suite
npm run lint       # lint
npm run format     # format with Prettier
```

## Deployment

Every push and pull request runs lint, format-check, tests, and a production
build via the [Build & Deploy](.github/workflows/deploy.yml) workflow. On
pushes to `main` the built `dist/` is published to GitHub Pages.

To enable it on a fresh repository: **Settings → Pages → Build and deployment →
Source: GitHub Actions**. The build uses a relative asset base, so it works
under any `https://<user>.github.io/<repo>/` path without extra configuration.

Dependencies and GitHub Actions are kept current by
[Dependabot](.github/dependabot.yml).
