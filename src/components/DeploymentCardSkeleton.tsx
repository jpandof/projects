import React from 'react';

// Skeleton para "Mi Último Despliegue"
export const DeploymentCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2.5 animate-pulse">
      <div className="flex items-center justify-between">
        {/* Indicador + texto */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="h-3 bg-gray-300 rounded w-24"></div>
          <div className="h-5 bg-gray-300 rounded w-12"></div>
          <div className="h-3 bg-gray-300 rounded w-20"></div>
        </div>

        {/* Tiempo + icono */}
        <div className="flex items-center space-x-3 ml-3">
          <div className="h-3 bg-gray-300 rounded w-12"></div>
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

