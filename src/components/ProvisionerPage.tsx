import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { StackPicker } from './StackPicker';
import { ProvisionList } from './ProvisionList';
import { SummaryPanel } from './SummaryPanel';
import { useProvisioner } from '../store/useProvisioner';
import { mockProjects } from '../data/projects';
import { Settings, RefreshCw, ArrowLeft } from 'lucide-react';

export const ProvisionerPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { clearSelections, setProjectContext, loadProjectProvisions } = useProvisioner();

  const isNewProject = projectId === 'new';
  const currentProject = projectId && projectId !== 'new' ? mockProjects.find(p => p.id === projectId) : null;

  useEffect(() => {
    if (isNewProject) {
      setProjectContext({ isNewProject: true });
      clearSelections();
    } else if (projectId && currentProject) {
      loadProjectProvisions(projectId);
    } else if (projectId && !currentProject) {
      // Project not found, redirect to projects list
      navigate('/');
    }
  }, [projectId, isNewProject, currentProject, setProjectContext, clearSelections, loadProjectProvisions, navigate]);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all selections?')) {
      clearSelections();
    }
  };

  const getPageTitle = () => {
    if (isNewProject) return 'New Project Configuration';
    if (currentProject) return `Configure ${currentProject.name}`;
    return 'Stack Provisioner';
  };

  const getPageDescription = () => {
    if (isNewProject) return 'Set up technology stack for your new project';
    if (currentProject) return 'Modify provisions for your existing project';
    return 'Technology Stack Configuration Tool';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
                  <p className="text-sm text-gray-500">{getPageDescription()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {currentProject && (
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{currentProject.name}</div>
                  <div className="text-xs text-gray-500">
                    {currentProject.provisions.length} current provisions
                  </div>
                </div>
              )}
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stack Selection Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <StackPicker 
                disabled={!isNewProject} 
                lockedStack={currentProject?.stack}
              />
            </div>
            <div className="lg:col-span-1">
              <SummaryPanel />
            </div>
          </div>

          {/* Provisions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-4">
              <ProvisionList />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            Stack Provisioner POC - Technology Stack Configuration Tool
          </div>
        </div>
      </footer>
    </div>
  );
};