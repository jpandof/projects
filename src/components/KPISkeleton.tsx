import React from 'react';

export const KPISkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-sm p-3 animate-pulse min-h-[93px]">
      {/* Header - replicar exactamente el layout del KPI real */}
      <div className="flex items-center justify-between mb-1" style={{ minHeight: '20px' }}>
        {/* Título simulado */}
        <div className="h-[14px] bg-gray-400 rounded w-20 opacity-90"></div>
        {/* Icono simulado */}
        <div className="h-5 w-5 bg-gray-400 rounded-full opacity-70"></div>
      </div>

      {/* Contenido principal */}
      <div className="space-y-0.5">
        {/* Primera línea con número grande */}
        <div className="flex items-baseline space-x-1.5" style={{ minHeight: '28px' }}>
          {/* Número principal - text-xl tiene line-height de 1.75 = 28px */}
          <div className="h-[28px] bg-gray-400 rounded w-12"></div>
          {/* Label pequeño */}
          <div className="h-[14px] bg-gray-400 rounded w-8 opacity-75"></div>
        </div>

        {/* Segunda línea con detalles */}
        <div className="flex items-center space-x-1.5" style={{ minHeight: '14px' }}>
          <div className="h-[14px] bg-gray-400 rounded w-6 opacity-90"></div>
          <div className="h-1 w-1 bg-gray-400 rounded-full opacity-90"></div>
          <div className="h-[14px] bg-gray-400 rounded w-6 opacity-90"></div>
        </div>
      </div>
    </div>
  );
};

