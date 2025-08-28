import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Environment, mockEnvironments } from '../data/environments';
import { 
  Globe, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  ExternalLink,
  RefreshCw,
  Zap,
  Server,
  Eye
} from 'lucide-react';

interface ProjectEnvironmentsProps {
  projectId: string;
}

export const ProjectEnvironments: React.FC<ProjectEnvironmentsProps> = ({ projectId }) => {
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const environments = mockEnvironments[projectId] || [];

  const getStatusIcon = (status: Environment['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'deploying':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Environment['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'deploying':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: Environment['type']) => {
    switch (type) {
      case 'production':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'staging':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'development':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'testing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleRefresh = async (envId: string) => {
    setRefreshing(envId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (environments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Server className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">Environments</h3>
        </div>
        <div className="text-center py-8">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No environments configured for this project</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Configure Environments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Server className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">Environments</h3>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {environments.length}
          </span>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Configure
        </button>
      </div>

      <div className="space-y-4">
        {environments.map((env) => (
          <div key={env.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(env.status)}
                  <h4 className="font-medium text-gray-900">{env.name}</h4>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(env.type)}`}>
                  {env.type}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(env.status)}`}>
                  {env.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {env.url && (
                  <a
                    href={env.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Open environment"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <button
                  onClick={() => handleRefresh(env.id)}
                  disabled={refreshing === env.id}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors disabled:animate-spin"
                  title="Refresh status"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div>
                <div className="text-xs text-gray-500">Version</div>
                <div className="font-mono text-sm text-gray-900">{env.version}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Branch</div>
                <div className="font-mono text-sm text-gray-900">{env.branch}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Last Deploy</div>
                <div className="text-sm text-gray-900">{formatDate(env.lastDeployment)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">URL</div>
                <div className="text-sm text-gray-900 truncate">
                  {env.url ? (
                    <a href={env.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {env.url.replace('https://', '')}
                    </a>
                  ) : (
                    <span className="text-gray-400">Not configured</span>
                  )}
                </div>
              </div>
            </div>

            {/* Metrics */}
            {env.metrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-xs text-gray-500">Uptime</div>
                    <div className="text-sm font-medium text-gray-900">{env.metrics.uptime}%</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-xs text-gray-500">Response Time</div>
                    <div className="text-sm font-medium text-gray-900">{env.metrics.responseTime}ms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <div>
                    <div className="text-xs text-gray-500">Error Rate</div>
                    <div className="text-sm font-medium text-gray-900">{env.metrics.errorRate}%</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <div>
                    <div className="text-xs text-gray-500">Requests (24h)</div>
                    <div className="text-sm font-medium text-gray-900">{env.metrics.requests24h.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-gray-100">
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                <Eye className="h-3 w-3" />
                <span>View Logs</span>
              </button>
              <Link
                to={`/project/${projectId}/metrics`}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                <Activity className="h-3 w-3" />
                <span>Metrics</span>
              </Link>
              {env.type !== 'production' && (
                <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors">
                  <RefreshCw className="h-3 w-3" />
                  <span>Deploy</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};