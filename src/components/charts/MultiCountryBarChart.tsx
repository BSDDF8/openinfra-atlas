import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { formatNumber, formatPercent } from '../../utils/formatters';

interface CountryBarData {
  countryId: string;
  countryName: string;
  value: number;
  unit: string;
}

interface MultiCountryBarChartProps {
  data: CountryBarData[];
  title: string;
  subtitle?: string;
  unit: string;
  year: number;
  height?: number;
  isPercentage?: boolean;
}

const COUNTRY_COLORS: Record<string, string> = {
  'india': '#ea580c',
  'united-states': '#2563eb',
  'china': '#dc2626',
  'germany': '#059669',
  'japan': '#7c3aed',
  'brazil': '#16a34a',
  'united-kingdom': '#0284c7',
  'france': '#4f46e5'
};

export const MultiCountryBarChart: React.FC<MultiCountryBarChartProps> = ({
  data,
  title,
  subtitle,
  unit,
  year,
  height = 320,
  isPercentage = false
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 text-white rounded p-2.5 text-xs shadow-lg">
          <div className="text-slate-400 text-[11px] mb-1">
            {item.countryName} ({year})
          </div>
          <div className="font-mono text-sm font-bold text-white">
            {isPercentage ? formatPercent(item.value, 1) : `${formatNumber(item.value, 1)} ${unit}`}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Year: {year}
          </span>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Unit: {unit}
          </span>
        </div>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="countryName"
              stroke="#64748b"
              fontSize={11}
              interval={0}
              angle={-20}
              textAnchor="end"
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(v) => isPercentage ? `${v}%` : `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.countryId}
                  fill={COUNTRY_COLORS[entry.countryId] || '#334155'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Cross-sectional benchmark ({year})</span>
        <span className="font-mono text-amber-800">Demonstration dataset</span>
      </div>
    </div>
  );
};
