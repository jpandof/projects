import React, { useState, useEffect } from 'react';
import {
  Rocket,
  Calendar,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  Server,
  RotateCcw,
  TrendingUp,
  Activity,
  ChevronDown,
  ChevronUp,
  Clock
} from 'lucide-react';
import { mockDeployments } from '../data/environments';
import { ScheduledDeploymentsList } from './ScheduledDeploymentsList';
import { RecentDeploymentsList } from './RecentDeploymentsList';
import { DeploymentCardSkeleton } from './DeploymentCardSkeleton';
import { ScheduledDeploymentsListSkeleton } from './ScheduledDeploymentsListSkeleton';
import { RecentDeploymentsListSkeleton } from './RecentDeploymentsListSkeleton';
import { EnvironmentStatusSkeleton } from './EnvironmentStatusSkeleton';
import type { ScheduledDeployment } from './ProjectDeployments';

interface DeveloperDashboardProps {
  projectId: string;
  scheduledDeployments: ScheduledDeployment[];
}

interface PipelineStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration?: number;
}

export const DeveloperDashboard: React.FC<DeveloperDashboardProps> = ({
  projectId,
  scheduledDeployments: initialScheduledDeployments
}) => {
  // Usuario actual (en producción vendría de autenticación)
  const currentUser = 'current.user@example.com';

  const [selectedBranch, setSelectedBranch] = useState('develop');
  const [selectedEnvironment, setSelectedEnvironment] = useState('TST');
  const [scheduledDateTime, setScheduledDateTime] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([]);
  const [showScheduleSuccess, setShowScheduleSuccess] = useState(false);
  const [scheduledDeployments, setScheduledDeployments] = useState<ScheduledDeployment[]>(initialScheduledDeployments);
  const [rescheduleModal, setRescheduleModal] = useState<{ id: string; currentDate: string } | null>(null);
  const [isLastDeployExpanded, setIsLastDeployExpanded] = useState(false);

  // Estados de carga para cada KPI (simular llamadas API independientes)
  const [loadingKPIs, setLoadingKPIs] = useState({
    deployTime: true,
    successRate: true,
    deployFrequency: true,
    prReviewTime: true,
    codeQuality: true,
    testCoverage: true,
  });

  // Estados de datos de KPIs
  const [kpiData, setKpiData] = useState({
    deployTime: { min: 0, max: 0, avg: 0 },
    successRate: { rate: 0, successful: 0, total: 0 },
    deployFrequency: { frequency: '0.0', count: 0 },
    prReviewTime: { avgHours: 0, pending: 0 },
    codeQuality: { score: 0 },
    testCoverage: { coverage: 0 },
  });

  // Estados de carga para otros componentes
  const [loadingComponents, setLoadingComponents] = useState({
    lastDeployment: true,
    scheduledDeployments: true,
    recentDeployments: true,
    environments: true,
  });

  // Filtrar despliegues del usuario actual (solo el último)
  const myDeployments = mockDeployments
    .filter(d => d.projectId === projectId && d.author === currentUser)
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, 1); // Solo 1 despliegue

  // Simular carga de KPI: Deploy Time (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const projectDeployments = mockDeployments.filter(d => d.projectId === projectId);
      const completedDeployments = projectDeployments.filter(d => d.duration);
      const durations = completedDeployments.map(d => d.duration || 0);

      setKpiData(prev => ({
        ...prev,
        deployTime: {
          min: durations.length > 0 ? Math.min(...durations) : 0,
          max: durations.length > 0 ? Math.max(...durations) : 0,
          avg: durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0,
        }
      }));
      setLoadingKPIs(prev => ({ ...prev, deployTime: false }));
    }, 400);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Simular carga de KPI: Success Rate (600ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const projectDeployments = mockDeployments.filter(d => d.projectId === projectId);
      const successful = projectDeployments.filter(d => d.status === 'success').length;
      const total = projectDeployments.length;

      setKpiData(prev => ({
        ...prev,
        successRate: {
          rate: total > 0 ? Math.round((successful / total) * 100) : 0,
          successful,
          total,
        }
      }));
      setLoadingKPIs(prev => ({ ...prev, successRate: false }));
    }, 600);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Simular carga de KPI: Deploy Frequency (800ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const projectDeployments = mockDeployments.filter(d => d.projectId === projectId);
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const deploymentsLastWeek = projectDeployments.filter(d =>
        new Date(d.startedAt) >= oneWeekAgo
      ).length;

      setKpiData(prev => ({
        ...prev,
        deployFrequency: {
          frequency: (deploymentsLastWeek / 7).toFixed(1),
          count: deploymentsLastWeek,
        }
      }));
      setLoadingKPIs(prev => ({ ...prev, deployFrequency: false }));
    }, 800);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Simular carga de KPI: PR Review Time (1000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setKpiData(prev => ({
        ...prev,
        prReviewTime: {
          avgHours: 18,
          pending: 3,
        }
      }));
      setLoadingKPIs(prev => ({ ...prev, prReviewTime: false }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Simular carga de KPI: Code Quality (1200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setKpiData(prev => ({
        ...prev,
        codeQuality: {
          score: 85,
        }
      }));
      setLoadingKPIs(prev => ({ ...prev, codeQuality: false }));
    }, 1200);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Simular carga de KPI: Test Coverage (1400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setKpiData(prev => ({
        ...prev,
        testCoverage: {
          coverage: 78,
        }
      }));
      setLoadingKPIs(prev => ({ ...prev, testCoverage: false }));
    }, 1400);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Simular carga de Último Despliegue (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComponents(prev => ({ ...prev, lastDeployment: false }));
    }, 500);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Simular carga de Despliegues Programados (700ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComponents(prev => ({ ...prev, scheduledDeployments: false }));
    }, 700);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Simular carga de Despliegues Recientes (900ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComponents(prev => ({ ...prev, recentDeployments: false }));
    }, 900);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Simular carga de Estado de Ambientes (1100ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComponents(prev => ({ ...prev, environments: false }));
    }, 1100);
    return () => clearTimeout(timer);
  }, [projectId]);

  // Branches disponibles
  const availableBranches = ['main', 'develop', 'staging', 'release/v2.0', 'hotfix/urgent', 'feature/new-ui'];

  // Entornos disponibles
  const environments = [
    { value: 'EDEN', label: 'EDEN', color: 'bg-blue-600' },
    { value: 'TST', label: 'TST', color: 'bg-green-600' },
    { value: 'PRE', label: 'PRE', color: 'bg-yellow-600' },
    { value: 'PRO', label: 'PRO', color: 'bg-red-600' }
  ];

  // Función para ejecutar despliegue inmediato
  const handleQuickDeploy = async () => {
    if (scheduledDateTime) {
      // Si hay fecha/hora seleccionada, programar el despliegue
      handleScheduleDeploy();
      return;
    }

    // Despliegue inmediato
    setIsDeploying(true);

    const baseSteps: PipelineStep[] = [
      { id: '1', name: 'Checkout código', status: 'pending' },
      { id: '2', name: 'Instalar dependencias', status: 'pending' },
      { id: '3', name: 'Ejecutar linting', status: 'pending' },
      { id: '4', name: 'Ejecutar tests', status: 'pending' },
      { id: '5', name: 'Build aplicación', status: 'pending' },
      { id: '6', name: 'Análisis seguridad', status: 'pending' },
      { id: '7', name: 'Crear imagen Docker', status: 'pending' },
      { id: '8', name: 'Subir a registry', status: 'pending' },
      { id: '9', name: 'Desplegar a ambiente', status: 'pending' },
      { id: '10', name: 'Health check', status: 'pending' }
    ];

    setPipelineSteps(baseSteps);

    for (let i = 0; i < baseSteps.length; i++) {
      setPipelineSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: 'running' } : step
      ));

      const duration = Math.random() * 1500 + 500;
      await new Promise(resolve => setTimeout(resolve, duration));

      const success = Math.random() < 0.95;

      if (!success) {
        setPipelineSteps(prev => prev.map((step, idx) =>
          idx === i ? { ...step, status: 'failed', duration: Math.round(duration) } :
          idx > i ? { ...step, status: 'skipped' } : step
        ));
        setIsDeploying(false);
        return;
      }

      setPipelineSteps(prev => prev.map((step, idx) =>
        idx === i ? { ...step, status: 'success', duration: Math.round(duration) } : step
      ));
    }

    setIsDeploying(false);
  };

  // Función para programar despliegue
  const handleScheduleDeploy = () => {
    const newDeployment: ScheduledDeployment = {
      id: `sched-${Date.now()}`,
      projectId: projectId,
      environment: selectedEnvironment,
      branch: selectedBranch,
      scheduledFor: scheduledDateTime,
      status: 'scheduled',
      createdBy: 'current.user@example.com',
      createdAt: new Date().toISOString(),
      description: `Deploy ${selectedBranch} a ${selectedEnvironment}`,
      autoRollback: selectedEnvironment === 'PRO',
      notifyOnComplete: true
    };

    setScheduledDeployments(prev => [...prev, newDeployment]);

    console.log('Programando despliegue:', newDeployment);

    // Mostrar mensaje de éxito
    setShowScheduleSuccess(true);
    setTimeout(() => {
      setShowScheduleSuccess(false);
      setScheduledDateTime(''); // Limpiar fecha/hora después de programar
    }, 3000);
  };

  // Función para cancelar despliegue programado
  const handleCancelDeployment = (deploymentId: string) => {
    setScheduledDeployments(prev =>
      prev.map(d => d.id === deploymentId ? { ...d, status: 'cancelled' as const } : d)
    );
    console.log('Despliegue cancelado:', deploymentId);
  };

  // Función para abrir modal de reprogramación
  const handleRescheduleDeployment = (deploymentId: string) => {
    const deployment = scheduledDeployments.find(d => d.id === deploymentId);
    if (deployment) {
      setRescheduleModal({
        id: deploymentId,
        currentDate: deployment.scheduledFor
      });
    }
  };

  // Función para confirmar reprogramación
  const handleConfirmReschedule = (newDate: string) => {
    if (rescheduleModal) {
      setScheduledDeployments(prev =>
        prev.map(d => d.id === rescheduleModal.id ? { ...d, scheduledFor: newDate } : d)
      );
      console.log('Despliegue reprogramado:', rescheduleModal.id, 'nueva fecha:', newDate);
      setRescheduleModal(null);
    }
  };

  const getStepIcon = (status: PipelineStep['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>;
      case 'running':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'skipped':
        return <div className="w-5 h-5 rounded-full border-2 border-gray-200 bg-gray-100"></div>;
    }
  };

  // Obtener estado de ambientes (mock)
  const environmentsStatus = [
    { name: 'EDEN', status: 'healthy', uptime: '99.5%', version: 'v2.1.0-dev', responseTime: 120 },
    { name: 'TST', status: 'healthy', uptime: '98.2%', version: 'v2.0.5', responseTime: 150 },
    { name: 'PRE', status: 'warning', uptime: '97.8%', version: 'v2.0.3', responseTime: 180 },
    { name: 'PRO', status: 'healthy', uptime: '99.9%', version: 'v2.0.2', responseTime: 95 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Stats - Métricas de Despliegue y Calidad */}
      <div className="grid grid-cols-6 gap-3">
        {/* Tiempo de Despliegue */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-3 text-white">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] opacity-90 font-medium">Tiempo Deploy</p>
            <Clock className="h-5 w-5 opacity-70" />
          </div>
          <div className="space-y-0.5">
            {loadingKPIs.deployTime ? (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <div className="h-7 w-12 bg-white/20 rounded animate-pulse"></div>
                  <p className="text-[10px] opacity-75">avg</p>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] opacity-90">
                  <div className="h-3 w-10 bg-white/20 rounded animate-pulse"></div>
                  <span>•</span>
                  <div className="h-3 w-10 bg-white/20 rounded animate-pulse"></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <p className="text-xl font-bold">{Math.floor(kpiData.deployTime.avg / 60)}m</p>
                  <p className="text-[10px] opacity-75">avg</p>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] opacity-90">
                  <span>↓ {Math.floor(kpiData.deployTime.min / 60)}m</span>
                  <span>•</span>
                  <span>↑ {Math.floor(kpiData.deployTime.max / 60)}m</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm p-3 text-white">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] opacity-90 font-medium">Success Rate</p>
            <CheckCircle className="h-5 w-5 opacity-70" />
          </div>
          <div className="space-y-0.5">
            {loadingKPIs.successRate ? (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <div className="h-7 w-12 bg-white/20 rounded animate-pulse"></div>
                  <p className="text-[10px] opacity-75">ok</p>
                </div>
                <div className="text-[10px] opacity-90">
                  <div className="h-3 w-16 bg-white/20 rounded animate-pulse"></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <p className="text-xl font-bold">{kpiData.successRate.rate}%</p>
                  <p className="text-[10px] opacity-75">ok</p>
                </div>
                <div className="text-[10px] opacity-90">
                  {kpiData.successRate.successful}/{kpiData.successRate.total} deploys
                </div>
              </>
            )}
          </div>
        </div>

        {/* Deploy Frequency */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-sm p-3 text-white">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] opacity-90 font-medium">Deploy Frequency</p>
            <Rocket className="h-5 w-5 opacity-70" />
          </div>
          <div className="space-y-0.5">
            {loadingKPIs.deployFrequency ? (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <div className="h-7 w-12 bg-white/20 rounded animate-pulse"></div>
                  <p className="text-[10px] opacity-75">/día</p>
                </div>
                <div className="text-[10px] opacity-90">
                  <div className="h-3 w-20 bg-white/20 rounded animate-pulse"></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <p className="text-xl font-bold">{kpiData.deployFrequency.frequency}</p>
                  <p className="text-[10px] opacity-75">/día</p>
                </div>
                <div className="text-[10px] opacity-90">
                  {kpiData.deployFrequency.count} última semana
                </div>
              </>
            )}
          </div>
        </div>

        {/* PR Review Time */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-sm p-3 text-white">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] opacity-90 font-medium">PR Review Time</p>
            <Activity className="h-5 w-5 opacity-70" />
          </div>
          <div className="space-y-0.5">
            {loadingKPIs.prReviewTime ? (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <div className="h-7 w-12 bg-white/20 rounded animate-pulse"></div>
                  <p className="text-[10px] opacity-75">avg</p>
                </div>
                <div className="text-[10px] opacity-90">
                  <div className="h-3 w-20 bg-white/20 rounded animate-pulse"></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <p className="text-xl font-bold">{kpiData.prReviewTime.avgHours}h</p>
                  <p className="text-[10px] opacity-75">avg</p>
                </div>
                <div className="text-[10px] opacity-90">
                  {kpiData.prReviewTime.pending} PRs pendientes
                </div>
              </>
            )}
          </div>
        </div>

        {/* Code Quality */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-sm p-3 text-white">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] opacity-90 font-medium">Code Quality</p>
            <Server className="h-5 w-5 opacity-70" />
          </div>
          <div className="space-y-0.5">
            {loadingKPIs.codeQuality ? (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <div className="h-7 w-8 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-3 w-12 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="text-[10px] opacity-90">
                  SonarQube
                </div>
              </>
            ) : (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <p className="text-xl font-bold">
                    {kpiData.codeQuality.score >= 80 ? 'A' : kpiData.codeQuality.score >= 60 ? 'B' : 'C'}
                  </p>
                  <p className="text-[10px] opacity-75">{kpiData.codeQuality.score} pts</p>
                </div>
                <div className="text-[10px] opacity-90">
                  SonarQube
                </div>
              </>
            )}
          </div>
        </div>

        {/* Test Coverage */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-sm p-3 text-white">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] opacity-90 font-medium">Test Coverage</p>
            <TrendingUp className="h-5 w-5 opacity-70" />
          </div>
          <div className="space-y-0.5">
            {loadingKPIs.testCoverage ? (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <div className="h-7 w-12 bg-white/20 rounded animate-pulse"></div>
                  <p className="text-[10px] opacity-75">tests</p>
                </div>
                <div className="text-[10px] opacity-90">
                  <div className="h-3 w-10 bg-white/20 rounded animate-pulse"></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-baseline space-x-1.5">
                  <p className="text-xl font-bold">{kpiData.testCoverage.coverage}%</p>
                  <p className="text-[10px] opacity-75">tests</p>
                </div>
                <div className="text-[10px] opacity-90">
                  {kpiData.testCoverage.coverage >= 80 ? '✓ OK' : '⚠ Mejorar'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mi Último Despliegue - Expandible */}
      {loadingComponents.lastDeployment ? (
        <DeploymentCardSkeleton />
      ) : (
        myDeployments.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {(() => {
            const deployment = myDeployments[0]; // Solo el último
            const statusConfig = {
              success: { icon: '✓', color: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-50' },
              failed: { icon: '✗', color: 'bg-red-500', textColor: 'text-red-600', bgLight: 'bg-red-50' },
              running: { icon: '●', color: 'bg-blue-500', textColor: 'text-blue-600', bgLight: 'bg-blue-50' },
              pending: { icon: '○', color: 'bg-gray-400', textColor: 'text-gray-600', bgLight: 'bg-gray-50' },
              cancelled: { icon: '⊘', color: 'bg-gray-500', textColor: 'text-gray-600', bgLight: 'bg-gray-50' }
            };

            const config = statusConfig[deployment.status];
            const deployTime = new Date(deployment.startedAt);
            const now = new Date();
            const diffMinutes = Math.floor((now.getTime() - deployTime.getTime()) / (1000 * 60));

            let timeAgo = '';
            if (diffMinutes < 60) {
              timeAgo = `hace ${diffMinutes}m`;
            } else if (diffMinutes < 1440) {
              timeAgo = `hace ${Math.floor(diffMinutes / 60)}h`;
            } else {
              timeAgo = `hace ${Math.floor(diffMinutes / 1440)}d`;
            }

            return (
              <>
                {/* Header - Línea compacta clickeable */}
                <button
                  onClick={() => setIsLastDeployExpanded(!isLastDeployExpanded)}
                  className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`w-2 h-2 rounded-full ${config.color} flex-shrink-0`}></div>
                    <span className="text-xs text-gray-500">Mi último deploy:</span>
                    <span className="font-mono text-xs font-semibold text-gray-700 px-2 py-0.5 bg-gray-100 rounded">
                      {deployment.environment}
                    </span>
                    <span className="font-mono text-xs text-gray-600 truncate">
                      {deployment.branch}
                    </span>
                    <span className={`text-xs font-medium ${config.textColor}`}>
                      {config.icon}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 ml-3">
                    <span className="text-xs text-gray-400">{timeAgo}</span>

                    {deployment.status === 'failed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBranch(deployment.branch);
                          setSelectedEnvironment(deployment.environment);
                          handleQuickDeploy();
                        }}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-medium flex items-center space-x-1 transition-colors"
                        title="Reintentar despliegue"
                      >
                        <RotateCcw className="h-3 w-3" />
                      </button>
                    )}

                    {isLastDeployExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Panel expandido - Pipeline Graph */}
                {isLastDeployExpanded && (
                  <div className="border-t border-gray-200 px-4 py-3 bg-gradient-to-b from-gray-50 to-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-700">Pipeline</span>
                      <div className="flex items-center space-x-3">
                        {deployment.duration && (
                          <span className="text-xs text-gray-500 flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{Math.floor(deployment.duration / 60)}m {deployment.duration % 60}s</span>
                          </span>
                        )}
                        <div className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full ${config.bgLight}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${config.color}`}></div>
                          <span className={`text-xs font-semibold ${config.textColor}`}>
                            {deployment.status === 'success' ? 'Exitoso' :
                             deployment.status === 'failed' ? 'Fallido' :
                             deployment.status === 'running' ? 'Running' : 'Cancelado'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pipeline Flow Graph */}
                    <div className="relative">
                      <div className="flex items-center space-x-1 overflow-x-auto pb-2">
                        {deployment.logs.map((log, idx) => {
                          // Determinar el estado del step
                          let stepStatus: 'success' | 'failed' | 'running' | 'pending' = 'success';
                          let stepColor = 'bg-green-500';
                          let borderColor = 'border-green-500';
                          let textColor = 'text-green-700';
                          let iconBg = 'bg-green-100';

                          if (log.includes('ERROR') || log.includes('failed') || log.includes('Failed')) {
                            stepStatus = 'failed';
                            stepColor = 'bg-red-500';
                            borderColor = 'border-red-500';
                            textColor = 'text-red-700';
                            iconBg = 'bg-red-100';
                          } else if (log.includes('Running') || log.includes('Currently') || log.includes('Deploying')) {
                            stepStatus = 'running';
                            stepColor = 'bg-blue-500';
                            borderColor = 'border-blue-500';
                            textColor = 'text-blue-700';
                            iconBg = 'bg-blue-100';
                          }

                          // Extraer nombre corto del step
                          const stepName = log
                            .replace('Starting deployment...', 'Init')
                            .replace('Installing dependencies...', 'Install')
                            .replace('Running tests...', 'Tests')
                            .replace('Building application...', 'Build')
                            .replace('Deploying to production...', 'Deploy')
                            .replace('Deploying to staging...', 'Deploy')
                            .replace('Deploying to testing...', 'Deploy')
                            .replace('Deploying to development...', 'Deploy')
                            .replace('Deploying to TST...', 'Deploy')
                            .replace('Deploying to PRE...', 'Deploy')
                            .replace('Deploying to PRO...', 'Deploy')
                            .replace('Deploying to EDEN...', 'Deploy')
                            .replace('Deployment completed successfully!', 'Done')
                            .replace('Deployment completed', 'Done')
                            .replace('Tests passed successfully', 'Tests')
                            .replace('Build completed', 'Build')
                            .replace('ERROR: Health check failed', 'Health ✗')
                            .replace('ERROR: Database migration failed', 'Migration ✗')
                            .replace('Deployment failed!', 'Failed')
                            .replace('Rolling back deployment...', 'Rollback')
                            .replace(/\.\.\.$/, '');

                          return (
                            <React.Fragment key={idx}>
                              {/* Step Node */}
                              <div className="flex flex-col items-center group">
                                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${iconBg} border-2 ${borderColor} ${
                                  stepStatus === 'running' ? 'animate-pulse' : ''
                                }`}>
                                  {stepStatus === 'success' && (
                                    <CheckCircle className={`h-4 w-4 ${stepColor.replace('bg-', 'text-')}`} />
                                  )}
                                  {stepStatus === 'failed' && (
                                    <XCircle className={`h-4 w-4 ${stepColor.replace('bg-', 'text-')}`} />
                                  )}
                                  {stepStatus === 'running' && (
                                    <Loader2 className={`h-4 w-4 ${stepColor.replace('bg-', 'text-')} animate-spin`} />
                                  )}
                                </div>
                                <span className={`mt-1 text-[10px] font-medium ${textColor} whitespace-nowrap max-w-[60px] truncate`}>
                                  {stepName}
                                </span>
                                {/* Tooltip on hover */}
                                <div className="absolute top-full mt-6 hidden group-hover:block z-10">
                                  <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                                    {log}
                                  </div>
                                </div>
                              </div>

                              {/* Connector Line */}
                              {idx < deployment.logs.length - 1 && (
                                <div className={`flex-shrink-0 w-6 h-0.5 ${stepColor} self-center -mt-4`}></div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="mt-2 text-right">
                      <span className="text-xs text-gray-400">
                        {new Date(deployment.startedAt).toLocaleString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
        )
      )}

      {/* Main Grid: Deploy Panel (Left) + Logs & Environments (Right) */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left Column: Quick Deploy (2/3) */}
        <div className="col-span-2 space-y-4">
          {/* Deploy Form */}
          <div className="bg-white rounded-lg shadow-sm border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Rocket className="h-5 w-5 text-blue-600" />
                <span>Despliegue Rápido</span>
              </h3>
              {isDeploying && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Desplegando...</span>
                </span>
              )}
            </div>

            {/* Formulario en una sola línea - compacto */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  disabled={isDeploying}
                  className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium disabled:opacity-50"
                >
                  {availableBranches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div className="w-24">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Entorno</label>
                <select
                  value={selectedEnvironment}
                  onChange={(e) => setSelectedEnvironment(e.target.value)}
                  disabled={isDeploying}
                  className="w-full px-2.5 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold disabled:opacity-50"
                >
                  {environments.map((env) => (
                    <option key={env.value} value={env.value}>{env.label}</option>
                  ))}
                </select>
              </div>

              <div className="w-44">
                <label className="block text-xs text-gray-500 mb-1.5">Programar (opcional)</label>
                <input
                  type="datetime-local"
                  value={scheduledDateTime}
                  onChange={(e) => setScheduledDateTime(e.target.value)}
                  disabled={isDeploying}
                  className="w-full px-2.5 py-2 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <button
                onClick={handleQuickDeploy}
                disabled={isDeploying}
                className={`px-5 py-2 rounded-md transition-all shadow-md font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ${
                  scheduledDateTime
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Desplegando...</span>
                  </>
                ) : scheduledDateTime ? (
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

              {scheduledDateTime && !isDeploying && (
                <button
                  onClick={() => setScheduledDateTime('')}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-all text-sm"
                  title="Limpiar fecha programada"
                >
                  ✕
                </button>
              )}
            </div>

            {showScheduleSuccess && (
              <div className="mt-3 bg-green-100 border-l-4 border-green-500 rounded p-2.5 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                <p className="text-xs text-green-900 font-medium">
                  ✓ Programado: <strong>{selectedBranch}</strong> → <strong>{selectedEnvironment}</strong> el {new Date(scheduledDateTime).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}

            {selectedEnvironment === 'PRO' && (
              <div className="mt-3 bg-red-100 border-l-4 border-red-500 rounded p-2 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <p className="text-xs text-red-900 font-medium">
                  <strong>Producción:</strong> Asegúrate de que los cambios han sido probados en PRE.
                </p>
              </div>
            )}
          </div>

          {/* Pipeline Steps */}
          {pipelineSteps.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-600" />
                <span>Pipeline CI/CD</span>
              </h3>

              <div className="space-y-2">
                {pipelineSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getStepIcon(step.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          step.status === 'success' ? 'text-green-700' :
                          step.status === 'failed' ? 'text-red-700' :
                          step.status === 'running' ? 'text-blue-700' :
                          'text-gray-700'
                        }`}>
                          {index + 1}. {step.name}
                        </span>
                        {step.duration && (
                          <span className="text-xs text-gray-500">
                            {(step.duration / 1000).toFixed(1)}s
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!isDeploying && pipelineSteps.some(s => s.status === 'failed') && (
                <div className="mt-4 flex items-center justify-center">
                  <button
                    onClick={handleQuickDeploy}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reintentar Deploy</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Deployments Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              {loadingComponents.scheduledDeployments ? (
                <ScheduledDeploymentsListSkeleton />
              ) : (
                <ScheduledDeploymentsList
                  deployments={scheduledDeployments}
                  projectId={projectId}
                  onReschedule={handleRescheduleDeployment}
                  onCancel={handleCancelDeployment}
                />
              )}
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              {loadingComponents.recentDeployments ? (
                <RecentDeploymentsListSkeleton />
              ) : (
                <RecentDeploymentsList
                  deployments={mockDeployments}
                  projectId={projectId}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Environments (1/3) */}
        <div className="space-y-4">
          {/* Environment Status */}
          {loadingComponents.environments ? (
            <EnvironmentStatusSkeleton />
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Server className="h-4 w-4 text-blue-600" />
                <span>Estado de Ambientes</span>
              </h3>

              <div className="space-y-2">
                {environmentsStatus.map((env) => (
                  <div key={env.name} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-gray-900">{env.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getStatusColor(env.status)}`}>
                        {env.status === 'healthy' ? '✓' : '⚠'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div className="flex justify-between">
                        <span>Version:</span>
                        <span className="font-mono font-medium">{env.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uptime:</span>
                        <span className="font-medium">{env.uptime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response:</span>
                        <span className="font-medium">{env.responseTime}ms</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Reprogramación */}
      {rescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Reprogramar Despliegue</span>
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nueva Fecha y Hora
              </label>
              <input
                type="datetime-local"
                defaultValue={new Date(rescheduleModal.currentDate).toISOString().slice(0, 16)}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="reschedule-datetime"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const input = document.getElementById('reschedule-datetime') as HTMLInputElement;
                  if (input.value) {
                    handleConfirmReschedule(new Date(input.value).toISOString());
                  }
                }}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Confirmar
              </button>
              <button
                onClick={() => setRescheduleModal(null)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

