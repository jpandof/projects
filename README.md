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
