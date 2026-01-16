import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProjectEnvironments } from '../components/ProjectEnvironments';
import { ProjectLogs } from '../components/ProjectLogs';
import { ProjectDeployments } from '../components/ProjectDeployments';
import { ProjectTeam } from '../components/ProjectTeam';
import { ProjectAlerts } from '../components/ProjectAlerts';
import { ProjectSettings } from '../components/ProjectSettings';
import { ProjectTesting } from '../components/ProjectTesting';
import { AICodeReview } from '../components/AICodeReview';
import { ProductivityAnalytics } from '../components/ProductivityAnalytics';
import { JiraIntegration } from '../components/JiraIntegration';
import { NotificationCenter } from '../components/NotificationCenter';
import { ProjectDependencies } from '../components/ProjectDependencies';
import { ProjectTraceabilityEnhanced } from '../components/ProjectTraceabilityEnhanced';
import { ScheduledDeploymentsList } from '../components/ScheduledDeploymentsList';
import { RecentDeploymentsList } from '../components/RecentDeploymentsList';
import { DeveloperDashboard } from '../components/DeveloperDashboard';
import { mockProjects } from '../data/projects';
import { mockDeployments } from '../data/environments';
import { stacks } from '../data/stacks';
import type { ScheduledDeployment } from '../components/ProjectDeployments';

// Mock data para despliegues programados
const mockScheduledDeployments: ScheduledDeployment[] = [
  // Despliegues programados por el usuario actual - Hoy y próximos días
  {
    id: 'sched-current-1',
    projectId: 'proj-001',
    environment: 'TST',
    branch: 'develop',
    scheduledFor: '2026-01-16T22:00:00Z', // Hoy a las 22:00
    status: 'scheduled',
    createdBy: 'current.user@example.com',
    createdAt: '2026-01-16T09:00:00Z',
    description: 'Deploy nocturno a TST',
    autoRollback: false,
    notifyOnComplete: true
  },
  {
    id: 'sched-current-2',
    projectId: 'proj-001',
    environment: 'PRE',
    branch: 'hotfix/urgent-fix',
    scheduledFor: '2026-01-17T10:30:00Z', // Mañana por la mañana
    status: 'scheduled',
    createdBy: 'current.user@example.com',
    createdAt: '2026-01-16T11:00:00Z',
    description: 'Hotfix programado a PRE',
    autoRollback: true,
    notifyOnComplete: true
  },
  {
    id: 'sched-current-3',
    projectId: 'proj-001',
    environment: 'PRO',
    branch: 'release/v2.1.0',
    scheduledFor: '2026-01-20T08:00:00Z', // Lunes próximo
    status: 'scheduled',
    createdBy: 'current.user@example.com',
    createdAt: '2026-01-16T10:00:00Z',
    description: 'Release v2.1.0 a producción',
    autoRollback: true,
    notifyOnComplete: true
  },
  // Proyecto 1 - Otros despliegues programados
  {
    id: 'sched-eden-1',
    projectId: 'proj-001',
    environment: 'EDEN',
    branch: 'feature/new-dashboard',
    scheduledFor: '2026-01-16T18:00:00Z', // Hoy tarde
    status: 'scheduled',
    createdBy: 'dev@example.com',
    createdAt: '2026-01-16T08:00:00Z',
    description: 'Testing nuevo dashboard',
    autoRollback: false,
    notifyOnComplete: true
  },
  {
    id: 'sched-tst-1',
    projectId: 'proj-001',
    environment: 'TST',
    branch: 'feature/api-improvements',
    scheduledFor: '2026-01-17T15:00:00Z', // Mañana tarde
    status: 'scheduled',
    createdBy: 'jane.smith@example.com',
    createdAt: '2026-01-16T09:30:00Z',
    description: 'Mejoras de API a TST',
    autoRollback: false,
    notifyOnComplete: true
  },
  {
    id: 'sched-pre-1',
    projectId: 'proj-001',
    environment: 'PRE',
    branch: 'release/v2.0.5',
    scheduledFor: '2026-01-19T12:00:00Z', // Domingo mediodía
    status: 'scheduled',
    createdBy: 'dev@example.com',
    createdAt: '2026-01-16T11:00:00Z',
    description: 'Release menor a PRE',
    autoRollback: true,
    notifyOnComplete: true
  },
  {
    id: 'sched-pro-1',
    projectId: 'proj-001',
    environment: 'PRO',
    branch: 'hotfix/security-patch',
    scheduledFor: '2026-01-17T02:00:00Z', // Mañana madrugada
    status: 'scheduled',
    createdBy: 'admin@example.com',
    createdAt: '2026-01-16T14:00:00Z',
    description: 'Parche de seguridad urgente',
    autoRollback: true,
    notifyOnComplete: true
  },
  {
    id: 'sched-future-1',
    projectId: 'proj-001',
    environment: 'PRO',
    branch: 'release/v3.0.0',
    scheduledFor: '2026-01-25T09:00:00Z', // En 9 días
    status: 'scheduled',
    createdBy: 'current.user@example.com',
    createdAt: '2026-01-16T15:00:00Z',
    description: 'Release mayor v3.0.0',
    autoRollback: true,
    notifyOnComplete: true
  },
  {
    id: 'sched-future-2',
    projectId: 'proj-001',
    environment: 'PRE',
    branch: 'release/v2.5.0',
    scheduledFor: '2026-01-22T14:30:00Z', // En 6 días
    status: 'scheduled',
    createdBy: 'jane.smith@example.com',
    createdAt: '2026-01-16T16:00:00Z',
    description: 'Testing release v2.5.0',
    autoRollback: true,
    notifyOnComplete: true
  },
  // Proyecto 2 - proj-002
  {
    id: 'sched-example-2',
    projectId: 'proj-002',
    environment: 'PRO',
    branch: 'main',
    scheduledFor: '2026-01-19T09:00:00Z',
    status: 'scheduled',
    createdBy: 'admin@example.com',
    createdAt: '2026-01-16T08:00:00Z',
    description: 'Deploy matutino',
    autoRollback: true,
    notifyOnComplete: true
  },
  {
    id: 'sched-tst-2',
    projectId: 'proj-002',
    environment: 'TST',
    branch: 'develop',
    scheduledFor: '2026-01-17T19:00:00Z',
    status: 'scheduled',
    createdBy: 'dev@example.com',
    createdAt: '2026-01-16T10:00:00Z',
    description: 'Testing nocturno',
    autoRollback: false,
    notifyOnComplete: true
  },
  // Proyecto 3 - proj-003
  {
    id: 'sched-example-3',
    projectId: 'proj-003',
    environment: 'PRE',
    branch: 'release/v1.5',
    scheduledFor: '2026-01-21T14:00:00Z',
    status: 'scheduled',
    createdBy: 'qa@example.com',
    createdAt: '2026-01-16T11:00:00Z',
    description: 'QA release',
    autoRollback: true,
    notifyOnComplete: true
  },
  {
    id: 'sched-eden-3',
    projectId: 'proj-003',
    environment: 'EDEN',
    branch: 'feature/api-v2',
    scheduledFor: '2026-01-17T17:00:00Z',
    status: 'scheduled',
    createdBy: 'dev@example.com',
    createdAt: '2026-01-16T12:00:00Z',
    description: 'Nueva API',
    autoRollback: false,
    notifyOnComplete: false
  }
];
import {
  Activity, 
  Server, 
  FileText, 
  Rocket,
  Settings,
  GitBranch,
  Calendar,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Bell,
  ArrowLeft,
  TestTube,
  Bot,
  Gauge,
  ExternalLink,
  Package,
  Network,
  Zap
} from 'lucide-react';

export const ProjectOverviewPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'overview' | 'dependencies' | 'traceability' | 'environments' | 'deployments' | 'logs' | 'team' | 'alerts' | 'testing' | 'ai-review' | 'productivity' | 'jira' | 'settings'>('dashboard');

  // Branches disponibles (mock - en producción vendrían del repo)
  const availableBranches = ['main', 'develop', 'staging', 'release/v2.0', 'hotfix/urgent', 'feature/new-ui'];

  // Entornos específicos
  const environments = [
    { value: 'EDEN', label: 'EDEN', color: 'bg-blue-600' },
    { value: 'TST', label: 'TST', color: 'bg-green-600' },
    { value: 'PRE', label: 'PRE', color: 'bg-yellow-500' },
    { value: 'PRO', label: 'PRO', color: 'bg-red-600' }
  ];

  // Unified form state - siempre visible
  const [deployForm, setDeployForm] = useState({
    branch: 'main',
    environment: 'TST',
    datetime: '' // Si está vacío = inmediato, si tiene valor = programado
  });

  const project = projectId ? mockProjects.find(p => p.id === projectId) : null;
  const stackInfo = project ? stacks.find(s => s.id === project.stack) : null;

  // Handle unified deployment
  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();

    if (deployForm.datetime) {
      // Despliegue programado
      console.log('Programando despliegue para proyecto:', projectId, {
        ...deployForm,
        scheduledFor: deployForm.datetime
      });
    } else {
      // Despliegue inmediato
      console.log('Desplegando inmediatamente para proyecto:', projectId, {
        environment: deployForm.environment,
        branch: deployForm.branch
      });
    }

    // Reset datetime pero mantiene selecciones
    setDeployForm({ ...deployForm, datetime: '' });
  };

  // Function to update scroll indicators
  const updateScrollIndicators = React.useCallback(() => {
    const nav = document.getElementById('tab-navigation');
    if (!nav) return;

    const leftGradient = document.getElementById('left-gradient');
    const rightGradient = document.getElementById('right-gradient');
    const scrollLeft = document.getElementById('scroll-left');
    const scrollRight = document.getElementById('scroll-right');
    
    const needsScroll = nav.scrollWidth > nav.clientWidth;
    const isAtStart = nav.scrollLeft <= 10;
    const isAtEnd = nav.scrollLeft >= nav.scrollWidth - nav.clientWidth - 10;
    
    // Show/hide elements based on scroll state
    if (leftGradient) {
      if (needsScroll && !isAtStart) {
        leftGradient.style.display = 'block';
        leftGradient.style.opacity = '1';
      } else {
        leftGradient.style.opacity = '0';
        setTimeout(() => {
          if (leftGradient.style.opacity === '0') {
            leftGradient.style.display = 'none';
          }
        }, 300);
      }
    }
    
    if (rightGradient) {
      if (needsScroll && !isAtEnd) {
        rightGradient.style.display = 'block';
        rightGradient.style.opacity = '1';
      } else {
        rightGradient.style.opacity = '0';
        setTimeout(() => {
          if (rightGradient.style.opacity === '0') {
            rightGradient.style.display = 'none';
          }
        }, 300);
      }
    }
    
    if (scrollLeft) {
      if (needsScroll && !isAtStart) {
        scrollLeft.style.display = 'flex';
        scrollLeft.style.opacity = '1';
      } else {
        scrollLeft.style.opacity = '0';
        setTimeout(() => {
          if (scrollLeft.style.opacity === '0') {
            scrollLeft.style.display = 'none';
          }
        }, 300);
      }
    }
    
    if (scrollRight) {
      if (needsScroll && !isAtEnd) {
        scrollRight.style.display = 'flex';
        scrollRight.style.opacity = '1';
      } else {
        scrollRight.style.opacity = '0';
        setTimeout(() => {
          if (scrollRight.style.opacity === '0') {
            scrollRight.style.display = 'none';
          }
        }, 300);
      }
    }
  }, []);

  // Add resize listener
  React.useEffect(() => {
    const handleResize = () => {
      setTimeout(updateScrollIndicators, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollIndicators]);

  if (!project) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Project Not Found</h3>
          <p className="text-gray-500">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Zap },
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'traceability', label: 'Traceability', icon: Network },
    { id: 'dependencies', label: 'Dependencies', icon: Package },
    { id: 'environments', label: 'Environments', icon: Server },
    { id: 'deployments', label: 'Deployments', icon: Rocket },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'testing', label: 'Testing', icon: TestTube },
    { id: 'ai-review', label: 'AI Review', icon: Bot },
    { id: 'productivity', label: 'Productivity', icon: Gauge },
    { id: 'jira', label: 'JIRA', icon: ExternalLink },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DeveloperDashboard projectId={projectId!} scheduledDeployments={mockScheduledDeployments} />;
      case 'dependencies':
        return <ProjectDependencies projectId={projectId!} />;
      case 'traceability':
        return <ProjectTraceabilityEnhanced projectId={projectId!} />;
      case 'environments':
        return <ProjectEnvironments projectId={projectId!} />;
      case 'deployments':
        return <ProjectDeployments projectId={projectId!} />;
      case 'logs':
        return <ProjectLogs projectId={projectId!} />;
      case 'team':
        return <ProjectTeam projectId={projectId!} />;
      case 'alerts':
        return <ProjectAlerts projectId={projectId!} />;
      case 'testing':
        return <ProjectTesting projectId={projectId!} />;
      case 'ai-review':
        return <AICodeReview projectId={projectId!} />;
      case 'productivity':
        return <ProductivityAnalytics projectId={projectId!} />;
      case 'jira':
        return <JiraIntegration projectId={projectId!} />;
      case 'settings':
        return <ProjectSettings projectId={projectId!} />;
      default:
        return (
          <div className="space-y-6">
            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">Environments</div>
                    <div className="text-lg font-semibold text-gray-900">3</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center space-x-2">
                  <Rocket className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-500">Deployments</div>
                    <div className="text-lg font-semibold text-gray-900">12</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Programados</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {mockScheduledDeployments.filter(d => d.projectId === projectId && d.status === 'scheduled').length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">Uptime</div>
                    <div className="text-lg font-semibold text-gray-900">99.9%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployments Section - Full Width */}
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Cabecera con formulario integrado */}
              <div className="p-6 border-b border-gray-200">
                <div className="space-y-4">
                  {/* Título */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Rocket className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Despliegues</h3>
                        <p className="text-sm text-gray-500">
                          {mockScheduledDeployments.filter(d => d.projectId === projectId && d.status === 'scheduled').length} programado(s)
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('deployments')}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Ver historial completo
                    </button>
                  </div>

                  {/* Formulario integrado */}
                  <form onSubmit={handleDeploy} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                      {/* Branch - PRIMERO */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Branch</label>
                        <select
                          value={deployForm.branch}
                          onChange={(e) => setDeployForm({ ...deployForm, branch: e.target.value })}
                          className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
                          required
                        >
                          {availableBranches.map((branch) => (
                            <option key={branch} value={branch}>
                              {branch}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Environment - SEGUNDO (EDEN, TST, PRE, PRO) - DESPLEGABLE */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Entorno</label>
                        <select
                          value={deployForm.environment}
                          onChange={(e) => setDeployForm({ ...deployForm, environment: e.target.value })}
                          className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
                          required
                        >
                          {environments.map((env) => (
                            <option key={env.value} value={env.value}>
                              {env.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date and Time - Optional */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Fecha y Hora <span className="text-gray-500 font-normal">(opcional para programar)</span>
                        </label>
                        <input
                          type="datetime-local"
                          value={deployForm.datetime}
                          onChange={(e) => setDeployForm({ ...deployForm, datetime: e.target.value })}
                          className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min={new Date().toISOString().slice(0, 16)}
                        />
                      </div>

                      {/* Submit Button */}
                      <div>
                        <button
                          type="submit"
                          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all shadow-md font-semibold ${
                            deployForm.datetime
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                        >
                          {deployForm.datetime ? (
                            <>
                              <Calendar className="h-4 w-4" />
                              <span>Programar</span>
                            </>
                          ) : (
                            <>
                              <Rocket className="h-4 w-4" />
                              <span>Desplegar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Warning for production */}
                    {deployForm.environment === 'PRO' && (
                      <div className="mt-3 bg-red-100 border-2 border-red-300 rounded-lg p-2.5">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-red-900 font-medium">
                            <strong>Producción:</strong> Asegúrate de que los cambios hayan sido probados en PRE.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Status indicator */}
                    <div className="mt-2 text-center">
                      <span className={`inline-flex items-center space-x-1 text-xs font-semibold ${
                        deployForm.datetime ? 'text-blue-700' : 'text-green-700'
                      }`}>
                        {deployForm.datetime ? (
                          <>
                            <Calendar className="h-3 w-3" />
                            <span>Despliegue programado</span>
                          </>
                        ) : (
                          <>
                            <Rocket className="h-3 w-3" />
                            <span>Despliegue inmediato</span>
                          </>
                        )}
                      </span>
                    </div>
                  </form>
                </div>
              </div>

              {/* Deployments Grid: Recientes y Programados lado a lado */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ScheduledDeploymentsList
                    deployments={mockScheduledDeployments}
                    projectId={projectId!}
                    onReschedule={(id) => console.log('Replanificar:', id)}
                    onCancel={(id) => console.log('Cancelar:', id)}
                  />
                  <RecentDeploymentsList
                    deployments={mockDeployments}
                    projectId={projectId!}
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Name:</span>
                      <span className="ml-2 text-sm font-medium text-gray-900">{project.name}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Description:</span>
                      <p className="mt-1 text-sm text-gray-900">{project.description}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Technology Stack:</span>
                      <div className="mt-1 flex items-center space-x-2">
                        {stackInfo && (
                          <>
                            <div className={`w-3 h-3 rounded-full ${stackInfo.color}`}></div>
                            <span className="text-sm font-medium text-gray-900">{stackInfo.label}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Repository & Deployment</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Repository:</span>
                      <a 
                        href={project.repository} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-blue-600 hover:underline"
                      >
                        {project.repository}
                      </a>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitBranch className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Main Branch:</span>
                      <span className="text-sm font-mono text-gray-900">{project.branch}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Last Modified:</span>
                      <span className="text-sm text-gray-900">{formatDate(project.lastModified)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Provisions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Current Provisions</h3>
              <div className="flex flex-wrap gap-2">
                {project.provisions.map((provision) => (
                  <span
                    key={provision}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                  >
                    {provision}
                  </span>
                ))}
              </div>
              {project.provisions.length === 0 && (
                <p className="text-gray-500 text-sm">No provisions configured</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setActiveTab('settings')}
                  className="flex items-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Configure</span>
                </button>
                <button
                  onClick={() => setActiveTab('deployments')}
                  className="flex items-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Rocket className="h-4 w-4" />
                  <span>Ver Deployments</span>
                </button>
                <Link
                  to={`/project/${projectId!}/metrics`}
                  className="flex items-center space-x-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>View Metrics</span>
                </Link>
                <button
                  onClick={() => setActiveTab('team')}
                  className="flex items-center space-x-2 px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </button>
              </div>
            </div>

          </div>
        );
    }
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
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
                  <p className="text-sm text-gray-500">Project Dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              {stackInfo && (
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stackInfo.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{stackInfo.label}</span>
                </div>
              )}
              <NotificationCenter />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm border" ref={(el) => {
            if (el) {
              // Check scroll necessity after component mounts
              setTimeout(() => {
                updateScrollIndicators();
              }, 100);
            }
          }}>
            <div className="border-b border-gray-200 overflow-hidden relative">
              {/* Left gradient indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden transition-opacity duration-300" id="left-gradient"></div>
              
              {/* Right gradient indicator */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden transition-opacity duration-300" id="right-gradient"></div>
              
              {/* Navigation arrows */}
              <button 
                id="scroll-left"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 w-6 h-6 bg-white border border-gray-300 rounded-full shadow-sm items-center justify-center transition-opacity duration-300 hover:bg-gray-50 hidden"
                onClick={() => {
                  const nav = document.getElementById('tab-navigation');
                  if (nav) nav.scrollBy({ left: -200, behavior: 'smooth' });
                }}
              >
                <span className="text-gray-600 text-sm">‹</span>
              </button>
              
              <button 
                id="scroll-right"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 w-6 h-6 bg-white border border-gray-300 rounded-full shadow-sm items-center justify-center transition-opacity duration-300 hover:bg-gray-50 hidden"
                onClick={() => {
                  const nav = document.getElementById('tab-navigation');
                  if (nav) nav.scrollBy({ left: 200, behavior: 'smooth' });
                }}
              >
                <span className="text-gray-600 text-sm">›</span>
              </button>
              
              <nav 
                id="tab-navigation"
                className="flex space-x-6 px-6 overflow-x-auto scrollbar-hide min-w-full"
                onScroll={updateScrollIndicators}
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const tabId = tab.id as typeof activeTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tabId)}
                      className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
