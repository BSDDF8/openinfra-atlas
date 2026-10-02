import React from 'react';
import { Country, Indicator } from '../../types/energy';
import { ALL_ENERGY_RECORDS } from '../../data/energyData';
import { formatNumber, formatPercent } from '../../utils/formatters';

interface ComparisonTableProps {
  countries: Country[];
  indicators: Indicator[];
  year: number;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  countries,
  indicators,
  year
}) => {
  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded shadow-sm bg-white">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
            <th className="py-3 px-4 w-1/3">Infrastructure Indicator</th>
            <th className="py-3 px-3 text-center w-20">Unit</th>
            {countries.map((c) => (
              <th key={c.id} className="py-3 px-4 text-right">
                <span className="font-semibold text-slate-900 block">{c.name}</span>
                <span className="text-[10px] text-slate-400 font-mono font-normal">ISO: {c.iso3}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-mono">
          {indicators.map((ind) => {
            const isPct = ind.unit === '%';
            return (
              <tr key={ind.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-sans font-medium text-slate-800">
                  <div className="font-medium text-slate-900">{ind.name}</div>
                  <div className="text-[11px] text-slate-500 font-normal truncate max-w-sm">
                    {ind.description}
                  </div>
                </td>
                <td className="py-3 px-3 text-center text-slate-500 text-[11px] uppercase">
                  {ind.unit}
                </td>
                {countries.map((c) => {
                  const record = ALL_ENERGY_RECORDS.find(
                    (r) => r.countryId === c.id && r.indicatorId === ind.id && r.year === year
                  );
                  const val = record ? record.value : undefined;
                  return (
                    <td key={c.id} className="py-3 px-4 text-right tabular-nums text-slate-900 font-bold">
                      {val !== undefined ? (isPct ? formatPercent(val, 1) : formatNumber(val, 1)) : '—'}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
