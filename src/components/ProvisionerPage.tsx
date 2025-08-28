import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProjectCreationWizard } from './ProjectCreationWizard';
import { ProvisionList } from './ProvisionList';
import { SummaryPanel } from './SummaryPanel';
import { useProvisioner } from '../store/useProvisioner';
import { mockProjects } from '../data/projects';
import { Settings, RefreshCw, ArrowLeft, Check as CheckIcon } from 'lucide-react';

export const ProvisionerPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { clearSelections, setProjectContext, loadProjectProvisions, selectedStack } = useProvisioner();
  const [copySuccess, setCopySuccess] = React.useState(false);

  const handleCopyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Error al copiar el comando');
    }
  };

  const isNewProject = projectId === 'new';
  const currentProject = projectId && projectId !== 'new' ? mockProjects.find(p => p.id === projectId) : null;
  const [showProvisions, setShowProvisions] = React.useState(!isNewProject);
  const [projectCreated, setProjectCreated] = React.useState(false);

  useEffect(() => {
    if (isNewProject) {
      setProjectContext({ isNewProject: true });
      clearSelections();
      setShowProvisions(false);
    } else if (projectId && currentProject) {
      loadProjectProvisions(projectId);
      setShowProvisions(true);
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

  const handleProjectCreated = (projectData: any) => {
    console.log('Proyecto creado:', projectData);
    setProjectCreated(true);
    setShowProvisions(true);
    // Here you would typically save the project to your backend
    // For now, we'll just show the provisions section
  };


  const canShowProvisions = showProvisions && selectedStack;

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Stack and Provisions */}
          <div className="lg:col-span-3 space-y-4">
            {/* Project Creation Wizard - Only for new projects */}
            {isNewProject && !projectCreated && (
              <ProjectCreationWizard onProjectCreated={handleProjectCreated} />
            )}
            
            {/* Repository Clone Section - Show after project creation */}
            {isNewProject && projectCreated && selectedStack && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">¡Proyecto Creado Exitosamente!</h3>
                    <p className="text-sm text-gray-500">Tu proyecto está listo para comenzar el desarrollo</p>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Clona tu repositorio:</h4>
                    <button
                      onClick={() => handleCopyCommand(`git clone https://github.com/company/your-project.git`)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        copySuccess 
                          ? 'bg-green-600 text-white' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {copySuccess ? '✓ Copiado!' : 'Copiar Comando'}
                    </button>
                  </div>
                  <div className="text-left">
                    <code className="text-green-400 font-mono text-sm block bg-gray-800 p-2 rounded">
                      git clone https://github.com/company/your-project.git
                    </code>
                  </div>
                  <div className="mt-3 text-left">
                    <div className="text-gray-400 text-sm mb-1">Luego navega a tu proyecto:</div>
                    <code className="text-blue-400 font-mono text-sm block bg-gray-800 p-2 rounded">
                      cd your-project
                    </code>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Siguiente paso:</strong> Configura los aprovisionamientos específicos que necesitas para tu proyecto en la sección de abajo.
                  </p>
                </div>
              </div>
            )}
            
            {/* Provision List - Only show when appropriate */}
            {canShowProvisions && (
              <ProvisionList />
            )}
          </div>
          
          {/* Right Column - Summary Panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <SummaryPanel />
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