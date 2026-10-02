import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnergyDataRecord } from '../../types/energy';
import { formatNumber, formatPercent } from '../../utils/formatters';

interface DataTableProps {
  records: EnergyDataRecord[];
  sortBy?: 'country' | 'year' | 'value';
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (field: 'country' | 'year' | 'value') => void;
  showCountryLink?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  records,
  sortBy = 'country',
  sortOrder = 'asc',
  onSortChange,
  showCountryLink = true
}) => {
  const renderSortIcon = (field: 'country' | 'year' | 'value') => {
    if (!onSortChange) return null;
    if (sortBy !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 ml-1 inline" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-brand-700 ml-1 inline" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-brand-700 ml-1 inline" />
    );
  };

  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded shadow-sm bg-white">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
            <th
              className="py-3 px-4 cursor-pointer hover:bg-slate-100 group select-none transition-colors"
              onClick={() => onSortChange && onSortChange('country')}
            >
              <div className="flex items-center">
                <span>Country / Territory</span>
                {renderSortIcon('country')}
              </div>
            </th>
            <th className="py-3 px-4 hidden sm:table-cell">Indicator</th>
            <th
              className="py-3 px-4 cursor-pointer hover:bg-slate-100 group select-none transition-colors"
              onClick={() => onSortChange && onSortChange('year')}
            >
              <div className="flex items-center">
                <span>Year</span>
                {renderSortIcon('year')}
              </div>
            </th>
            <th
              className="py-3 px-4 text-right cursor-pointer hover:bg-slate-100 group select-none transition-colors"
              onClick={() => onSortChange && onSortChange('value')}
            >
              <div className="flex items-center justify-end">
                <span>Value</span>
                {renderSortIcon('value')}
              </div>
            </th>
            <th className="py-3 px-4 text-left">Unit</th>
            <th className="py-3 px-4 hidden md:table-cell">Source Standard</th>
            <th className="py-3 px-4 hidden lg:table-cell text-center">Dataset</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-mono">
          {records.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-slate-500 font-sans italic">
                No matching records found.
              </td>
            </tr>
          ) : (
            records.map((r) => {
              const isPct = r.unit === '%';
              return (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-900 whitespace-nowrap">
                    {showCountryLink ? (
                      <Link
                        to={`/countries/${r.countryId}`}
                        className="text-brand-800 hover:text-brand-950 hover:underline inline-flex items-center gap-1.5"
                      >
                        {r.countryName}
                        <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100" />
                      </Link>
                    ) : (
                      r.countryName
                    )}
                  </td>
                  <td className="py-2.5 px-4 font-sans text-slate-600 hidden sm:table-cell whitespace-nowrap">
                    {r.indicatorName}
                  </td>
                  <td className="py-2.5 px-4 text-slate-700 whitespace-nowrap">
                    {r.year}
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900 whitespace-nowrap tabular-nums">
                    {isPct ? formatPercent(r.value, 1) : formatNumber(r.value, 1)}
                  </td>
                  <td className="py-2.5 px-4 text-slate-500 uppercase text-[11px] whitespace-nowrap">
                    {r.unit}
                  </td>
                  <td className="py-2.5 px-4 font-sans text-slate-500 text-[11px] hidden md:table-cell truncate max-w-xs" title={r.source}>
                    {r.source}
                  </td>
                  <td className="py-2.5 px-4 text-center hidden lg:table-cell">
                    <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200/60 font-sans px-1.5 py-0.5 rounded font-medium">
                      Demo data
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
