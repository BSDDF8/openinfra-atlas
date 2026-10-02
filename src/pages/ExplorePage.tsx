import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Table as TableIcon,
  BarChart2,
  Download,
  Share2,
  Check,
  Filter,
  X,
  RefreshCw
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { CsvService } from '../services/csvService';
import { DataTable } from '../components/tables/DataTable';
import { HistoricalTrendChart } from '../components/charts/HistoricalTrendChart';
import { MultiCountryBarChart } from '../components/charts/MultiCountryBarChart';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { SearchInput } from '../components/common/SearchInput';
import { ExplorerFilters } from '../types/filters';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Sync
  const initialIndicator = searchParams.get('indicator') || 'electricity_generation';
  const initialCountry = searchParams.get('country') || '';
  const initialQuery = searchParams.get('q') || '';

  const indicators = DataService.getIndicators();
  const countries = DataService.getCountries();
  const availableYears = DataService.getAvailableYears();

  // Filters State
  const [selectedIndicator, setSelectedIndicator] = useState<string>(initialIndicator);
  const [selectedCountryIds, setSelectedCountryIds] = useState<string[]>(
    initialCountry ? [initialCountry] : []
  );
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [sortBy, setSortBy] = useState<'country' | 'year' | 'value'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [copiedLink, setCopiedLink] = useState(false);

  // Active Indicator object
  const currentIndicator = useMemo(() => {
    return DataService.getIndicator(selectedIndicator) || indicators[0];
  }, [selectedIndicator, indicators]);

  // Query records using DataService
  const filteredRecords = useMemo(() => {
    const filters: ExplorerFilters = {
      indicatorId: selectedIndicator,
      countryIds: selectedCountryIds,
      year: selectedYear,
      searchQuery,
      sortBy,
      sortOrder,
      viewMode
    };
    return DataService.queryRecords(filters);
  }, [selectedIndicator, selectedCountryIds, selectedYear, searchQuery, sortBy, sortOrder, viewMode]);

  // Handle Sort Change
  const handleSortChange = (field: 'country' | 'year' | 'value') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(field === 'value' ? 'desc' : 'asc');
    }
  };

  // Toggle Country in multi-select
  const toggleCountry = (countryId: string) => {
    if (selectedCountryIds.includes(countryId)) {
      setSelectedCountryIds(selectedCountryIds.filter((id) => id !== countryId));
    } else {
      setSelectedCountryIds([...selectedCountryIds, countryId]);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedIndicator('electricity_generation');
    setSelectedCountryIds([]);
    setSelectedYear('all');
    setSearchQuery('');
    setSortBy('year');
    setSortOrder('desc');
    setSearchParams({});
  };

  // Export CSV
  const handleDownloadCsv = () => {
    const filename = `openinfra_${selectedIndicator}_${selectedYear}_export.csv`;
    CsvService.downloadRecords(filteredRecords, filename);
  };

  // Share URL
  const handleShareUrl = () => {
    const params = new URLSearchParams();
    params.set('indicator', selectedIndicator);
    if (selectedCountryIds.length === 1) {
      params.set('country', selectedCountryIds[0]);
    }
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Chart data preparation
  const chartSeries = useMemo(() => {
    const targetCountryIds = selectedCountryIds.length > 0
      ? selectedCountryIds
      : countries.slice(0, 4).map((c) => c.id);

    const colors = ['#0f3d68', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0284c7', '#ea580c', '#64748b'];

    return targetCountryIds.map((cId, idx) => {
      const c = DataService.getCountry(cId);
      return {
        key: cId,
        name: c ? c.name : cId,
        color: colors[idx % colors.length],
        strokeWidth: 2
      };
    });
  }, [selectedCountryIds, countries]);

  const trendChartData = useMemo(() => {
    const targetCountryIds = selectedCountryIds.length > 0
      ? selectedCountryIds
      : countries.slice(0, 4).map((c) => c.id);

    return availableYears.map((yr) => {
      const row: Record<string, any> = { year: yr };
      targetCountryIds.forEach((cId) => {
        const match = filteredRecords.find((r) => r.countryId === cId && r.year === yr);
        if (match) {
          row[cId] = match.value;
        }
      });
      return row;
    });
  }, [selectedCountryIds, countries, availableYears, filteredRecords]);

  const barChartData = useMemo(() => {
    const targetYear = selectedYear === 'all' ? 2024 : Number(selectedYear);
    const targetCountryIds = selectedCountryIds.length > 0
      ? selectedCountryIds
      : countries.map((c) => c.id);

    return targetCountryIds.map((cId) => {
      const country = DataService.getCountry(cId);
      const match = filteredRecords.find((r) => r.countryId === cId && r.year === targetYear);
      return {
        countryId: cId,
        countryName: country ? country.name : cId,
        value: match ? match.value : 0,
        unit: currentIndicator.unit
      };
    });
  }, [selectedYear, selectedCountryIds, countries, filteredRecords, currentIndicator]);

  return (
    <div className="space-y-6">
      {/* Page Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Infrastructure Data Explorer
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Query, filter, inspect, and export time-series metrics across power generation and capacity datasets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="inline-flex rounded border border-slate-300 p-0.5 bg-white shadow-sm">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-colors ${
                viewMode === 'table' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-colors ${
                viewMode === 'chart' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Chart View"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Chart</span>
            </button>
          </div>

          {/* Share Link */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareUrl}
            icon={copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            title="Copy sharable URL"
          >
            {copiedLink ? 'Copied Link' : 'Share'}
          </Button>

          {/* Export CSV */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleDownloadCsv}
            icon={<Download className="w-3.5 h-3.5" />}
            title="Download currently filtered table data as CSV"
          >
            Download CSV
          </Button>
        </div>
      </div>

      {/* Filter Control Matrix */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Dataset Query Parameters</span>
          </div>

          {(selectedCountryIds.length > 0 || selectedYear !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-700 hover:text-brand-900 flex items-center gap-1 font-medium"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset parameters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Indicator Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Select Indicator
            </label>
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
            >
              {indicators.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.name} ({ind.unit})
                </option>
              ))}
            </select>
          </div>

          {/* Year Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Select Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
            >
              <option value="all">All Available Years (2015–2024)</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Unit / Classification Metadata */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Measurement Unit & Category
            </label>
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs flex items-center justify-between">
              <span className="font-mono font-bold text-slate-800">
                {currentIndicator.unit}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                {currentIndicator.category}
              </span>
            </div>
          </div>

          {/* Search within filtered results */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Search Within Records
            </label>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search country name, source..."
            />
          </div>
        </div>

        {/* Country Multi-Select Pill Tray */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-medium text-slate-700">
              Filter by Country ({selectedCountryIds.length > 0 ? `${selectedCountryIds.length} selected` : 'All 8 countries'}):
            </span>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedCountryIds(countries.map((c) => c.id))}
                className="text-brand-700 hover:underline"
              >
                Select All
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setSelectedCountryIds([])}
                className="text-slate-500 hover:text-slate-800 hover:underline"
              >
                Clear Selection
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {countries.map((c) => {
              const isSelected = selectedCountryIds.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCountry(c.id)}
                  className={`text-xs px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 font-medium'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {c.iso3}
                  </span>
                  {isSelected && <X className="w-3 h-3 text-slate-300 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Indicator Definition Card */}
      <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <span className="font-semibold text-slate-900">{currentIndicator.name}:</span>{' '}
          <span className="text-slate-600">{currentIndicator.description}</span>
        </div>
        <div className="shrink-0 text-[11px] text-slate-500 font-mono">
          Method: {currentIndicator.calculationMethod || 'Direct operational aggregate'}
        </div>
      </div>

      {/* Result Display: Table or Chart */}
      {filteredRecords.length === 0 ? (
        <EmptyState
          title="No records matching current parameters"
          message="No data matches the selected indicator, country, and year combination. Try clearing your search or selecting all countries."
          actionText="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : viewMode === 'table' ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong className="text-slate-800 font-mono">{filteredRecords.length}</strong> matching observations
            </span>
            <span className="text-[11px]">
              Click column headers to sort &bull; Source: Demonstration reporting framework
            </span>
          </div>
          <DataTable
            records={filteredRecords}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* If specific year selected, show Bar Chart; else show Historical Trend Line Chart */}
          {selectedYear !== 'all' ? (
            <MultiCountryBarChart
              data={barChartData}
              title={`${currentIndicator.name} across Selected Countries`}
              subtitle={`Cross-sectional view for reporting year ${selectedYear}.`}
              unit={currentIndicator.unit}
              year={Number(selectedYear)}
              isPercentage={currentIndicator.unit === '%'}
              height={380}
            />
          ) : (
            <HistoricalTrendChart
              data={trendChartData}
              series={chartSeries}
              title={`${currentIndicator.name} Historical Trajectory (2015–2024)`}
              subtitle="Comparing historical performance across selected economies."
              unit={currentIndicator.unit}
              isPercentage={currentIndicator.unit === '%'}
              height={400}
            />
          )}

          {/* Accompanying Data Table below the chart */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              Tabular Records for Selected Visualization
            </h3>
            <DataTable
              records={filteredRecords}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};
