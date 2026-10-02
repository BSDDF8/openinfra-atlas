import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, BarChart2, Globe, BookOpen, Layers, ShieldCheck, Download } from 'lucide-react';
import { DataService } from '../services/dataService';
import { StatCard } from '../components/common/StatCard';
import { HistoricalTrendChart } from '../components/charts/HistoricalTrendChart';
import { CsvService } from '../services/csvService';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const countries = DataService.getCountries();
  const globalOverview = DataService.getGlobalOverviewHeadline();

  // Search submit handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Comparative snapshot chart data (Solar capacity trends across US, China, India, Germany)
  const comparisonData = DataService.getMultiCountryComparison(
    ['china', 'united-states', 'germany', 'india'],
    'solar_capacity'
  );

  const solarSeries = [
    { key: 'china', name: 'China', color: '#dc2626', strokeWidth: 2.5 },
    { key: 'united-states', name: 'United States', color: '#2563eb', strokeWidth: 2 },
    { key: 'germany', name: 'Germany', color: '#059669', strokeWidth: 2 },
    { key: 'india', name: 'India', color: '#ea580c', strokeWidth: 2.5 }
  ];

  return (
    <div className="space-y-10">
      {/* 1. Restrained Editorial Header */}
      <section className="border-b border-slate-200 pb-8 pt-2">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Public Infrastructure Intelligence Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Open infrastructure data, explained.
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Explore energy capacity, electricity generation and infrastructure trends using transparent public data.
            Built for policy analysts, electrical engineers, researchers, and public accountability.
          </p>

          {/* Prominent Search/Exploration Control */}
          <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries (e.g. India, Germany), indicators (e.g. Solar, Wind), or fuel mix..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Explore Data</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="font-medium text-slate-600">Quick explore:</span>
            <Link to="/countries/india" className="text-brand-700 hover:underline">India</Link>
            <span>&bull;</span>
            <Link to="/countries/united-states" className="text-brand-700 hover:underline">United States</Link>
            <span>&bull;</span>
            <Link to="/countries/germany" className="text-brand-700 hover:underline">Germany</Link>
            <span>&bull;</span>
            <Link to="/explore?indicator=solar_capacity" className="text-brand-700 hover:underline">Solar Capacity</Link>
            <span>&bull;</span>
            <Link to="/compare" className="text-brand-700 hover:underline">Compare 4 Nations</Link>
          </div>
        </div>
      </section>

      {/* 2. Global Headline Indicators (All with visible source, year, and demonstration tag) */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-700" />
              Monitored Economies Overview ({globalOverview.year})
            </h2>
            <p className="text-xs text-slate-500">
              Aggregated annual electricity metrics across {globalOverview.economiesCovered} major economic regions.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded">
            Coverage: G20 Benchmark Cohort
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Electricity Generation"
            value={globalOverview.totalGenerationTWh}
            unit="TWh"
            year={globalOverview.year}
            source="IEA / Ember synthesized model"
          />
          <StatCard
            label="Renewable Generation Share"
            value={globalOverview.renewableSharePercent}
            unit="%"
            isPercentage
            year={globalOverview.year}
            source="Ember Global Electricity Review"
          />
          <StatCard
            label="Installed Solar PV Capacity"
            value={globalOverview.solarCapacityGW}
            unit="GW"
            year={globalOverview.year}
            source="IRENA Capacity Statistics"
          />
          <StatCard
            label="Installed Wind Power Capacity"
            value={globalOverview.windCapacityGW}
            unit="GW"
            year={globalOverview.year}
            source="Global Wind Energy Council (GWEC)"
          />
        </div>
      </section>

      {/* 3. Featured Analytical Chart: Solar Acceleration */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HistoricalTrendChart
            data={comparisonData.trendData}
            series={solarSeries}
            title="Solar Photovoltaic Nameplate Capacity Trajectory (2015–2024)"
            subtitle="Comparing cumulative operational solar capacity (GW) across China, the United States, Germany, and India."
            unit="GW"
            height={340}
          />
        </div>

        {/* Quick Analytical Findings & Context */}
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-800 uppercase tracking-wider mb-2">
              <BarChart2 className="w-3.5 h-3.5" />
              Key Observation
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Exponential Solar Inflexion
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Between 2015 and 2024, cumulative solar PV deployment expanded at an unprecedented pace. China added over 800 GW of nameplate capacity, while India expanded operational capacity by more than 13x.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">China 2024:</span>
                <span className="font-mono font-bold text-slate-900">880.0 GW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">United States 2024:</span>
                <span className="font-mono font-bold text-slate-900">178.5 GW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Germany 2024:</span>
                <span className="font-mono font-bold text-slate-900">94.2 GW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">India 2024:</span>
                <span className="font-mono font-bold text-slate-900">90.8 GW</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/insights/solar-capacity-expansion"
              className="text-xs font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1"
            >
              Read Full Solar Analysis <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-mono">
              Demo dataset
            </span>
          </div>
        </div>
      </section>

      {/* 4. Country Matrix: Direct Explorer Access */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Country Infrastructure Profiles
            </h2>
            <p className="text-xs text-slate-500">
              Select a nation to inspect complete fuel mix evolution, nameplate capacity records, and grid provenance.
            </p>
          </div>
          <Link
            to="/countries"
            className="text-xs font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1"
          >
            All Countries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {countries.map((c) => {
            const profile = DataService.getCountryProfile(c.id);
            if (!profile) return null;
            return (
              <Link
                key={c.id}
                to={`/countries/${c.id}`}
                className="bg-white border border-slate-200 rounded p-4 shadow-sm hover:border-slate-400 hover:shadow transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900 group-hover:text-brand-800 transition-colors">
                      {c.name}
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {c.iso3}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    {c.region} &bull; {c.populationMillions}M pop
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Generation (2024):</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {profile.latestStats.totalGenerationTWh} TWh
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Renewable Share:</span>
                      <span className="font-mono font-semibold text-emerald-700">
                        {profile.latestStats.renewableSharePercent}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Solar + Wind Cap:</span>
                      <span className="font-mono font-semibold text-slate-800">
                        {(profile.latestStats.solarCapacityGW + profile.latestStats.windCapacityGW).toFixed(1)} GW
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-brand-700 group-hover:text-brand-900 font-medium">
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Platform Architecture & Data Transparency Block */}
      <section className="bg-slate-100 border border-slate-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Transparent Methodology
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every indicator adheres to standardized definitions separating energy production (TWh) from rated capacity (GW).
            </p>
            <Link to="/methodology" className="text-xs text-brand-700 font-medium hover:underline inline-block">
              Read accounting standards &rarr;
            </Link>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
              <Layers className="w-4 h-4 text-brand-700" />
              Decoupled Data Architecture
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Data models are abstracted via service interfaces ready for real-time connection to EIA v2, Ember, or IRENA REST APIs.
            </p>
            <Link to="/about" className="text-xs text-brand-700 font-medium hover:underline inline-block">
              Inspect technical architecture &rarr;
            </Link>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
              <Download className="w-4 h-4 text-slate-700" />
              Open Data Export
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Download clean RFC 4180 CSV tables directly from the explorer without login walls, tracking scripts, or rate limits.
            </p>
            <button
              onClick={() => CsvService.downloadRecords(DataService.queryRecords({
                indicatorId: 'electricity_generation',
                countryIds: [],
                year: 'all',
                searchQuery: '',
                sortBy: 'year',
                sortOrder: 'desc',
                viewMode: 'table'
              }), 'openinfra_atlas_global_sample.csv')}
              className="text-xs text-brand-700 font-medium hover:underline inline-flex items-center gap-1"
            >
              Export sample dataset (.csv) &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
