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

  // Función para obtener iniciales del nombre
  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    const parts = name.split('.');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Función para obtener color del avatar basado en email
  const getAvatarColor = (email: string) => {
    const colors = [
      'bg-blue-100 border border-blue-200',
      'bg-emerald-100 border border-emerald-200',
      'bg-purple-100 border border-purple-200',
      'bg-rose-100 border border-rose-200',
      'bg-amber-100 border border-amber-200',
      'bg-cyan-100 border border-cyan-200',
    ];
    const textColors = [
      'text-blue-700',
      'text-emerald-700',
      'text-purple-700',
      'text-rose-700',
      'text-amber-700',
      'text-cyan-700',
    ];
    const index = email.length % colors.length;
    return { bgClass: colors[index], textClass: textColors[index] };
  };

  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center space-x-1.5">
        <Calendar className="h-3.5 w-3.5 text-slate-600" />
        <span>Programados ({deployments.filter(d => d.projectId === projectId && d.status === 'scheduled').length})</span>
      </h4>

      <div className="space-y-1.5">
        {filteredDeployments.length > 0 ? (
          filteredDeployments.map((deployment) => {
            const scheduledDate = new Date(deployment.scheduledFor);
            const now = new Date();
            const isToday = scheduledDate.toDateString() === now.toDateString();
            const isTomorrow = scheduledDate.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();

            // Calcular días de diferencia
            const daysDiff = Math.floor((scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            // Formato de día compacto
            let dayLabel = '';
            if (isToday) {
              dayLabel = 'Hoy';
            } else if (isTomorrow) {
              dayLabel = 'Mañana';
            } else if (daysDiff <= 7) {
              // Días cercanos: solo día de semana
              dayLabel = scheduledDate.toLocaleDateString('es-ES', { weekday: 'short' });
            } else {
              // Días lejanos: fecha corta
              dayLabel = scheduledDate.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short'
              });
            }

            return (
              <div key={deployment.id} className="bg-white border border-gray-200 rounded px-2 py-1.5 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between gap-1.5">
                  {/* Info del deploy */}
                  <div className="flex-1 min-w-0 flex items-center gap-1.5">
                    <span
                      className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gray-100 text-gray-700 border border-gray-200 flex-shrink-0 cursor-help"
                      title={`Entorno: ${deployment.environment}\n${deployment.autoRollback ? '✓ Auto-rollback activado' : '✗ Sin auto-rollback'}`}
                    >
                      {deployment.environment}
                    </span>
                    <span
                      className="font-mono text-[10px] text-gray-700 truncate cursor-help"
                      title={`Branch: ${deployment.branch}\nDescripción: ${deployment.description}`}
                    >
                      {deployment.branch}
                    </span>
                  </div>

                  {/* Fecha, hora y avatar en línea */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className="text-[10px] text-gray-600 font-medium cursor-help"
                      title={`Día: ${scheduledDate.toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}`}
                    >
                      {dayLabel}
                    </span>
                    <span
                      className="text-[10px] font-bold text-gray-700 cursor-help"
                      title={`Hora programada: ${scheduledDate.toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        second: '2-digit'
                      })}\nFecha completa: ${scheduledDate.toLocaleString('es-ES')}`}
                    >
                      {scheduledDate.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>

                    {/* Avatar mini */}
                    <div
                      className={`w-5 h-5 rounded-full ${getAvatarColor(deployment.createdBy).bgClass} flex items-center justify-center flex-shrink-0 cursor-help`}
                      title={`Programado por: ${deployment.createdBy}\nCreado: ${new Date(deployment.createdAt).toLocaleString('es-ES')}\n${deployment.notifyOnComplete ? '🔔 Notificaciones activas' : '🔕 Sin notificaciones'}`}
                    >
                      <span className={`text-[8px] font-bold ${getAvatarColor(deployment.createdBy).textClass}`}>
                        {getInitials(deployment.createdBy)}
                      </span>
                    </div>

                    {/* Botones mini */}
                    <button
                      onClick={() => onReschedule?.(deployment.id)}
                      className="p-0.5 text-slate-600 hover:bg-gray-100 rounded transition-colors"
                      title="Reprogramar despliegue\nClick para cambiar la fecha y hora"
                    >
                      <Calendar className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onCancel?.(deployment.id)}
                      className="p-0.5 text-slate-600 hover:bg-gray-100 rounded transition-colors"
                      title="Cancelar despliegue\nEsta acción no se puede deshacer"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-3 bg-gray-50 rounded border border-dashed border-gray-300">
            <p className="text-[10px] text-gray-500">Sin programaciones</p>
          </div>
        )}
      </div>
    </div>
  );
};

