import React, { useState } from 'react';
import { X, Rocket, GitBranch, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface QuickDeployModalProps {
  projectId: string;
  projectName: string;
  onClose: () => void;
  onDeploy: (environment: string, branch: string) => void;
}

interface PipelineStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration?: number;
}

export const QuickDeployModal: React.FC<QuickDeployModalProps> = ({
  projectId,
  projectName,
  onClose,
  onDeploy
}) => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<'eden' | 'testing' | 'staging'>('testing');
  const [selectedBranch, setSelectedBranch] = useState('develop');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([
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
  ]);

  const environments = [
    { id: 'testing', label: 'Testing (TST)', description: 'Ambiente de pruebas', color: 'bg-blue-500', branches: ['develop', 'feature/*'] },
    { id: 'eden', label: 'Eden (EDEN)', description: 'Ambiente de desarrollo', color: 'bg-purple-500', branches: ['develop', 'feature/*'] },
    { id: 'staging', label: 'Pre-producción (PRE)', description: 'Ambiente de staging', color: 'bg-yellow-500', branches: ['develop', 'release/*'] },
  ];

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentStatus('deploying');

    // Ejecutar pasos de la pipeline uno por uno
    for (let i = 0; i < pipelineSteps.length; i++) {
      // Marcar paso actual como en ejecución
      setPipelineSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: 'running' } : step
      ));

      // Simular duración del paso (entre 500ms y 2000ms)
      const duration = Math.random() * 1500 + 500;
      await new Promise(resolve => setTimeout(resolve, duration));

      // 95% de éxito para cada paso (excepto el último que puede fallar un poco más)
      const successRate = i === pipelineSteps.length - 1 ? 0.9 : 0.95;
      const success = Math.random() < successRate;

      if (!success) {
        // Si falla, marcar como fallido y detener
        setPipelineSteps(prev => prev.map((step, idx) =>
          idx === i ? { ...step, status: 'failed', duration: Math.round(duration) } :
          idx > i ? { ...step, status: 'skipped' } : step
        ));
        setDeploymentStatus('error');
        setIsDeploying(false);
        return;
      }

      // Marcar paso como exitoso
      setPipelineSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: 'success', duration: Math.round(duration) } : step
      ));
    }

    // Todos los pasos completados exitosamente
    setDeploymentStatus('success');
    setIsDeploying(false);
    onDeploy(selectedEnvironment, selectedBranch);

    setTimeout(() => {
      onClose();
    }, 2500);
  };

  const currentEnv = environments.find(e => e.id === selectedEnvironment);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Rocket className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Despliegue Rápido</h2>
              <p className="text-sm text-gray-500">{projectName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isDeploying}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Pipeline Steps Progress */}
          {deploymentStatus === 'deploying' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Pipeline en ejecución</h3>
                <span className="text-xs text-gray-500">
                  {pipelineSteps.filter(s => s.status === 'success').length} / {pipelineSteps.length} pasos
                </span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {pipelineSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      step.status === 'running' ? 'bg-blue-50 border-blue-200' :
                      step.status === 'success' ? 'bg-green-50 border-green-200' :
                      step.status === 'failed' ? 'bg-red-50 border-red-200' :
                      step.status === 'skipped' ? 'bg-gray-50 border-gray-200' :
                      'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {step.status === 'pending' && (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                          <span className="text-xs text-gray-500">{index + 1}</span>
                        </div>
                      )}
                      {step.status === 'running' && (
                        <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                      )}
                      {step.status === 'success' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {step.status === 'failed' && (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      {step.status === 'skipped' && (
                        <div className="w-5 h-5 rounded-full bg-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        step.status === 'running' ? 'text-blue-900' :
                        step.status === 'success' ? 'text-green-900' :
                        step.status === 'failed' ? 'text-red-900' :
                        step.status === 'skipped' ? 'text-gray-500' :
                        'text-gray-700'
                      }`}>
                        {step.name}
                      </p>
                      {step.status === 'running' && (
                        <p className="text-xs text-blue-600">Ejecutando...</p>
                      )}
                      {step.status === 'success' && step.duration && (
                        <p className="text-xs text-green-600">Completado en {(step.duration / 1000).toFixed(1)}s</p>
                      )}
                      {step.status === 'failed' && (
                        <p className="text-xs text-red-600">Falló después de {step.duration ? (step.duration / 1000).toFixed(1) : '0'}s</p>
                      )}
                      {step.status === 'skipped' && (
                        <p className="text-xs text-gray-500">Omitido</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deployment Status - Success/Error */}
          {deploymentStatus === 'success' && (
            <div className="p-4 rounded-lg border bg-green-50 border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">¡Despliegue exitoso!</p>
                  <p className="text-sm text-green-700">El proyecto se ha desplegado correctamente en {currentEnv?.label}</p>
                </div>
              </div>
            </div>
          )}
          {deploymentStatus === 'error' && (
            <div className="p-4 rounded-lg border bg-red-50 border-red-200">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">Error en el despliegue</p>
                  <p className="text-sm text-red-700">Ha ocurrido un error durante la ejecución de la pipeline</p>
                </div>
              </div>
            </div>
          )}

          {/* Configuration - Only show when not deploying */}
          {deploymentStatus === 'idle' && (
            <>
              {/* Environment Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar Ambiente
                </label>
                <select
                  value={selectedEnvironment}
                  onChange={(e) => setSelectedEnvironment(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {environments.map((env) => (
                    <option key={env.id} value={env.id}>
                      {env.label} - {env.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4" />
                    <span>Seleccionar Rama</span>
                  </div>
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {currentEnv?.branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              {/* Deployment Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Información del Despliegue</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-600">Proyecto:</dt>
                    <dd className="font-medium text-gray-900">{projectName}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-600">Ambiente:</dt>
                    <dd className="font-medium text-gray-900">{currentEnv?.label}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-600">Rama:</dt>
                    <dd className="font-medium text-gray-900">{selectedBranch}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-600">Tiempo estimado:</dt>
                    <dd className="font-medium text-gray-900">~10-15 segundos</dd>
                  </div>
                </dl>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            disabled={isDeploying}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying || deploymentStatus === 'success'}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeploying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Desplegando...</span>
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                <span>Iniciar Despliegue</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

