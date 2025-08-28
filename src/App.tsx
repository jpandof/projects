import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectList } from './components/ProjectList';
import { ProvisionerPage } from './components/ProvisionerPage';
import { ProjectOverview } from './components/ProjectOverview';
import { ProjectMetrics } from './components/ProjectMetrics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/provisioner/:projectId" element={<ProvisionerPage />} />
        <Route path="/project/:projectId" element={<ProjectOverview />} />
        <Route path="/project/:projectId/metrics" element={<ProjectMetrics />} />
      </Routes>
    </Router>
  );
}

export default App;