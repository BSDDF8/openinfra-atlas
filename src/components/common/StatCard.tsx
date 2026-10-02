import React from 'react';
import { formatNumber, formatPercent } from '../../utils/formatters';

interface StatCardProps {
  label: string;
  value: number;
  unit: string;
  year?: number;
  source?: string;
  isPercentage?: boolean;
  delta?: {
    value: number;
    sinceYear: number;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  year = 2024,
  source = 'Demonstration dataset (IEA/Ember framework)',
  isPercentage = false,
  delta,
  className = ''
}) => {
  const formattedValue = isPercentage ? formatPercent(value, 1) : formatNumber(value, 1);

  return (
    <div className={`bg-white border border-slate-200 rounded p-4 shadow-sm flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium text-slate-600 truncate">{label}</span>
          <span className="font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
            {year}
          </span>
        </div>
        
        <div className="flex items-baseline gap-1.5 my-1">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {formattedValue}
          </span>
          {!isPercentage && (
            <span className="text-xs font-medium text-slate-500 font-mono uppercase">
              {unit}
            </span>
          )}
        </div>

        {delta && (
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className={delta.value >= 0 ? 'text-emerald-700 font-medium' : 'text-slate-600'}>
              {delta.value >= 0 ? `+${formatNumber(delta.value, 1)}` : formatNumber(delta.value, 1)} {unit}
            </span>
            <span>vs {delta.sinceYear}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="truncate" title={source}>
          Src: {source}
        </span>
        <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 font-medium">
          Demo data
        </span>
      </div>
    </div>
  );
};
