import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Zap, Globe, Layers } from 'lucide-react';
import { DataService } from '../services/dataService';
import { SearchInput } from '../components/common/SearchInput';
import { formatNumber, formatPercent } from '../utils/formatters';

export const CountriesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const countries = DataService.getCountries();

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.iso3.toLowerCase().includes(query.toLowerCase()) ||
      c.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Country & Regional Profiles
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Standardized infrastructure profiles, fuel mix breakdowns, and historical decarbonization trajectories.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search countries, regions, ISO codes..."
          />
        </div>
      </div>

      {/* Country Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCountries.map((c) => {
          const profile = DataService.getCountryProfile(c.id);
          if (!profile) return null;

          return (
            <div
              key={c.id}
              className="bg-white border border-slate-200 rounded p-4 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base text-slate-900">
                    {c.name}
                  </h3>
                  <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {c.iso3}
                  </span>
                </div>

                <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.region} &bull; {c.populationMillions}M pop</span>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Total Generation:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {formatNumber(profile.latestStats.totalGenerationTWh, 0)} TWh
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Renewable Share:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {formatPercent(profile.latestStats.renewableSharePercent, 1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Solar Capacity:</span>
                    <span className="font-mono font-medium text-amber-700">
                      {formatNumber(profile.latestStats.solarCapacityGW, 1)} GW
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Wind Capacity:</span>
                    <span className="font-mono font-medium text-teal-700">
                      {formatNumber(profile.latestStats.windCapacityGW, 1)} GW
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Emissions Intensity:</span>
                    <span className="font-mono font-medium text-slate-700">
                      {profile.latestStats.emissionsIntensityGCO2} gCO₂/kWh
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Grid: {c.gridFrequencyHz} Hz
                </span>
                <Link
                  to={`/countries/${c.id}`}
                  className="text-xs font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1"
                >
                  View Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCountries.length === 0 && (
        <div className="bg-white border border-slate-200 rounded p-8 text-center text-xs text-slate-500">
          No countries found matching "{query}". Try clearing the search.
        </div>
      )}

      {/* Grid Architecture Reference Note */}
      <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs text-slate-600 flex items-start gap-3">
        <Zap className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-slate-900">National Grid Integration Context</div>
          <p className="leading-relaxed">
            All country profiles represent synchronized national interconnection domains. Off-grid captive generation and localized microgrids are reported only when aggregated into national regulatory transmission statistics.
          </p>
        </div>
      </div>
    </div>
  );
};
