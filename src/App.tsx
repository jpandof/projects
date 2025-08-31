import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProvisionerPage = lazy(() => import('./pages/ProvisionerPage').then(m => ({ default: m.ProvisionerPage })));
const ProjectOverviewPage = lazy(() => import('./pages/ProjectOverviewPage').then(m => ({ default: m.ProjectOverviewPage })));
const ProjectMetricsPage = lazy(() => import('./pages/ProjectMetricsPage').then(m => ({ default: m.ProjectMetricsPage })));
const APICatalogPage = lazy(() => import('./pages/APICatalogPage').then(m => ({ default: m.APICatalogPage })));
const CommunityPage = lazy(() => import('./pages/CommunityPage').then(m => ({ default: m.CommunityPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/apis" element={<APICatalogPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/provisioner/:projectId" element={<ProvisionerPage />} />
          <Route path="/project/:projectId" element={<ProjectOverviewPage />} />
          <Route path="/project/:projectId/metrics" element={<ProjectMetricsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;