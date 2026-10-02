import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Layers } from 'lucide-react';
import { DATASET_DISCLAIMER } from '../../data/provenance';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-6 h-6 rounded bg-brand-700 flex items-center justify-center text-white">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm tracking-tight">OpenInfra Atlas</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              An open-source public platform for exploring energy capacity, electricity generation, and grid decarbonization indicators.
            </p>
            <div className="text-[11px] text-slate-400">
              License: MIT Open Source Software
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">
              Platform Data
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">Data Explorer</Link>
              </li>
              <li>
                <Link to="/countries" className="hover:text-white transition-colors">Country Profiles</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">Multi-Country Comparison</Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-white transition-colors">Analytical Insights</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Reference & Governance */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">
              Documentation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/methodology" className="hover:text-white transition-colors">Methodology & Formulas</Link>
              </li>
              <li>
                <Link to="/methodology#provenance" className="hover:text-white transition-colors">Data Provenance Registry</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Project & Mission</Link>
              </li>
              <li>
                <Link to="/about#ec2" className="hover:text-white transition-colors">AWS EC2 Deployment Guide</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Reference Source Frameworks */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">
              Reporting Standards
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="https://ember-climate.org" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1 transition-colors">
                  Ember Climate GER <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://www.irena.org" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1 transition-colors">
                  IRENA Capacity Stats <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://www.iea.org" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1 transition-colors">
                  IEA World Energy Balances <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://pris.iaea.org" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1 transition-colors">
                  IAEA PRIS Nuclear Data <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
          <p>
            <strong className="text-slate-300">Data Integrity Notice:</strong> {DATASET_DISCLAIMER.fullNotice}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2 text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} OpenInfra Atlas project contributors. Released under the MIT License.
            </div>
            <div className="font-mono text-[10px]">
              Build version: {DATASET_DISCLAIMER.version} | Baseline 2015–2024
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
