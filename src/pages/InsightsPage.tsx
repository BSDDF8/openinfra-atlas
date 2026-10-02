import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, ShieldCheck, BarChart2 } from 'lucide-react';
import { INSIGHTS } from '../data/insightsData';
import { DataService } from '../services/dataService';
import { HistoricalTrendChart } from '../components/charts/HistoricalTrendChart';
import { MultiCountryBarChart } from '../components/charts/MultiCountryBarChart';

export const InsightsPage: React.FC = () => {
  const [activeArticleId, setActiveArticleId] = useState<string>(INSIGHTS[0].id);

  const activeArticle = INSIGHTS.find((a) => a.id === activeArticleId) || INSIGHTS[0];

  // Render chart dynamically for each insight
  const renderInsightChart = () => {
    switch (activeArticle.chartType) {
      case 'mix_evolution': {
        const comp = DataService.getMultiCountryComparison(
          ['germany', 'united-kingdom', 'china', 'united-states'],
          'renewable_share'
        );
        const series = [
          { key: 'germany', name: 'Germany', color: '#059669', strokeWidth: 2.5 },
          { key: 'united-kingdom', name: 'United Kingdom', color: '#0284c7', strokeWidth: 2 },
          { key: 'china', name: 'China', color: '#dc2626', strokeWidth: 2 },
          { key: 'united-states', name: 'United States', color: '#2563eb', strokeWidth: 2 }
        ];
        return (
          <HistoricalTrendChart
            data={comp.trendData}
            series={series}
            title="Renewable Electricity Share Trajectory (2015–2024)"
            subtitle="Percentage of annual domestic generation derived from solar, wind, hydro, and bioenergy."
            unit="%"
            isPercentage
            height={340}
          />
        );
      }
      case 'solar_growth': {
        const comp = DataService.getMultiCountryComparison(
          ['china', 'united-states', 'india', 'germany'],
          'solar_capacity'
        );
        const series = [
          { key: 'china', name: 'China', color: '#dc2626', strokeWidth: 2.5 },
          { key: 'united-states', name: 'United States', color: '#2563eb', strokeWidth: 2 },
          { key: 'india', name: 'India', color: '#ea580c', strokeWidth: 2.5 },
          { key: 'germany', name: 'Germany', color: '#059669', strokeWidth: 2 }
        ];
        return (
          <HistoricalTrendChart
            data={comp.trendData}
            series={series}
            title="Operational Solar PV Capacity Acceleration (2015–2024)"
            subtitle="Cumulative nameplate solar capacity (GW) reflecting sharp utility and distributed scale deployment."
            unit="GW"
            height={340}
          />
        );
      }
      case 'renewables_compare': {
        const barData = [
          { countryId: 'china', countryName: 'China', value: 510.0, unit: 'GW' },
          { countryId: 'united-states', countryName: 'United States', value: 154.2, unit: 'GW' },
          { countryId: 'germany', countryName: 'Germany', value: 73.8, unit: 'GW' },
          { countryId: 'india', countryName: 'India', value: 47.4, unit: 'GW' },
          { countryId: 'brazil', countryName: 'Brazil', value: 32.4, unit: 'GW' },
          { countryId: 'united-kingdom', countryName: 'United Kingdom', value: 31.2, unit: 'GW' },
          { countryId: 'france', countryName: 'France', value: 23.5, unit: 'GW' }
        ];
        return (
          <MultiCountryBarChart
            data={barData}
            title="Installed Wind Power Capacity Benchmark (2024)"
            subtitle="Onshore and offshore wind generator capacity across selected economies."
            unit="GW"
            year={2024}
            height={340}
          />
        );
      }
      case 'baseload_stability': {
        const comp = DataService.getMultiCountryComparison(
          ['france', 'united-states', 'brazil', 'japan'],
          'nuclear_generation'
        );
        const series = [
          { key: 'united-states', name: 'United States', color: '#2563eb', strokeWidth: 2 },
          { key: 'france', name: 'France', color: '#4f46e5', strokeWidth: 2.5 },
          { key: 'japan', name: 'Japan', color: '#7c3aed', strokeWidth: 2 }
        ];
        return (
          <HistoricalTrendChart
            data={comp.trendData}
            series={series}
            title="Nuclear Electricity Output: Dispatchable Clean Baseload (2015–2024)"
            subtitle="Annual net electricity delivered to the transmission network from commercial reactors (TWh)."
            unit="TWh"
            height={340}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-brand-700" />
          <span>Empirical Analyses & System Syntheses</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Analytical Insights & Data Briefs
        </h1>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Concise, evidence-based research briefs investigating long-term grid decarbonization, technology deployment curves, and seasonal system dynamics.
        </p>
      </div>

      {/* Main Content Layout: Left Table of Contents / Selector, Right Selected Article */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Article Navigation Sidebar */}
        <aside className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
            Research Briefs ({INSIGHTS.length})
          </h2>

          <div className="space-y-2">
            {INSIGHTS.map((article) => {
              const isSelected = article.id === activeArticleId;
              return (
                <button
                  key={article.id}
                  onClick={() => setActiveArticleId(article.id)}
                  className={`w-full text-left p-3.5 rounded border transition-all ${
                    isSelected
                      ? 'bg-white border-brand-800 shadow-sm ring-1 ring-brand-800'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-brand-800 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="font-mono">{article.date}</span>
                  </div>

                  <h3 className={`text-xs font-bold leading-snug ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
                    {article.title}
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Coverage: {article.dataYear}</span>
                    <span className="text-amber-800 bg-amber-50 px-1 py-0.2 rounded font-sans">
                      Demo model
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Selected Article Detail & Interactive Visualization */}
        <article className="lg:col-span-8 bg-white border border-slate-200 rounded p-6 shadow-sm space-y-6">
          {/* Article Header */}
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[11px]">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Published: {activeArticle.date}
              </span>
              <span>&bull;</span>
              <span className="font-mono">Time Horizon: {activeArticle.dataYear}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {activeArticle.title}
            </h2>
          </div>

          {/* Narrative Summary */}
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
            <p>{activeArticle.summary}</p>
          </div>

          {/* Interactive Chart */}
          <div className="my-6">
            {renderInsightChart()}
          </div>

          {/* Key Findings Bullet Ledger */}
          <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-brand-700" />
              Empirical Findings & Key Benchmarks
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {activeArticle.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-slate-400 mt-0.5 text-[11px]">
                    0{idx + 1}.
                  </span>
                  <span className="leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Citation & Methodology Note */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="space-y-1">
              <div className="font-semibold text-slate-800">Methodology Note</div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                {activeArticle.methodologyNote}
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-slate-800">Source Citation</div>
              <p className="text-[11px] leading-relaxed text-slate-500 font-mono">
                {activeArticle.sourceCitation}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
