import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface KPICardProps {
  title: string;
  icon: LucideIcon;
  isLoading: boolean;
  mainValue: string | number;
  mainUnit?: string;
  secondaryValue?: string;
  additionalInfo?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  icon: Icon,
  isLoading,
  mainValue,
  mainUnit,
  secondaryValue,
  additionalInfo
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-3.5 group">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
        <Icon className="h-4 w-4 text-gray-400 group-hover:text-slate-600 transition-colors" />
      </div>
      <div className="space-y-1">
        {isLoading ? (
          <>
            <div className="flex items-baseline space-x-1.5">
              <div className="h-7 w-12 bg-gray-200 rounded animate-pulse"></div>
              <p className="text-[10px] text-gray-400">{mainUnit || '...'}</p>
            </div>
            {secondaryValue !== undefined && (
              <div className="text-[10px] text-gray-400">
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-baseline space-x-1.5">
              <p className="text-2xl font-bold text-gray-900">{mainValue}</p>
              {mainUnit && <p className="text-[10px] text-gray-500 font-medium">{mainUnit}</p>}
            </div>
            {secondaryValue && (
              <div className="text-[10px] text-gray-600 font-medium">{secondaryValue}</div>
            )}
            {additionalInfo && (
              <div className="text-[10px] text-gray-500">{additionalInfo}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
