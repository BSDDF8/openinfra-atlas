import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Globe,
  Zap,
  Download,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DataService } from '../services/dataService';
import { CsvService } from '../services/csvService';
import { StatCard } from '../components/common/StatCard';
import { EnergyMixChart } from '../components/charts/EnergyMixChart';
import { HistoricalTrendChart } from '../components/charts/HistoricalTrendChart';
import { DataTable } from '../components/tables/DataTable';
import { Button } from '../components/common/Button';
import { formatNumber, formatPercent } from '../utils/formatters';

export const CountryDetailPage: React.FC = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();

  const allCountries = DataService.getCountries();
  const profile = useMemo(() => {
    return countryId ? DataService.getCountryProfile(countryId) : null;
  }, [countryId]);

  if (!profile) {
    return (
      <div className="border border-slate-200 bg-white rounded-lg p-10 text-center max-w-lg mx-auto my-12 shadow-sm">
        <Globe className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Country Not Found
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          The requested identifier "{countryId}" does not exist in our monitored catalog of infrastructure profiles.
        </p>
        <Link
          to="/countries"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Countries Directory</span>
        </Link>
      </div>
    );
  }

  const { country, latestStats, fuelMixHistory, timeSeries, latestYear, dataSources } = profile;

  // Flatten country records for data table and CSV download
  const countryTableRecords = useMemo(() => {
    return DataService.queryRecords({
      indicatorId: 'electricity_generation',
      countryIds: [country.id],
      year: 'all',
      searchQuery: '',
      sortBy: 'year',
      sortOrder: 'desc',
      viewMode: 'table'
    });
  }, [country.id]);

  // Capacity trend chart configuration
  const capacityTrendData = useMemo(() => {
    const solarSeries = timeSeries['solar_capacity'] || [];
    const windSeries = timeSeries['wind_capacity'] || [];
    const hydroSeries = timeSeries['hydro_capacity'] || [];

    const map: Record<number, any> = {};
    solarSeries.forEach((pt) => {
      map[pt.year] = { year: pt.year, solar: pt.value };
    });
    windSeries.forEach((pt) => {
      if (map[pt.year]) map[pt.year].wind = pt.value;
      else map[pt.year] = { year: pt.year, wind: pt.value };
    });
    hydroSeries.forEach((pt) => {
      if (map[pt.year]) map[pt.year].hydro = pt.value;
      else map[pt.year] = { year: pt.year, hydro: pt.value };
    });

    return Object.values(map).sort((a, b) => a.year - b.year);
  }, [timeSeries]);

  const capacitySeriesConfigs = [
    { key: 'solar', name: 'Solar PV Capacity', color: '#d97706', strokeWidth: 2 },
    { key: 'wind', name: 'Wind Capacity', color: '#0d9488', strokeWidth: 2 },
    { key: 'hydro', name: 'Hydropower Capacity', color: '#0284c7', strokeWidth: 2 }
  ];

  // Export Country Time Series
  const handleExportCountry = () => {
    const filename = `openinfra_${country.id}_infrastructure_profile.csv`;
    // Fetch all indicators for this country
    const allCountryRecords = DataService.getIndicators().flatMap((ind) =>
      DataService.queryRecords({
        indicatorId: ind.id,
        countryIds: [country.id],
        year: 'all',
        searchQuery: '',
        sortBy: 'year',
        sortOrder: 'asc',
        viewMode: 'table'
      })
    );
    CsvService.downloadRecords(allCountryRecords, filename);
  };

  return (
    <div className="space-y-8">
      {/* Header and Country Switcher */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <Link
            to="/countries"
            className="text-xs font-medium text-slate-500 hover:text-slate-800 inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Countries</span>
          </Link>

          {/* Quick Country Switcher */}
          <div className="flex items-center gap-2">
            <label htmlFor="country-switcher" className="text-xs text-slate-500 font-medium">
              Switch profile:
            </label>
            <select
              id="country-switcher"
              value={country.id}
              onChange={(e) => navigate(`/countries/${e.target.value}`)}
              className="text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
            >
              {allCountries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.iso3})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {country.name}
              </h1>
              <span className="font-mono text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                ISO: {country.iso3}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {country.incomeGroup}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                Region: <strong className="font-medium text-slate-800">{country.region}</strong> ({country.subregion})
              </span>
              <span>&bull;</span>
              <span>Population: <strong className="font-mono text-slate-800">{country.populationMillions}M</strong></span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Grid System: <strong className="font-medium text-slate-800">{country.majorGridSystem}</strong> ({country.gridFrequencyHz} Hz)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/compare?c1=${country.id}&c2=united-states`}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Compare with US</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportCountry}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Download Country Dataset (.csv)
            </Button>
          </div>
        </div>
      </div>

      {/* Headline Overview KPIs */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Current Infrastructure & Generation Baseline ({latestYear})
          </h2>
          <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
            Demonstration dataset
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard
            label="Total Generation"
            value={latestStats.totalGenerationTWh}
            unit="TWh"
            year={latestYear}
            source="IEA / National TSO"
          />
          <StatCard
            label="Renewable Share"
            value={latestStats.renewableSharePercent}
            unit="%"
            isPercentage
            year={latestYear}
            source="Derived Standard"
          />
          <StatCard
            label="Solar Capacity"
            value={latestStats.solarCapacityGW}
            unit="GW"
            year={latestYear}
            source="IRENA Statistics"
          />
          <StatCard
            label="Wind Capacity"
            value={latestStats.windCapacityGW}
            unit="GW"
            year={latestYear}
            source="GWEC / IRENA"
          />
          <StatCard
            label="Hydro Capacity"
            value={latestStats.hydroCapacityGW}
            unit="GW"
            year={latestYear}
            source="IHA / IRENA"
          />
          <StatCard
            label="Nuclear Generation"
            value={latestStats.nuclearGenerationTWh}
            unit="TWh"
            year={latestYear}
            source="IAEA PRIS"
          />
        </div>
      </section>

      {/* Visualizations: Fuel Mix Stacked Chart & Capacity Growth */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <EnergyMixChart
            data={fuelMixHistory}
            countryName={country.name}
            height={360}
          />
        </div>

        <div>
          <HistoricalTrendChart
            data={capacityTrendData}
            series={capacitySeriesConfigs}
            title={`${country.name}: Renewable Capacity Trajectory (2015–2024)`}
            subtitle="Installed operational capacity in Gigawatts (GW) across non-fossil assets."
            unit="GW"
            height={360}
          />
        </div>
      </section>

      {/* Key Indicators Historical Ledger */}
      <section className="bg-white border border-slate-200 rounded p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Fuel Breakdown & System Indicators (2015–2024)
            </h3>
            <p className="text-xs text-slate-500">
              Complete historical annual balance for {country.name} disaggregated by primary generation fuels.
            </p>
          </div>
          <button
            onClick={handleExportCountry}
            className="text-xs text-brand-700 hover:text-brand-900 font-medium inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Table (.csv)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[11px]">
                <th className="py-2.5 px-3">Year</th>
                <th className="py-2.5 px-3 text-right">Coal (TWh)</th>
                <th className="py-2.5 px-3 text-right">Gas (TWh)</th>
                <th className="py-2.5 px-3 text-right">Nuclear (TWh)</th>
                <th className="py-2.5 px-3 text-right">Hydro (TWh)</th>
                <th className="py-2.5 px-3 text-right">Wind (TWh)</th>
                <th className="py-2.5 px-3 text-right">Solar (TWh)</th>
                <th className="py-2.5 px-3 text-right font-bold text-slate-900">Total (TWh)</th>
                <th className="py-2.5 px-3 text-right font-bold text-emerald-800">Renewable %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {fuelMixHistory.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-3 font-sans font-medium text-slate-900">{row.year}</td>
                  <td className="py-2 px-3 text-right text-slate-600">{formatNumber(row.coal, 1)}</td>
                  <td className="py-2 px-3 text-right text-slate-600">{formatNumber(row.gas, 1)}</td>
                  <td className="py-2 px-3 text-right text-purple-700">{formatNumber(row.nuclear, 1)}</td>
                  <td className="py-2 px-3 text-right text-sky-700">{formatNumber(row.hydro, 1)}</td>
                  <td className="py-2 px-3 text-right text-teal-700">{formatNumber(row.wind, 1)}</td>
                  <td className="py-2 px-3 text-right text-amber-700">{formatNumber(row.solar, 1)}</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{formatNumber(row.total, 1)}</td>
                  <td className="py-2 px-3 text-right font-bold text-emerald-700">{formatPercent(row.renewableShare, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources & Methodology Provenance Section */}
      <section className="bg-slate-50 border border-slate-200 rounded p-5 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Data Provenance & Source Attribution for {country.name}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The indicators presented above for {country.name} adhere to international energy accounting conventions. Data points are aggregated annually and normalized to gross terawatt-hours (TWh) and gigawatts (GW).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataSources.map((ds) => (
            <div key={ds.datasetName} className="bg-white border border-slate-200 rounded p-3 text-xs space-y-1 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{ds.datasetName}</span>
                <span className="font-mono text-[10px] text-slate-500">{ds.temporalCoverage}</span>
              </div>
              <div className="text-slate-600 text-[11px]">Provider: <strong>{ds.provider}</strong></div>
              <p className="text-slate-500 text-[11px] leading-normal">{ds.methodologySummary}</p>
              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">License: {ds.license}</span>
                <a
                  href={ds.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-900 inline-flex items-center gap-1 font-medium"
                >
                  Source <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
