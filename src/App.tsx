import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProvisionerPage } from './pages/ProvisionerPage';
import { ProjectOverviewPage } from './pages/ProjectOverviewPage';
import { ProjectMetricsPage } from './pages/ProjectMetricsPage';
import { APICatalogPage } from './pages/APICatalogPage';
import { CommunityPage } from './pages/CommunityPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/apis" element={<APICatalogPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/provisioner/:projectId" element={<ProvisionerPage />} />
        <Route path="/project/:projectId" element={<ProjectOverviewPage />} />
        <Route path="/project/:projectId/metrics" element={<ProjectMetricsPage />} />
      </Routes>
    </Router>
  );
}

export default App;