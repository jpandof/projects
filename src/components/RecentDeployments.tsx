import React, { useState } from 'react';
import { Rocket, Clock, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { mockDeployments } from '../data/environments';
import { mockProjects } from '../data/projects';

interface RecentDeploymentsProps {
  onQuickDeploy: (projectId: string, projectName: string) => void;
}

interface PipelineStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration?: number;
}

export const RecentDeployments: React.FC<RecentDeploymentsProps> = ({ onQuickDeploy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('develop');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployingTo, setDeployingTo] = useState<'eden' | 'testing' | 'staging' | null>(null);
  const [livePipelineSteps, setLivePipelineSteps] = useState<PipelineStep[]>([]);

  // Obtener solo el último despliegue
  const lastDeployment = mockDeployments
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())[0];

  // Ramas disponibles
  const availableBranches = ['develop', 'main', 'master', 'feature/new-login', 'feature/api-v2', 'hotfix/security'];

  // Determinar qué ambientes están disponibles según la rama seleccionada
  const getAvailableEnvironments = () => {
    if (selectedBranch === 'main' || selectedBranch === 'master') {
      return ['eden', 'testing', 'staging']; // Todas
    } else if (selectedBranch === 'develop') {
      return ['eden', 'testing', 'staging']; // Todas
    } else {
      return ['eden', 'testing']; // Solo eden y tst para feature branches
    }
  };

  // Función para ejecutar despliegue directo
  const handleDirectDeploy = async (environment: 'eden' | 'testing' | 'staging') => {
    setIsDeploying(true);
    setDeployingTo(environment);
    setIsExpanded(true); // Auto-expandir para mostrar la pipeline

    // Inicializar pasos de la pipeline
    const baseSteps: PipelineStep[] = [
      { id: '1', name: 'Checkout código', status: 'pending' },
      { id: '2', name: 'Instalar dependencias', status: 'pending' },
      { id: '3', name: 'Ejecutar linting', status: 'pending' },
      { id: '4', name: 'Ejecutar tests unitarios', status: 'pending' },
      { id: '5', name: 'Build de la aplicación', status: 'pending' },
      { id: '6', name: 'Análisis de seguridad', status: 'pending' },
      { id: '7', name: 'Crear imagen Docker', status: 'pending' },
      { id: '8', name: 'Subir a registry', status: 'pending' },
      { id: '9', name: 'Desplegar a ambiente', status: 'pending' },
      { id: '10', name: 'Health check', status: 'pending' },
    ];

    setLivePipelineSteps(baseSteps);

    // Ejecutar pasos uno por uno
    for (let i = 0; i < baseSteps.length; i++) {
      // Marcar paso actual como en ejecución
      setLivePipelineSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: 'running' } : step
      ));

      // Simular duración del paso
      const duration = Math.random() * 1500 + 500;
      await new Promise(resolve => setTimeout(resolve, duration));

      // 95% de éxito para cada paso
      const success = Math.random() < 0.95;

      if (!success) {
        // Si falla, marcar como fallido y detener
        setLivePipelineSteps(prev => prev.map((step, idx) =>
          idx === i ? { ...step, status: 'failed', duration: Math.round(duration) } :
          idx > i ? { ...step, status: 'skipped' } : step
        ));
        setIsDeploying(false);
        return;
      }

      // Marcar paso como exitoso
      setLivePipelineSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: 'success', duration: Math.round(duration) } : step
      ));
    }

    // Todos los pasos completados exitosamente
    setIsDeploying(false);

    // Mantener el resultado visible por 3 segundos antes de colapsar
    setTimeout(() => {
      setDeployingTo(null);
    }, 3000);
  };

  // Simular pasos de la pipeline según el estado del despliegue (para el último despliegue histórico)
  const getPipelineSteps = (): PipelineStep[] => {
    if (!lastDeployment) return [];

    const baseSteps = [
      { id: '1', name: 'Checkout código', status: 'pending' as const },
      { id: '2', name: 'Instalar dependencias', status: 'pending' as const },
      { id: '3', name: 'Ejecutar linting', status: 'pending' as const },
      { id: '4', name: 'Ejecutar tests unitarios', status: 'pending' as const },
      { id: '5', name: 'Build de la aplicación', status: 'pending' as const },
      { id: '6', name: 'Análisis de seguridad', status: 'pending' as const },
      { id: '7', name: 'Crear imagen Docker', status: 'pending' as const },
      { id: '8', name: 'Subir a registry', status: 'pending' as const },
      { id: '9', name: 'Desplegar a ambiente', status: 'pending' as const },
      { id: '10', name: 'Health check', status: 'pending' as const },
    ];

    // Simular progreso según el estado
    if (lastDeployment.status === 'success') {
      return baseSteps.map((step) => ({
        ...step,
        status: 'success' as const,
        duration: Math.floor(Math.random() * 2000) + 500
      }));
    } else if (lastDeployment.status === 'failed') {
      const failedAt = Math.floor(Math.random() * 7) + 3;
      return baseSteps.map((step, idx) => ({
        ...step,
        status: idx < failedAt ? 'success' as const : idx === failedAt ? 'failed' as const : 'skipped' as const,
        duration: idx <= failedAt ? Math.floor(Math.random() * 2000) + 500 : undefined
      }));
    } else if (lastDeployment.status === 'running') {
      const currentStep = Math.floor(Math.random() * 8) + 1;
      return baseSteps.map((step, idx) => ({
        ...step,
        status: idx < currentStep ? 'success' as const : idx === currentStep ? 'running' as const : 'pending' as const,
        duration: idx < currentStep ? Math.floor(Math.random() * 2000) + 500 : undefined
      }));
    }

    return baseSteps;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStepIcon = (status: 'pending' | 'running' | 'success' | 'failed' | 'skipped', index: number) => {
    switch (status) {
      case 'pending':
        return (
          <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <span className="text-[8px] text-gray-500">{index + 1}</span>
          </div>
        );
      case 'running':
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'skipped':
        return <div className="w-4 h-4 rounded-full bg-gray-300" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEnvironmentBadge = (env: string) => {
    switch (env) {
      case 'testing':
        return { label: 'TST', color: 'bg-blue-500' };
      case 'eden':
        return { label: 'EDEN', color: 'bg-purple-500' };
      case 'staging':
        return { label: 'PRE', color: 'bg-yellow-500' };
      case 'production':
        return { label: 'PROD', color: 'bg-red-500' };
      default:
        return { label: env.toUpperCase(), color: 'bg-gray-500' };
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    return `Hace ${diffDays}d`;
  };

  const getProjectName = (projectId: string) => {
    return mockProjects.find(p => p.id === projectId)?.name || 'Proyecto desconocido';
  };

  if (!lastDeployment) {
    return null;
  }

  const envBadge = getEnvironmentBadge(lastDeployment.environment);
  const projectName = getProjectName(lastDeployment.projectId);
  const pipelineSteps = isDeploying || deployingTo ? livePipelineSteps : getPipelineSteps();
  const availableEnvironments = getAvailableEnvironments();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 mb-6">
      {/* Main bar - always visible */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          {/* Left: Last deployment info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {getStatusIcon(lastDeployment.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs text-gray-600">Último:</span>
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {projectName}
                </h3>
                <span className={`px-2 py-0.5 text-xs font-medium text-white rounded ${envBadge.color}`}>
                  {envBadge.label}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(lastDeployment.status)}`}>
                  {lastDeployment.status === 'success' ? '✓' : lastDeployment.status === 'failed' ? '✗' : '⟳'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(lastDeployment.startedAt)}</span>
                <span>•</span>
                <span className="truncate max-w-sm">{lastDeployment.commitMessage}</span>
              </div>
            </div>
          </div>

          {/* Right: View workflow toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 px-3 py-2 bg-white text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
            title="Ver workflow del último despliegue"
          >
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            <span>Ver workflow</span>
          </button>
        </div>

        {/* Deploy controls */}
        <div className="flex items-center space-x-3 pt-3 border-t border-blue-200">
          {/* Branch selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-700">Rama:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              disabled={isDeploying}
              className="text-xs px-2 py-1 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            >
              {availableBranches.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          {/* Deploy buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-700">Desplegar a:</span>

            {availableEnvironments.includes('eden') && (
              <button
                onClick={() => handleDirectDeploy('eden')}
                disabled={isDeploying}
                className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${
                  deployingTo === 'eden' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300'
                }`}
              >
                {deployingTo === 'eden' && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>EDEN</span>
              </button>
            )}

            {availableEnvironments.includes('testing') && (
              <button
                onClick={() => handleDirectDeploy('testing')}
                disabled={isDeploying}
                className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${
                  deployingTo === 'testing' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300'
                }`}
              >
                {deployingTo === 'testing' && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>TST</span>
              </button>
            )}

            {availableEnvironments.includes('staging') && (
              <button
                onClick={() => handleDirectDeploy('staging')}
                disabled={isDeploying}
                className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${
                  deployingTo === 'staging' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border border-yellow-300'
                }`}
              >
                {deployingTo === 'staging' && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>PRE</span>
              </button>
            )}
          </div>

          {isDeploying && (
            <span className="text-xs text-blue-600 font-medium animate-pulse">
              Desplegando...
            </span>
          )}
        </div>
      </div>

      {/* Expandable pipeline workflow */}
      {isExpanded && (
        <div className="border-t border-blue-200 bg-white/50 p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900">
                {isDeploying || deployingTo ? (
                  <>Pipeline en Ejecución - Desplegando a {deployingTo?.toUpperCase()}</>
                ) : (
                  <>Workflow del Último Despliegue</>
                )}
              </h4>
              <span className="text-xs text-gray-600">
                {pipelineSteps.filter(s => s.status === 'success').length} / {pipelineSteps.length} completados
              </span>
            </div>

            {/* Status message for live deployment */}
            {isDeploying && (
              <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded flex items-center space-x-2">
                <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                <span className="text-xs text-blue-900 font-medium">
                  Desplegando rama "{selectedBranch}" a {deployingTo?.toUpperCase()}...
                </span>
              </div>
            )}

            {/* Success message */}
            {!isDeploying && deployingTo && pipelineSteps.every(s => s.status === 'success') && (
              <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-900 font-medium">
                  ¡Despliegue exitoso en {deployingTo?.toUpperCase()}!
                </span>
              </div>
            )}

            {/* Failure message */}
            {!isDeploying && deployingTo && pipelineSteps.some(s => s.status === 'failed') && (
              <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-xs text-red-900 font-medium">
                  Despliegue fallido en {deployingTo?.toUpperCase()}
                </span>
              </div>
            )}

            {/* Pipeline steps */}
            <div className="grid grid-cols-2 gap-2">
              {pipelineSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 p-2 rounded border text-xs ${
                    step.status === 'running' ? 'bg-blue-50 border-blue-300' :
                    step.status === 'success' ? 'bg-green-50 border-green-200' :
                    step.status === 'failed' ? 'bg-red-50 border-red-200' :
                    step.status === 'skipped' ? 'bg-gray-50 border-gray-200' :
                    'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {getStepIcon(step.status, index)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${
                      step.status === 'running' ? 'text-blue-900' :
                      step.status === 'success' ? 'text-green-900' :
                      step.status === 'failed' ? 'text-red-900' :
                      step.status === 'skipped' ? 'text-gray-500' :
                      'text-gray-700'
                    }`}>
                      {step.name}
                    </p>
                    {step.status === 'running' && (
                      <p className="text-[10px] text-blue-600">Ejecutando...</p>
                    )}
                    {step.status === 'success' && step.duration && (
                      <p className="text-[10px] text-green-600">{(step.duration / 1000).toFixed(1)}s</p>
                    )}
                    {step.status === 'failed' && step.duration && (
                      <p className="text-[10px] text-red-600">Falló en {(step.duration / 1000).toFixed(1)}s</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

