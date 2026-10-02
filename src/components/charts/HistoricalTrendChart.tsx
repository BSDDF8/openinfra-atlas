import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { formatNumber, formatPercent } from '../../utils/formatters';

export interface TrendSeriesConfig {
  key: string;
  name: string;
  color: string;
  strokeWidth?: number;
}

interface HistoricalTrendChartProps {
  data: Record<string, any>[];
  series: TrendSeriesConfig[];
  title: string;
  subtitle?: string;
  unit: string;
  height?: number;
  isPercentage?: boolean;
}

export const HistoricalTrendChart: React.FC<HistoricalTrendChartProps> = ({
  data,
  series,
  title,
  subtitle,
  unit,
  height = 360,
  isPercentage = false
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 text-white rounded p-3 text-xs shadow-lg font-sans">
          <div className="font-semibold text-slate-300 border-b border-slate-700 pb-1 mb-2">
            Year: {label}
          </div>
          <div className="space-y-1">
            {payload.map((entry: any) => (
              <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span>{entry.name}:</span>
                </div>
                <span className="font-mono font-medium text-white">
                  {isPercentage ? formatPercent(entry.value, 1) : `${formatNumber(entry.value, 1)} ${unit}`}
                </span>
              </div>
            ))}
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
        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 self-start sm:self-auto">
          Unit: {unit}
        </span>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: -5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="year"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(v) => isPercentage ? `${v}%` : `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: 16, fontSize: 12 }}
              formatter={(value) => <span className="text-slate-700 text-xs">{value}</span>}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={s.strokeWidth || 2}
                dot={{ r: 3, fill: s.color, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Reporting timeframe: 2015–2024</span>
        <span className="font-mono text-amber-800">Demonstration dataset</span>
      </div>
    </div>
  );
};
