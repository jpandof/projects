import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationCenter } from '../components/NotificationCenter';
import { QuickDeployModal } from '../components/QuickDeployModal';
import { RecentDeployments } from '../components/RecentDeployments';
import { mockProjects } from '../data/projects';
import { stacks } from '../data/stacks';
import { mockDeployments } from '../data/environments';
import {
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  GitBranch, 
  Archive,
  FileText,
  Settings,
  Activity,
  Globe,
  Users,
  Rocket,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

// Página: listado principal de proyectos
export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'archived' | 'draft'>('all');
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [selectedProjectForDeploy, setSelectedProjectForDeploy] = useState<{id: string, name: string} | null>(null);

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStackInfo = (stackId: string) => {
    return stacks.find(s => s.id === stackId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLatestDeploymentByEnvironment = (projectId: string, environment: string) => {
    return mockDeployments
      .filter(d => d.projectId === projectId && d.environment === environment)
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())[0];
  };

  const getDeploymentStatusIcon = (status?: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-3 w-3" />;
      case 'failed':
        return <XCircle className="h-3 w-3" />;
      case 'running':
        return <Clock className="h-3 w-3 animate-pulse" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const getDeploymentStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'failed':
        return 'bg-red-500 text-white';
      case 'running':
        return 'bg-blue-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getEnvironmentLabel = (env: string) => {
    switch (env) {
      case 'testing':
        return 'TST';
      case 'staging':
        return 'PRE';
      case 'production':
        return 'PROD';
      default:
        return env.toUpperCase();
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const handleOpenDeployModal = (projectId: string, projectName: string) => {
    setSelectedProjectForDeploy({ id: projectId, name: projectName });
    setDeployModalOpen(true);
  };

  const handleDeploy = (environment: string, branch: string) => {
    console.log(`Deploying project ${selectedProjectForDeploy?.id} to ${environment} from branch ${branch}`);
    // Aquí podrías actualizar el estado o hacer una llamada a la API
    // Para simular, podrías agregar el despliegue a mockDeployments
  };

  const handleCloseDeployModal = () => {
    setDeployModalOpen(false);
    setSelectedProjectForDeploy(null);
  };

  const handleQuickDeployFromRecent = (projectId: string, projectName: string) => {
    setSelectedProjectForDeploy({ id: projectId, name: projectName });
    setDeployModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Project Manager</h1>
                <p className="text-sm text-gray-500">Manage your technology projects</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/provisioner/new"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </Link>
              <Link
                to="/apis"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>APIs</span>
              </Link>
              <Link
                to="/community"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>Community</span>
              </Link>
              <NotificationCenter />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recent Deployments - Lo primero que ve el usuario */}
        <RecentDeployments
          onQuickDeploy={handleQuickDeployFromRecent}
        />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'archived' | 'draft')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const stackInfo = getStackInfo(project.stack);
            return (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Stack Info */}
                  {stackInfo && (
                    <div className="flex items-center space-x-2 mb-4">
                      <div className={`w-3 h-3 rounded-full ${stackInfo.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{stackInfo.label}</span>
                    </div>
                  )}

                  {/* Deployment Status by Environment */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 flex items-center space-x-1">
                      <Rocket className="h-3 w-3" />
                      <span>Despliegues</span>
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {['testing', 'staging', 'production'].map((env) => {
                        const deployment = getLatestDeploymentByEnvironment(project.id, env);
                        return (
                          <div
                            key={env}
                            className={`flex flex-col items-center justify-center p-2 rounded border ${
                              deployment
                                ? getDeploymentStatusColor(deployment.status)
                                : 'bg-gray-100 text-gray-400 border-gray-200'
                            }`}
                            title={deployment ? `${deployment.commitMessage} - ${formatTimeAgo(deployment.startedAt)}` : 'No deployments'}
                          >
                            <div className="flex items-center space-x-1 mb-1">
                              {getDeploymentStatusIcon(deployment?.status)}
                              <span className="text-xs font-semibold">{getEnvironmentLabel(env)}</span>
                            </div>
                            {deployment && (
                              <span className="text-[10px] opacity-90">{formatTimeAgo(deployment.startedAt)}</span>
                            )}
                            {!deployment && (
                              <span className="text-[10px]">N/A</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Latest Deployment Info */}
                  {(() => {
                    const allDeployments = mockDeployments
                      .filter(d => d.projectId === project.id)
                      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
                    const latestDeployment = allDeployments[0];

                    if (latestDeployment) {
                      return (
                        <div className="mb-4 p-2 bg-gray-50 rounded border border-gray-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-700 truncate">
                                {latestDeployment.commitMessage}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-[10px] text-gray-500">{latestDeployment.commit}</span>
                                <span className="text-[10px] text-gray-400">•</span>
                                <span className="text-[10px] text-gray-500">{getEnvironmentLabel(latestDeployment.environment)}</span>
                              </div>
                            </div>
                            <div className={`px-2 py-0.5 rounded text-[10px] font-medium ${getDeploymentStatusColor(latestDeployment.status)}`}>
                              {latestDeployment.status}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* Provisions */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Provisions ({project.provisions.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {project.provisions.slice(0, 3).map((provision) => (
                        <span key={provision} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {provision}
                        </span>
                      ))}
                      {project.provisions.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                          +{project.provisions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Modified {formatDate(project.lastModified)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <GitBranch className="h-3 w-3" />
                      <span>{project.branch}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {project.status === 'active' && (
                      <button
                        onClick={() => handleOpenDeployModal(project.id, project.name)}
                        className="flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        title="Desplegar proyecto"
                      >
                        <Rocket className="h-4 w-4" />
                      </button>
                    )}
                    <Link
                      to={`/provisioner/${project.id}`}
                      className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      title="Configure project provisions"
                    >
                      <Settings className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/project/${project.id}`}
                      className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Activity className="h-4 w-4" />
                      <span>View</span>
                    </Link>
                    {project.status === 'active' && (
                      <div className="relative group">
                        <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                          <Archive className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Archive project
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first project'
              }
            </p>
            <Link
              to="/provisioner/new"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Project</span>
            </Link>
            <Link
              to="/community"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Community</span>
            </Link>
          </div>
        )}
      </main>

      {/* Quick Deploy Modal */}
      {deployModalOpen && selectedProjectForDeploy && (
        <QuickDeployModal
          projectId={selectedProjectForDeploy.id}
          projectName={selectedProjectForDeploy.name}
          onClose={handleCloseDeployModal}
          onDeploy={handleDeploy}
        />
      )}
    </div>
  );
};
