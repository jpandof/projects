import React, { useState } from 'react';
import { Deployment, mockDeployments } from '../data/environments';
import { 
  Rocket, 
  GitBranch, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Download
} from 'lucide-react';

interface ProjectDeploymentsProps {
  projectId: string;
}

export const ProjectDeployments: React.FC<ProjectDeploymentsProps> = ({ projectId }) => {
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);
  const deployments = mockDeployments.filter(d => d.projectId === projectId);

  const getStatusIcon = (status: Deployment['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Play className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <Pause className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Deployment['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRetryDeployment = (deploymentId: string) => {
    console.log('Retrying deployment:', deploymentId);
    // Implement retry logic
  };

  const handleCancelDeployment = (deploymentId: string) => {
    console.log('Cancelling deployment:', deploymentId);
    // Implement cancel logic
  };

  if (deployments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Rocket className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">Deployments</h3>
        </div>
        <div className="text-center py-8">
          <Rocket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No deployments found for this project</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Deploy Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Rocket className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900">Deployment History</h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {deployments.length}
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Deployment
          </button>
        </div>
      </div>

      {/* Deployments List */}
      <div className="divide-y divide-gray-100">
        {deployments.map((deployment) => (
          <div key={deployment.id} className="p-6">
            {/* Deployment Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(deployment.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      Deploy to {deployment.environment}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(deployment.status)}`}>
                      {deployment.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <GitBranch className="h-3 w-3" />
                      <span className="font-mono">{deployment.branch}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-mono">{deployment.commit}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{deployment.author.split('@')[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(deployment.startedAt)}</span>
                    </div>
                    {deployment.duration && (
                      <div className="flex items-center space-x-1">
                        <span>Duration: {formatDuration(deployment.duration)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedDeployment(
                    selectedDeployment === deployment.id ? null : deployment.id
                  )}
                  className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors"
                >
                  <Eye className="h-3 w-3" />
                  <span>Logs</span>
                </button>
                {deployment.status === 'failed' && (
                  <button
                    onClick={() => handleRetryDeployment(deployment.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Retry</span>
                  </button>
                )}
                {deployment.status === 'running' && (
                  <button
                    onClick={() => handleCancelDeployment(deployment.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                  >
                    <Pause className="h-3 w-3" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>

            {/* Commit Message */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                {deployment.commitMessage}
              </p>
            </div>

            {/* Deployment Logs */}
            {selectedDeployment === deployment.id && (
              <div className="mt-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Deployment Logs</span>
                  <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700">
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
                <div className="p-4 bg-gray-900 text-gray-100 font-mono text-sm max-h-64 overflow-y-auto">
                  {deployment.logs.map((log, index) => (
                    <div key={index} className="mb-1">
                      <span className="text-gray-400">[{formatDate(deployment.startedAt)}]</span> {log}
                    </div>
                  ))}
                  {deployment.status === 'running' && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-400 border-t-transparent"></div>
                      <span className="text-blue-400">Deployment in progress...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};