import React from 'react';
import { Calendar, XCircle } from 'lucide-react';
import type { ScheduledDeployment } from './ProjectDeployments';

interface ScheduledDeploymentsListProps {
  deployments: ScheduledDeployment[];
  projectId: string;
  onReschedule?: (deploymentId: string) => void;
  onCancel?: (deploymentId: string) => void;
}

export const ScheduledDeploymentsList: React.FC<ScheduledDeploymentsListProps> = ({
  deployments,
  projectId,
  onReschedule,
  onCancel
}) => {
  const filteredDeployments = deployments
    .filter(d => d.projectId === projectId && d.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
    .slice(0, 5);

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-blue-600" />
        <span>Despliegues Programados ({deployments.filter(d => d.projectId === projectId && d.status === 'scheduled').length})</span>
      </h4>

      <div className="border rounded-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="grid grid-cols-[60px,1fr,80px,70px] gap-2 p-2 bg-gray-50 border-b text-xs font-semibold text-gray-600">
          <div>Env</div>
          <div>Branch</div>
          <div>Tiempo</div>
          <div>Acción</div>
        </div>

        {/* Rows */}
        {filteredDeployments.length > 0 ? (
          filteredDeployments.map((deployment) => {
            const scheduledDate = new Date(deployment.scheduledFor);
            const now = new Date();
            const diff = scheduledDate.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            let timeUntil = '';
            let isOverdue = false;

            if (diff < 0) {
              timeUntil = 'Vencido';
              isOverdue = true;
            } else if (hours > 24) {
              const days = Math.floor(hours / 24);
              timeUntil = `${days}d ${hours % 24}h`;
            } else if (hours > 0) {
              timeUntil = `${hours}h ${minutes}m`;
            } else {
              timeUntil = `${minutes}m`;
            }

            return (
              <div key={deployment.id} className="grid grid-cols-[60px,1fr,80px,70px] gap-2 p-2 hover:bg-gray-50 transition-colors border-b last:border-b-0 items-center">
                <span className="px-1.5 py-0.5 text-xs font-bold rounded bg-blue-600 text-white text-center">
                  {deployment.environment}
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-xs text-gray-700 truncate">{deployment.branch}</div>
                  <div className="text-xs text-gray-400">
                    {scheduledDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <span className={`px-1.5 py-0.5 text-xs font-bold rounded text-center ${
                  isOverdue ? 'bg-red-600 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  {timeUntil}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onReschedule?.(deployment.id)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Replanificar"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onCancel?.(deployment.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Cancelar"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-gray-500">No hay programados</p>
          </div>
        )}
      </div>
    </div>
  );
};

