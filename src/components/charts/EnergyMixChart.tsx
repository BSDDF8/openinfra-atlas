import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { FuelMixRecord } from '../../types/energy';
import { formatNumber } from '../../utils/formatters';

interface EnergyMixChartProps {
  data: FuelMixRecord[];
  countryName: string;
  height?: number;
}

export const EnergyMixChart: React.FC<EnergyMixChartProps> = ({
  data,
  countryName,
  height = 360
}) => {
  const FUEL_SERIES = [
    { key: 'coal', name: 'Coal', color: '#334155' },
    { key: 'gas', name: 'Natural Gas', color: '#64748b' },
    { key: 'nuclear', name: 'Nuclear', color: '#7c3aed' },
    { key: 'hydro', name: 'Hydropower', color: '#0284c7' },
    { key: 'wind', name: 'Wind', color: '#0d9488' },
    { key: 'solar', name: 'Solar PV', color: '#d97706' },
    { key: 'bioenergy', name: 'Bioenergy & Other', color: '#16a34a' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + (Number(entry.value) || 0), 0);
      return (
        <div className="bg-slate-900 border border-slate-700 text-white rounded p-3 text-xs shadow-lg font-sans">
          <div className="font-semibold text-slate-300 border-b border-slate-700 pb-1 mb-2 flex justify-between gap-4">
            <span>{countryName} — {label}</span>
            <span className="font-mono text-white font-bold">{formatNumber(total, 0)} TWh</span>
          </div>
          <div className="space-y-1">
            {payload.slice().reverse().map((entry: any) => {
              const val = Number(entry.value) || 0;
              const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';
              return (
                <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}:</span>
                  </div>
                  <span className="font-mono font-medium text-white">
                    {formatNumber(val, 1)} TWh ({pct}%)
                  </span>
                </div>
              );
            })}
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
          <h3 className="text-sm font-semibold text-slate-900">
            Electricity Generation Mix Evolution ({data.length > 0 ? `${data[0].year}–${data[data.length - 1].year}` : ''})
          </h3>
          <p className="text-xs text-slate-500">
            Annual electricity generation disaggregated by primary generation technology (TWh).
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 self-start sm:self-auto">
          Unit: TWh
        </span>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: 16, fontSize: 12 }}
              formatter={(value) => <span className="text-slate-700 text-xs">{value}</span>}
            />
            {FUEL_SERIES.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stackId="1"
                stroke={s.color}
                fill={s.color}
                fillOpacity={0.85}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Source: Synthesized from IEA & national system telemetry</span>
        <span className="font-mono text-amber-800">Demonstration dataset</span>
      </div>
    </div>
  );
};
