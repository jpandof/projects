import React from 'react';
import { Calendar } from 'lucide-react';

// Skeleton para Lista de Despliegues Programados
export const ScheduledDeploymentsListSkeleton: React.FC = () => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center space-x-1.5">
        <Calendar className="h-3.5 w-3.5 text-blue-600" />
        <span>Programados</span>
        <div className="h-4 bg-gray-300 rounded w-6 animate-pulse"></div>
      </h4>

      <div className="space-y-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded px-2 py-1.5 animate-pulse">
            <div className="flex items-center justify-between gap-1.5">
              {/* ENV + Branch */}
              <div className="flex-1 min-w-0 flex items-center gap-1.5">
                <div className="h-5 bg-gray-300 rounded w-12"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
              </div>

              {/* Fecha + Avatar + Acciones */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="h-3 bg-gray-300 rounded w-10"></div>
                <div className="h-3 bg-gray-300 rounded w-10"></div>
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <div className="h-3 w-3 bg-gray-300 rounded"></div>
                <div className="h-3 w-3 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

