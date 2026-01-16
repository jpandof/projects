import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Rocket,
  GitBranch,
  User,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  AlertCircle,
  Trash2,
  Edit,
  Plus,
  Filter,
  Download,
  Eye,
  RotateCcw,
  Server
} from 'lucide-react';

export interface ScheduledDeployment {
  id: string;
  projectId: string;
  environment: string;
  branch: string;
  scheduledFor: string;
  status: 'scheduled' | 'cancelled';
  createdBy: string;
  createdAt: string;
  description?: string;
  autoRollback?: boolean;
  notifyOnComplete?: boolean;
}

export interface DeploymentHistory {
  id: string;
  projectId: string;
  environment: string;
  branch: string;
  commit: string;
  commitMessage: string;
  status: 'success' | 'failed' | 'running' | 'cancelled';
  startedAt: string;
  completedAt?: string;
  duration?: number;
  author: string;
  logs: string[];
  triggeredBy?: 'manual' | 'scheduled' | 'auto';
}

interface ScheduledDeploymentsProps {
  projectId: string;
}

// Mock data
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
    scheduledFor: '2025-11-25T18:00:00Z',
    status: 'scheduled',
    createdBy: 'jane.smith@example.com',
    createdAt: '2025-11-25T09:15:00Z',
    description: 'Daily staging deployment',
    autoRollback: false,
    notifyOnComplete: true
  }
];

const mockDeploymentHistory: DeploymentHistory[] = [
  {
    id: 'hist-1',
    projectId: '1',
    environment: 'production',
    branch: 'main',
    commit: 'a3b4c5d',
    commitMessage: 'feat: Add user authentication',
    status: 'success',
    startedAt: '2025-11-24T14:30:00Z',
    completedAt: '2025-11-24T14:35:00Z',
    duration: 300,
    author: 'john.doe@example.com',
    logs: ['Starting deployment...', 'Building application...', 'Running tests...', 'Deployment successful!'],
    triggeredBy: 'scheduled'
  },
  {
    id: 'hist-2',
    projectId: '1',
    environment: 'staging',
    branch: 'develop',
    commit: 'b4c5d6e',
    commitMessage: 'fix: Resolve login bug',
    status: 'failed',
    startedAt: '2025-11-23T10:00:00Z',
    completedAt: '2025-11-23T10:03:00Z',
    duration: 180,
    author: 'jane.smith@example.com',
    logs: ['Starting deployment...', 'Building application...', 'Error: Build failed'],
    triggeredBy: 'manual'
  },
  {
    id: 'hist-3',
    projectId: '1',
    environment: 'production',
    branch: 'main',
    commit: 'c5d6e7f',
    commitMessage: 'chore: Update dependencies',
    status: 'success',
    startedAt: '2025-11-22T16:00:00Z',
    completedAt: '2025-11-22T16:04:00Z',
    duration: 240,
    author: 'admin@example.com',
    logs: ['Starting deployment...', 'Building application...', 'Deployment successful!'],
    triggeredBy: 'scheduled'
  }
];

export const ScheduledDeployments: React.FC<ScheduledDeploymentsProps> = ({ projectId }) => {
  const [activeView, setActiveView] = useState<'scheduled' | 'history'>('scheduled');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);
  const [filterEnvironment, setFilterEnvironment] = useState<string>('all');

  const scheduledDeployments = mockScheduledDeployments.filter(d => d.projectId === projectId);
  const deploymentHistory = mockDeploymentHistory.filter(d => d.projectId === projectId);

  const getStatusIcon = (status: DeploymentHistory['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Play className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'cancelled':
        return <Pause className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: DeploymentHistory['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getTimeUntilDeployment = (scheduledFor: string) => {
    const now = new Date();
    const scheduled = new Date(scheduledFor);
    const diff = scheduled.getTime() - now.getTime();

    if (diff < 0) return 'Overdue';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `En ${days}d ${hours % 24}h`;
    }
    return `En ${hours}h ${minutes}m`;
  };

  const handleCancelScheduled = (id: string) => {
    console.log('Cancelling scheduled deployment:', id);
    // Implement cancel logic
  };

  const handleEditScheduled = (id: string) => {
    console.log('Editing scheduled deployment:', id);
    // Implement edit logic
  };

  const filteredHistory = filterEnvironment === 'all'
    ? deploymentHistory
    : deploymentHistory.filter(d => d.environment === filterEnvironment);

  return (
    <div className="space-y-6">
      {/* Header with View Toggles */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Rocket className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900">Gestión de Despliegues</h3>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Programar Despliegue</span>
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('scheduled')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeView === 'scheduled'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Programados</span>
            <span className="px-2 py-0.5 bg-white text-xs rounded-full">
              {scheduledDeployments.filter(d => d.status === 'scheduled').length}
            </span>
          </button>
          <button
            onClick={() => setActiveView('history')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeView === 'history'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Historial</span>
            <span className="px-2 py-0.5 bg-white text-xs rounded-full">
              {deploymentHistory.length}
            </span>
          </button>
        </div>
      </div>

      {/* Scheduled Deployments View */}
      {activeView === 'scheduled' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h4 className="font-medium text-gray-900">Despliegues Programados</h4>
            <p className="text-sm text-gray-500 mt-1">
              Próximos despliegues automáticos configurados
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {scheduledDeployments.filter(d => d.status === 'scheduled').length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hay despliegues programados</p>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Programar Primer Despliegue
                </button>
              </div>
            ) : (
              scheduledDeployments
                .filter(d => d.status === 'scheduled')
                .map((deployment) => (
                  <div key={deployment.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex items-center space-x-2">
                            <Server className="h-4 w-4 text-blue-500" />
                            <span className="font-medium text-gray-900">
                              {deployment.environment.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <GitBranch className="h-3 w-3" />
                            <span className="font-mono">{deployment.branch}</span>
                          </div>
                        </div>

                        {deployment.description && (
                          <p className="text-sm text-gray-700 mb-3">{deployment.description}</p>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDateTime(deployment.scheduledFor)}</span>
                          </div>
                          <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                            {getTimeUntilDeployment(deployment.scheduledFor)}
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{deployment.createdBy.split('@')[0]}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 mt-3">
                          {deployment.autoRollback && (
                            <span className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                              <CheckCircle className="h-3 w-3" />
                              <span>Auto-rollback activo</span>
                            </span>
                          )}
                          {deployment.notifyOnComplete && (
                            <span className="flex items-center space-x-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              <AlertCircle className="h-3 w-3" />
                              <span>Notificación activada</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEditScheduled(deployment.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleCancelScheduled(deployment.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Cancelar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* History View */}
      {activeView === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Historial de Despliegues</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Registro completo de todos los despliegues
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterEnvironment}
                  onChange={(e) => setFilterEnvironment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos los entornos</option>
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredHistory.length === 0 ? (
              <div className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hay despliegues en el historial</p>
              </div>
            ) : (
              filteredHistory.map((deployment) => (
                <div key={deployment.id} className="p-6">
                  {/* Deployment Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(deployment.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {deployment.environment.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(deployment.status)}`}>
                            {deployment.status === 'success' ? 'Exitoso' :
                             deployment.status === 'failed' ? 'Fallido' :
                             deployment.status === 'running' ? 'En Curso' : 'Cancelado'}
                          </span>
                          {deployment.triggeredBy === 'scheduled' && (
                            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                              Programado
                            </span>
                          )}
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
                            <span>{formatDateTime(deployment.startedAt)}</span>
                          </div>
                          {deployment.duration && (
                            <div className="flex items-center space-x-1">
                              <span>⏱️ {formatDuration(deployment.duration)}</span>
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
                        <span>Ver Logs</span>
                      </button>
                      {deployment.status === 'failed' && (
                        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                          <RotateCcw className="h-3 w-3" />
                          <span>Reintentar</span>
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
                    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Logs de Despliegue</span>
                        <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700">
                          <Download className="h-3 w-3" />
                          <span>Descargar</span>
                        </button>
                      </div>
                      <div className="p-4 bg-gray-900 text-gray-100 font-mono text-sm max-h-64 overflow-y-auto">
                        {deployment.logs.map((log, index) => (
                          <div key={index} className="mb-1">
                            <span className="text-gray-400">[{formatDateTime(deployment.startedAt)}]</span> {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleDeploymentModal
          projectId={projectId}
          onClose={() => setShowScheduleModal(false)}
        />
      )}
    </div>
  );
};

// Schedule Deployment Modal Component
interface ScheduleDeploymentModalProps {
  projectId: string;
  onClose: () => void;
}

const ScheduleDeploymentModal: React.FC<ScheduleDeploymentModalProps> = ({ projectId, onClose }) => {
  const [formData, setFormData] = useState({
    environment: 'staging',
    branch: 'main',
    date: '',
    time: '',
    description: '',
    autoRollback: false,
    notifyOnComplete: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Scheduling deployment for project:', projectId, formData);
    // Implement schedule logic
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Programar Nuevo Despliegue</h3>
          <p className="text-sm text-gray-500 mt-1">
            Configure los detalles del despliegue programado
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Environment Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entorno de Despliegue
            </label>
            <select
              value={formData.environment}
              onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </div>

          {/* Branch Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>
            <input
              type="text"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="main, develop, release/v1.0.0"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (Opcional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Despliegue de la versión 2.1.0 con nuevas características..."
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.autoRollback}
                onChange={(e) => setFormData({ ...formData, autoRollback: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Auto-rollback en caso de fallo</span>
                <p className="text-xs text-gray-500">Revertir automáticamente si el despliegue falla</p>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.notifyOnComplete}
                onChange={(e) => setFormData({ ...formData, notifyOnComplete: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Notificar al completar</span>
                <p className="text-xs text-gray-500">Enviar notificación cuando el despliegue termine</p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>Programar Despliegue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

