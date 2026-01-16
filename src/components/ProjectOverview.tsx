import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProjectEnvironments } from './ProjectEnvironments';
import { ProjectLogs } from './ProjectLogs';
import { ProjectDeployments } from './ProjectDeployments';
import { ProjectTeam } from './ProjectTeam';
import { ProjectAlerts } from './ProjectAlerts';
import { ProjectSettings } from './ProjectSettings';
import { ProjectTesting } from './ProjectTesting';
import { AICodeReview } from './AICodeReview';
import { ProductivityAnalytics } from './ProductivityAnalytics';
import { JiraIntegration } from './JiraIntegration';
import { NotificationCenter } from './NotificationCenter';
import { ProjectDependencies } from './ProjectDependencies';
import { ProjectTraceability } from './ProjectTraceability';
import { mockProjects } from '../data/projects';
import { mockDeployments } from '../data/environments';
import { stacks } from '../data/stacks';
import type { ScheduledDeployment } from './ProjectDeployments';

// Mock data para despliegues programados
const mockScheduledDeployments: ScheduledDeployment[] = [
  {
    id: 'sched-1',
    projectId: '1',
    environment: 'production',
    branch: 'release/v2.1.0',
    scheduledFor: '2025-11-26T02:00:00Z',
    status: 'scheduled',
    createdBy: 'john.doe@example.com',
    createdAt: '2025-11-25T10:30:00Z',
    description: 'Production release v2.1.0',
    autoRollback: true,
    notifyOnComplete: true
  },
  {
    id: 'sched-2',
    projectId: '1',
    environment: 'staging',
    branch: 'develop',
    scheduledFor: '2025-11-26T18:00:00Z',
    status: 'scheduled',
    createdBy: 'jane.smith@example.com',
    createdAt: '2025-11-25T09:15:00Z',
    description: 'Daily staging deployment',
    autoRollback: false,
    notifyOnComplete: true
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
  Network
} from 'lucide-react';

export const ProjectOverview: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'dependencies' | 'environments' | 'deployments' | 'logs' | 'team' | 'alerts' | 'testing' | 'ai-review' | 'productivity' | 'jira' | 'traceability' | 'settings'>('overview');

  const project = projectId ? mockProjects.find(p => p.id === projectId) : null;
  const stackInfo = project ? stacks.find(s => s.id === project.stack) : null;

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
      case 'dependencies':
        return <ProjectDependencies projectId={projectId!} />;
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
      case 'traceability':
        return <ProjectTraceability projectId={projectId!} />;
      case 'settings':
        return <ProjectSettings projectId={projectId!} />;
      default:
        return (
          <div className="space-y-6">
            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">Uptime</div>
                    <div className="text-lg font-semibold text-gray-900">99.9%</div>
                  </div>
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
                <button className="flex items-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Configure</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Rocket className="h-4 w-4" />
                  <span>Deploy</span>
                </button>
                <Link
                  to={`/project/${projectId!}/metrics`}
                  className="flex items-center space-x-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>View Metrics</span>
                </Link>
                <button className="flex items-center space-x-2 px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </button>
              </div>
            </div>

            {/* Deployment Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scheduled Deployments */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium text-gray-900">Despliegues Programados</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('deployments')}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Ver todos
                  </button>
                </div>

                <div className="space-y-3">
                  {mockScheduledDeployments
                    .filter(d => d.projectId === projectId && d.status === 'scheduled')
                    .slice(0, 3)
                    .map((deployment) => {
                      const scheduledDate = new Date(deployment.scheduledFor);
                      const now = new Date();
                      const diff = scheduledDate.getTime() - now.getTime();
                      const hours = Math.floor(diff / (1000 * 60 * 60));
                      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

                      let timeUntil = '';
                      if (hours > 24) {
                        const days = Math.floor(hours / 24);
                        timeUntil = `En ${days}d ${hours % 24}h`;
                      } else if (hours > 0) {
                        timeUntil = `En ${hours}h ${minutes}m`;
                      } else {
                        timeUntil = `En ${minutes}m`;
                      }

                      return (
                        <div key={deployment.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Server className="h-4 w-4 text-blue-500" />
                              <span className="font-medium text-sm text-gray-900">
                                {deployment.environment.toUpperCase()}
                              </span>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                              {timeUntil}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <GitBranch className="h-3 w-3" />
                            <span className="font-mono">{deployment.branch}</span>
                          </div>
                          {deployment.description && (
                            <p className="text-xs text-gray-600 mt-1">{deployment.description}</p>
                          )}
                        </div>
                      );
                    })}

                  {mockScheduledDeployments.filter(d => d.projectId === projectId && d.status === 'scheduled').length === 0 && (
                    <div className="text-center py-6">
                      <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No hay despliegues programados</p>
                      <button
                        onClick={() => setActiveTab('deployments')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Programar despliegue
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Deployments */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Rocket className="h-5 w-5 text-purple-500" />
                    <h3 className="text-lg font-medium text-gray-900">Despliegues Recientes</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('deployments')}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Ver historial
                  </button>
                </div>

                <div className="space-y-3">
                  {mockDeployments
                    .filter(d => d.projectId === projectId)
                    .slice(0, 3)
                    .map((deployment) => {
                      const statusColors = {
                        success: 'bg-green-100 text-green-700',
                        failed: 'bg-red-100 text-red-700',
                        running: 'bg-blue-100 text-blue-700',
                        pending: 'bg-yellow-100 text-yellow-700',
                        cancelled: 'bg-gray-100 text-gray-700'
                      };

                      const statusIcons = {
                        success: <CheckCircle className="h-4 w-4 text-green-500" />,
                        failed: <AlertTriangle className="h-4 w-4 text-red-500" />,
                        running: <Activity className="h-4 w-4 text-blue-500 animate-pulse" />,
                        pending: <Calendar className="h-4 w-4 text-yellow-500" />,
                        cancelled: <AlertTriangle className="h-4 w-4 text-gray-500" />
                      };

                      return (
                        <div key={deployment.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {statusIcons[deployment.status]}
                              <span className="font-medium text-sm text-gray-900">
                                {deployment.environment.toUpperCase()}
                              </span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded font-medium ${statusColors[deployment.status]}`}>
                              {deployment.status === 'success' ? 'Exitoso' :
                               deployment.status === 'failed' ? 'Fallido' :
                               deployment.status === 'running' ? 'En Curso' :
                               deployment.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <GitBranch className="h-3 w-3" />
                            <span className="font-mono">{deployment.branch}</span>
                            <span>•</span>
                            <span className="font-mono">{deployment.commit}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-1">{deployment.commitMessage}</p>
                        </div>
                      );
                    })}

                  {mockDeployments.filter(d => d.projectId === projectId).length === 0 && (
                    <div className="text-center py-6">
                      <Rocket className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No hay despliegues recientes</p>
                      <button
                        onClick={() => setActiveTab('deployments')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Ver despliegues
                      </button>
                    </div>
                  )}
                </div>
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