import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectList } from './components/ProjectList';
import { ProvisionerPage } from './components/ProvisionerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/provisioner/:projectId" element={<ProvisionerPage />} />
      </Routes>
    </Router>
  );
}

export default App;