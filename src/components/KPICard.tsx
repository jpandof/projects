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
    <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg shadow-sm p-3 text-white">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] opacity-90 font-medium">{title}</p>
        <Icon className="h-5 w-5 opacity-70" />
      </div>
      <div className="space-y-0.5">
        {isLoading ? (
          <>
            <div className="flex items-baseline space-x-1.5">
              <div className="h-7 w-12 bg-white/20 rounded animate-pulse"></div>
              <p className="text-[10px] opacity-75">{mainUnit || '...'}</p>
            </div>
            {secondaryValue !== undefined && (
              <div className="text-[10px] opacity-90">
                <div className="h-3 w-16 bg-white/20 rounded animate-pulse"></div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-baseline space-x-1.5">
              <p className="text-xl font-bold">{mainValue}</p>
              {mainUnit && <p className="text-[10px] opacity-75">{mainUnit}</p>}
            </div>
            {secondaryValue && (
              <div className="text-[10px] opacity-90">{secondaryValue}</div>
            )}
            {additionalInfo && (
              <div className="text-[10px] opacity-90">{additionalInfo}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
