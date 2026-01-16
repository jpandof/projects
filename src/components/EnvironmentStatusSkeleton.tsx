import React from 'react';
import { Server } from 'lucide-react';

// Skeleton para Estado de Ambientes
export const EnvironmentStatusSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
        <Server className="h-4 w-4 text-blue-600" />
        <span>Estado de Ambientes</span>
      </h3>

      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg animate-pulse">
            <div className="flex items-center justify-between mb-1">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-5 bg-gray-300 rounded-full w-6"></div>
            </div>
            <div className="text-xs space-y-0.5">
              <div className="flex justify-between">
                <div className="h-3 bg-gray-300 rounded w-12"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-300 rounded w-12"></div>
                <div className="h-3 bg-gray-300 rounded w-10"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-300 rounded w-14"></div>
                <div className="h-3 bg-gray-300 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

