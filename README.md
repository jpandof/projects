Project structure overview

This project uses Vite + React + TypeScript with TailwindCSS and Ant Design. To make the codebase clearer, pages (route-level views) have been separated from reusable UI components.

Key folders
- src/pages: Route-level pages rendered by React Router.
  - ProjectsPage.tsx: Projects listing (previously components/ProjectList).
  - ProvisionerPage.tsx: New/edit provisioning flow (moved from components).
  - ProjectOverviewPage.tsx: Project dashboard (previously components/ProjectOverview).
  - ProjectMetricsPage.tsx: Metrics for a given project (previously components/ProjectMetrics).
  - APICatalogPage.tsx: API catalog (previously components/APICatalog).
  - CommunityPage.tsx: Community hub (moved from components).
- src/components: Reusable components, widgets and sections used inside the pages.
- src/data: Mock data used by the UI.
- src/store: Zustand stores and hooks.

Routing
- Routes are defined in src/App.tsx and now import from src/pages/*.

Notes
- Legacy files remain in src/components to avoid destructive operations in this refactor interface. They are no longer used by App.tsx. You can safely delete the old page files in src/components if you wish, since each has an equivalent in src/pages.
- No behavior should change; only imports and file locations for page-level components.

Scripts
- npm run dev: start dev server
- npm run build: production build
- npm run preview: preview production build
- npm run lint: run ESLint


Enhancements
- Lazy loading: Route-level pages are now code-split using React.lazy and Suspense in src/App.tsx to reduce initial bundle size and improve first load performance.
- Not Found page: A 404 fallback route has been added and implemented at src/pages/NotFoundPage.tsx.

How lazy loading is wired
- In src/App.tsx, each page is imported via dynamic import. Since pages export named components, we map them to default:
  const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
- A Suspense fallback with a lightweight loader wraps <Routes>.
- A catch-all route <Route path="*" element={<NotFoundPage />} /> ensures unknown URLs show a friendly 404.


Error handling
- A global ErrorBoundary (src/components/ErrorBoundary.tsx) now wraps the app routes in src/App.tsx. If a render error occurs, users see a friendly fallback with “Try again” and “Go to Home”. In development, the error stack is shown to aid debugging.

Next suggestions (pick your priority)
- Bundle insights: add vite-bundle-visualizer and/or configure build.rollupOptions.output.manualChunks for better chunking to reduce the warning about large chunks.
- Shared Layout: extract common header into a layout route to avoid duplication across pages.
- i18n: introduce a lightweight i18n setup (e.g., react-i18next) to toggle EN/ES; many strings are already in inglés/español.
- Dark mode: enable Tailwind dark mode and add a simple theme toggle.
