import React from 'react';
import { ExternalLink, ShieldCheck, HelpCircle, FileText, Cpu, Calculator } from 'lucide-react';
import { PROVENANCE_RECORDS, DATASET_DISCLAIMER } from '../data/provenance';
import { INDICATORS } from '../data/indicators';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-5xl">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Accounting Protocols & Statistical Standards</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Methodology & Data Provenance
        </h1>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Comprehensive technical documentation detailing measurement conventions, mathematical formulas, source provenance registries, and data transformation procedures utilized throughout OpenInfra Atlas.
        </p>
      </div>

      {/* Explicit Production Transition Disclaimer */}
      <div className="bg-amber-50 border border-amber-300 rounded-md p-5 text-xs text-amber-950 shadow-sm space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
          <span>Demonstration Dataset Protocol Notice</span>
        </div>
        <p className="text-amber-900/90 leading-relaxed">
          <strong>This version uses a curated demonstration dataset. Production deployment should connect this interface to authoritative public datasets.</strong> The figures and fuel mix trends included in this release are synthesized directly from public reporting frameworks (IEA World Energy Balances, Ember Global Electricity Review, and IRENA Renewable Capacity Statistics) to evaluate the interface, analytics, and visualization engine under realistic conditions.
        </p>
      </div>

      {/* Section 1: Fundamental Concepts & Engineering Distinctions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-200 pb-2">
          <HelpCircle className="w-4 h-4 text-brand-700" />
          <h2>Fundamental Electrical Accounting Distinctions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div className="bg-white border border-slate-200 rounded p-4 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-slate-900">
              1. Nameplate Capacity (GW / MW) vs. Electrical Generation (TWh / GWh)
            </h3>
            <p className="leading-relaxed text-slate-600">
              A foundational distinction in power systems engineering is between <em>capacity</em> (the instantaneous potential rate of electrical generation) and <em>generation</em> (the actual cumulative volume of electrical energy supplied over time).
            </p>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>
                <strong>Capacity (Gigawatts - GW):</strong> Indicates maximum rated output under standard test conditions (STC). A 100 MW solar plant has 0.1 GW of nameplate capacity.
              </li>
              <li>
                <strong>Generation (Terawatt-hours - TWh):</strong> The physical energy produced over an annual period. One TWh equals 1,000,000,000 kilowatt-hours (1 billion kWh or 1 million MWh).
              </li>
              <li>
                <strong>Capacity Factor (CF):</strong> Ratio of actual generation to theoretical continuous maximum output:
                <div className="my-1.5 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-center text-slate-900">
                  Capacity Factor (%) = [ Annual Generation (MWh) / (Capacity (MW) &times; 8,760 hours) ] &times; 100
                </div>
                Because solar and wind are variable weather-dependent resources with capacity factors typically between 15% and 45%, installing 10 GW of solar capacity produces significantly less annual energy than a 10 GW nuclear or geothermal station operating at an 85%+ capacity factor.
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded p-4 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-slate-900">
              2. Absolute Values vs. Relative Percentage Shares
            </h3>
            <p className="leading-relaxed text-slate-600">
              Comparing power grids on percentage metrics alone can obscure vital physical scale:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>
                <strong>Percentage Share (%):</strong> Represents the proportion of a nation's total domestic generation generated by a technology. In high-hydro countries like Brazil, renewables can account for ~89% of generation.
              </li>
              <li>
                <strong>Absolute Scale (TWh):</strong> Reflects total physical electron volume. While China's renewable share in 2024 was ~34%, its absolute clean generation exceeded 3,300 TWh—surpassing the entire total power generation of all European economies combined.
              </li>
              <li>
                <strong>Per Capita Metrics:</strong> Normalize gross demand across national population sizes (kWh per person), highlighting differences in industrial structure, climate control, and residential electrification.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Mathematical Formulas & Indicator Definitions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-200 pb-2">
          <Calculator className="w-4 h-4 text-brand-700" />
          <h2>Standardized Indicator Formulas & Definitions</h2>
        </div>

        <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[11px]">
                <th className="py-2.5 px-4">Indicator</th>
                <th className="py-2.5 px-3">Unit</th>
                <th className="py-2.5 px-4">Formula / Calculation Procedure</th>
                <th className="py-2.5 px-4 hidden md:table-cell">Standard Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
              {INDICATORS.map((ind) => (
                <tr key={ind.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4 font-sans font-semibold text-slate-900">
                    {ind.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 uppercase text-[11px]">
                    {ind.unit}
                  </td>
                  <td className="py-2.5 px-4 font-sans text-slate-600 text-xs">
                    {ind.calculationMethod || ind.description}
                  </td>
                  <td className="py-2.5 px-4 font-sans text-slate-500 text-[11px] hidden md:table-cell">
                    {ind.sourceStandard}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Data Provenance Registry */}
      <section id="provenance" className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-200 pb-2">
          <FileText className="w-4 h-4 text-brand-700" />
          <h2>Data Provenance Registry</h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          OpenInfra Atlas catalogs datasets according to the guidelines of the Open Knowledge Foundation. The registry below establishes provider attribution, update latency, licenses, and primary source links.
        </p>

        <div className="space-y-4">
          {PROVENANCE_RECORDS.map((prov) => (
            <div key={prov.datasetName} className="bg-white border border-slate-200 rounded p-4 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{prov.datasetName}</h3>
                  <span className="text-xs text-brand-800 font-medium">{prov.provider}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Updated: {prov.lastUpdated}
                  </span>
                  <a
                    href={prov.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-900 inline-flex items-center gap-1 font-semibold"
                  >
                    Dataset Portal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <div>
                  <span className="font-medium text-slate-700 block">Coverage Scope:</span>
                  <span>{prov.indicatorCoverage}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700 block">Temporal Resolution:</span>
                  <span className="font-mono">{prov.temporalCoverage}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700 block">License / Usage Rights:</span>
                  <span>{prov.license}</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200">
                <strong>Methodology:</strong> {prov.methodologySummary}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Data Quality, Missing Values, and Reconciliations */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-200 pb-2">
          <Cpu className="w-4 h-4 text-brand-700" />
          <h2>Data Quality Conventions & Reconciliation</h2>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>Geographic Boundaries:</strong> All national statistics correspond to recognized sovereign territories and exclusive economic zones (for offshore wind developments). Island territories and overseas dependencies are included in mainland reporting only where national grid synchronization exists.
          </p>
          <p>
            <strong>Temporal Cadence:</strong> Unless explicitly noted as provisional, annual totals correspond to the calendar year (January 1 through December 31). In jurisdictions utilizing non-calendar fiscal reporting (such as India's April–March financial year), figures are converted to calendar years using monthly dispatch data.
          </p>
          <p>
            <strong>Handling Missing Observations:</strong> When a statistical agency has not yet published audited final annual numbers for the most recent observation year (e.g. 2024), OpenInfra Atlas applies provisional figures computed from monthly transmission system operator (TSO) SCADA records, clearly tagged with quality ratings.
          </p>
        </div>
      </section>
    </div>
  );
};
