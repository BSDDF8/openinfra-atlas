import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Layers } from 'lucide-react';
import { GithubIcon } from '../common/GithubIcon';

const NAV_ITEMS = [
  { label: 'Explore Data', path: '/explore' },
  { label: 'Countries', path: '/countries' },
  { label: 'Compare', path: '/compare' },
  { label: 'Insights', path: '/insights' },
  { label: 'Methodology', path: '/methodology' },
  { label: 'About', path: '/about' }
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Product Name */}
          <Link to="/" className="flex items-center gap-2.5 text-slate-900 group">
            <div className="w-8 h-8 rounded bg-brand-900 flex items-center justify-center text-white font-mono font-bold text-sm tracking-wider">
              <Layers className="w-4 h-4 text-sky-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-tight tracking-tight text-slate-900">
                OpenInfra <span className="text-brand-700 font-semibold">Atlas</span>
              </span>
              <span className="text-[10px] tracking-normal text-slate-500 font-medium -mt-0.5">
                Energy & Infrastructure Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action / GitHub Link */}
          <div className="hidden md:flex items-center gap-2 border-l border-slate-200 pl-4 ml-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-800 p-1.5 rounded transition-colors"
              title="View GitHub Repository"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              v1.0-eval
            </span>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-md">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 text-sm font-medium rounded ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
            <span>OpenInfra Atlas</span>
            <span className="font-mono">v1.0-eval</span>
          </div>
        </div>
      )}
    </header>
  );
};
