import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, X, Download, ArrowUpDown, Layers, BarChart2 } from 'lucide-react';
import { DataService } from '../services/dataService';
import { CsvService } from '../services/csvService';
import { MultiCountryBarChart } from '../components/charts/MultiCountryBarChart';
import { HistoricalTrendChart } from '../components/charts/HistoricalTrendChart';
import { ComparisonTable } from '../components/tables/ComparisonTable';
import { Button } from '../components/common/Button';
import { formatNumber, formatPercent } from '../utils/formatters';

const DEFAULT_COMPARISON_COUNTRIES = ['india', 'united-states', 'germany', 'china'];

export const ComparePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const c1 = searchParams.get('c1');
  const c2 = searchParams.get('c2');
  const c3 = searchParams.get('c3');
  const c4 = searchParams.get('c4');

  const initialCountries = useMemo(() => {
    const list = [c1, c2, c3, c4].filter(Boolean) as string[];
    return list.length >= 2 ? list : DEFAULT_COMPARISON_COUNTRIES;
  }, [c1, c2, c3, c4]);

  const allCountries = DataService.getCountries();
  const allIndicators = DataService.getIndicators();
  const availableYears = DataService.getAvailableYears();

  const [selectedCountries, setSelectedCountries] = useState<string[]>(initialCountries);
  const [selectedIndicator, setSelectedIndicator] = useState<string>('renewable_share');
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  // Active indicator object
  const currentIndicator = useMemo(() => {
    return DataService.getIndicator(selectedIndicator) || allIndicators[0];
  }, [selectedIndicator, allIndicators]);

  // Selected Country objects
  const activeCountryObjects = useMemo(() => {
    return selectedCountries
      .map((id) => DataService.getCountry(id))
      .filter(Boolean) as typeof allCountries;
  }, [selectedCountries]);

  // Add country
  const handleAddCountry = (id: string) => {
    if (selectedCountries.length < 4 && !selectedCountries.includes(id)) {
      setSelectedCountries([...selectedCountries, id]);
    }
  };

  // Remove country
  const handleRemoveCountry = (id: string) => {
    if (selectedCountries.length > 2) {
      setSelectedCountries(selectedCountries.filter((c) => c !== id));
    }
  };

  // Colors for multi-line comparison chart
  const countryColorPalette: Record<string, string> = {
    'india': '#ea580c',
    'united-states': '#2563eb',
    'china': '#dc2626',
    'germany': '#059669',
    'japan': '#7c3aed',
    'brazil': '#16a34a',
    'united-kingdom': '#0284c7',
    'france': '#4f46e5'
  };

  const chartSeriesConfigs = useMemo(() => {
    return activeCountryObjects.map((c) => ({
      key: c.id,
      name: c.name,
      color: countryColorPalette[c.id] || '#334155',
      strokeWidth: 2.5
    }));
  }, [activeCountryObjects]);

  // Trend Chart Data
  const comparisonData = useMemo(() => {
    return DataService.getMultiCountryComparison(selectedCountries, selectedIndicator);
  }, [selectedCountries, selectedIndicator]);

  // Bar Chart Data (Snapshot for selected year)
  const barChartData = useMemo(() => {
    return activeCountryObjects.map((c) => {
      const timeSeries = DataService.getCountryTimeSeries(c.id, selectedIndicator);
      const match = timeSeries.find((pt) => pt.year === selectedYear);
      return {
        countryId: c.id,
        countryName: c.name,
        value: match ? match.value : 0,
        unit: currentIndicator.unit
      };
    });
  }, [activeCountryObjects, selectedIndicator, selectedYear, currentIndicator]);

  // Download Comparison CSV
  const handleDownloadComparisonCsv = () => {
    const headers = ['Indicator', 'Unit', ...activeCountryObjects.map((c) => c.name)];
    const rows = allIndicators.map((ind) => {
      const rowData: (string | number)[] = [ind.name, ind.unit];
      activeCountryObjects.forEach((c) => {
        const timeSeries = DataService.getCountryTimeSeries(c.id, ind.id);
        const match = timeSeries.find((pt) => pt.year === selectedYear);
        rowData.push(match ? match.value : '—');
      });
      return rowData;
    });

    CsvService.downloadCustomTable(
      headers,
      rows,
      `openinfra_country_comparison_${selectedYear}.csv`
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Multi-Country Infrastructure Comparison
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Evaluate capacity, generation, and decarbonization paths side-by-side across 2 to 4 sovereign power systems.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleDownloadComparisonCsv}
          icon={<Download className="w-3.5 h-3.5" />}
        >
          Download Comparison CSV
        </Button>
      </div>

      {/* Country Selection Tray */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
            Selected Economies ({selectedCountries.length}/4)
          </div>
          <span className="text-[11px] text-slate-500">
            Minimum 2, maximum 4 countries for visual legibility
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activeCountryObjects.map((c) => (
            <div
              key={c.id}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded text-xs font-medium shadow-sm"
            >
              <span>{c.name}</span>
              <span className="font-mono text-[10px] text-slate-400">({c.iso3})</span>
              {selectedCountries.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCountry(c.id)}
                  className="hover:text-red-300 transition-colors p-0.5"
                  title={`Remove ${c.name}`}
                  aria-label={`Remove ${c.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}

          {/* Add Country Dropdown if < 4 */}
          {selectedCountries.length < 4 && (
            <div className="inline-flex items-center">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddCountry(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="text-xs bg-slate-50 border border-dashed border-slate-300 text-slate-700 px-3 py-1.5 rounded hover:bg-slate-100 cursor-pointer focus:outline-none"
              >
                <option value="" disabled>
                  + Add another country...
                </option>
                {allCountries
                  .filter((c) => !selectedCountries.includes(c.id))
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.iso3})
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Metric & Year Focus Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Comparison Metric
            </label>
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              className="text-xs bg-white border border-slate-300 rounded px-3 py-1.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20"
            >
              {allIndicators.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.name} ({ind.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Focus Year (Snapshot)
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="text-xs bg-white border border-slate-300 rounded px-3 py-1.5 text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-brand-700/20"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500 max-w-sm">
          <strong className="text-slate-700">Indicator Formula:</strong> {currentIndicator.calculationMethod || 'Operational sum.'}
        </div>
      </div>

      {/* Charts Grid: Multi-line 10-Year Historical Trajectory & Grouped Bar Snapshot */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <HistoricalTrendChart
            data={comparisonData.trendData}
            series={chartSeriesConfigs}
            title={`${currentIndicator.name}: Historical Trajectory (2015–2024)`}
            subtitle="Comparing long-term performance across selected jurisdictions."
            unit={currentIndicator.unit}
            isPercentage={currentIndicator.unit === '%'}
            height={360}
          />
        </div>

        <div>
          <MultiCountryBarChart
            data={barChartData}
            title={`${currentIndicator.name}: Cross-Country Snapshot (${selectedYear})`}
            subtitle={`Direct comparison for reporting year ${selectedYear}.`}
            unit={currentIndicator.unit}
            year={selectedYear}
            isPercentage={currentIndicator.unit === '%'}
            height={360}
          />
        </div>
      </section>

      {/* Side-by-Side Comprehensive Matrix Table */}
      <section className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <h3 className="text-sm font-semibold text-slate-900">
            Comprehensive System Indicators Matrix ({selectedYear})
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            Source: Demonstration public reporting framework
          </span>
        </div>

        <ComparisonTable
          countries={activeCountryObjects}
          indicators={allIndicators}
          year={selectedYear}
        />
      </section>

      {/* Neutral Analytical Note */}
      <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs text-slate-600 leading-relaxed">
        <strong className="text-slate-800">Analytical Note:</strong> OpenInfra Atlas presents indicators objectively without composite rankings or arbitrary scoring. Variations in renewable shares and emissions intensity reflect differing geographic natural endowments (such as hydro resources in Brazil vs. solar irradiance in India), historical baseload choices (such as nuclear infrastructure in France), and differing industrial load densities.
      </div>
    </div>
  );
};
