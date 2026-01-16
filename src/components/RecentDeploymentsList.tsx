import React from 'react';
import { Rocket } from 'lucide-react';

interface Deployment {
  id: string;
  projectId: string;
  environment: string;
  branch: string;
  commit: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  commitMessage: string;
}

interface RecentDeploymentsListProps {
  deployments: Deployment[];
  projectId: string;
}

export const RecentDeploymentsList: React.FC<RecentDeploymentsListProps> = ({
  deployments,
  projectId
}) => {
  const filteredDeployments = deployments
    .filter(d => d.projectId === projectId)
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, 5);

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
        <Rocket className="h-4 w-4 text-green-600" />
        <span>Despliegues Recientes</span>
      </h4>

      <div className="border rounded-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="grid grid-cols-[40px,60px,1fr,70px] gap-2 p-2 bg-gray-50 border-b text-xs font-semibold text-gray-600">
          <div></div>
          <div>Env</div>
          <div>Branch</div>
          <div>Commit</div>
        </div>

        {/* Rows */}
        {filteredDeployments.length > 0 ? (
          filteredDeployments.map((deployment) => {
            const statusConfig = {
              success: { icon: '✓', color: 'text-green-600', bg: 'bg-green-50' },
              failed: { icon: '✗', color: 'text-red-600', bg: 'bg-red-50' },
              running: { icon: '⟳', color: 'text-blue-600', bg: 'bg-blue-50' },
              pending: { icon: '○', color: 'text-yellow-600', bg: 'bg-yellow-50' },
              cancelled: { icon: '⊘', color: 'text-gray-600', bg: 'bg-gray-50' }
            };

            const status = statusConfig[deployment.status as keyof typeof statusConfig];

            return (
              <div key={deployment.id} className="grid grid-cols-[40px,60px,1fr,70px] gap-2 p-2 hover:bg-gray-50 transition-colors border-b last:border-b-0 items-center">
                <div className={`w-6 h-6 flex items-center justify-center text-sm font-bold rounded ${status.bg} ${status.color}`}>
                  {status.icon}
                </div>
                <span className="px-1.5 py-0.5 text-xs font-bold rounded bg-gray-700 text-white text-center">
                  {deployment.environment.toUpperCase()}
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-xs text-gray-700 truncate">{deployment.branch}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(deployment.startedAt).toLocaleString('es-ES', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <span className="font-mono text-xs text-gray-500">{deployment.commit.slice(0, 7)}</span>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-gray-500">No hay recientes</p>
          </div>
        )}
      </div>
    </div>
  );
};

