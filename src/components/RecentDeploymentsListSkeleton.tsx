import React from 'react';
import { Clock } from 'lucide-react';

// Skeleton para Lista de Despliegues Recientes
export const RecentDeploymentsListSkeleton: React.FC = () => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center space-x-1.5">
        <Clock className="h-3.5 w-3.5 text-green-600" />
        <span>Recientes</span>
        <div className="h-4 bg-gray-300 rounded w-6 animate-pulse"></div>
      </h4>

      <div className="space-y-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded px-2 py-1.5 animate-pulse">
            <div className="flex items-center justify-between gap-1.5">
              {/* Estado + ENV + Branch */}
              <div className="flex-1 min-w-0 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="h-5 bg-gray-300 rounded w-12"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>

              {/* Tiempo + Avatar */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="h-3 bg-gray-300 rounded w-12"></div>
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

