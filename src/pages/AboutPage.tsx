import React from 'react';
import { Server, Code2, Shield, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/common/GithubIcon';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl">
      {/* Page Title */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          About OpenInfra Atlas
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
          An open-source public platform designed for exploring, visualizing, and analyzing energy generation, renewable capacity, and power grid decarbonization trends.
        </p>
      </div>

      {/* Purpose & Mission */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-700" />
          Project Purpose & Core Principles
        </h2>
        <div className="text-xs text-slate-700 space-y-2 leading-relaxed bg-white border border-slate-200 rounded p-4 shadow-sm">
          <p>
            OpenInfra Atlas was created to bridge the gap between dense government energy balance tables and accessible, high-integrity data visualization. Public infrastructure decisions involving billions of dollars and millions of lives require transparent, verifiable empirical baselines.
          </p>
          <p>
            The project adheres to three core commitments:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>
              <strong>Total Data Transparency:</strong> Every indicator must explicitly declare its calculation methodology, physical unit (TWh, GW, %), and source origin.
            </li>
            <li>
              <strong>Zero Commercial Distortion:</strong> We avoid marketing hype, decorative fluff, or proprietary paywalls. The interface is engineered to prioritize information density and clarity.
            </li>
            <li>
              <strong>Open Access by Default:</strong> All software and analytical transformations are published under permissive open-source licenses (MIT).
            </li>
          </ul>
        </div>
      </section>

      {/* Technology Stack & Architecture */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-brand-700" />
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-white border border-slate-200 rounded p-3 shadow-sm space-y-1">
            <span className="font-semibold text-slate-900 block">Frontend Framework & Language</span>
            <p className="text-slate-600">
              React 19 + TypeScript. Clean component modularity with strong type safety across all statistical interfaces.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded p-3 shadow-sm space-y-1">
            <span className="font-semibold text-slate-900 block">Build Tool & Bundler</span>
            <p className="text-slate-600">
              Vite. Ultra-fast Hot Module Replacement (HMR) and optimized static asset compilation.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded p-3 shadow-sm space-y-1">
            <span className="font-semibold text-slate-900 block">Design System & Styling</span>
            <p className="text-slate-600">
              Tailwind CSS with restrained editorial configuration, high-contrast typography, and tabular numeric font features.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded p-3 shadow-sm space-y-1">
            <span className="font-semibold text-slate-900 block">Data Visualization Engine</span>
            <p className="text-slate-600">
              Recharts. Lightweight SVG-based charting library supporting responsive multi-line trajectories and stacked energy mix areas.
            </p>
          </div>
        </div>
      </section>

      {/* AWS EC2 Deployment Documentation */}
      <section id="ec2" className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-brand-700" />
          Production Deployment on AWS EC2
        </h2>
        <div className="bg-white border border-slate-200 rounded p-4 shadow-sm space-y-3 text-xs text-slate-700">
          <p className="leading-relaxed">
            OpenInfra Atlas is architected as a lightweight, static Single Page Application (SPA). It requires no complex serverless infrastructure or proprietary cloud services and is designed for straightforward hosting on an <strong>Amazon Web Services (AWS) Elastic Compute Cloud (EC2)</strong> instance behind Nginx.
          </p>

          <div className="space-y-2">
            <div className="font-semibold text-slate-900">Standard AWS EC2 Ubuntu Deployment Workflow:</div>
            <div className="bg-slate-900 text-slate-200 p-3 rounded font-mono text-[11px] space-y-1 overflow-x-auto">
              <div className="text-slate-400"># 1. Clone repository on EC2 Ubuntu instance</div>
              <div>git clone https://github.com/example/openinfra-atlas.git</div>
              <div>cd openinfra-atlas</div>
              <br />
              <div className="text-slate-400"># 2. Install dependencies & build production bundle</div>
              <div>npm install</div>
              <div>npm run build</div>
              <br />
              <div className="text-slate-400"># 3. Copy compiled static files to web server root</div>
              <div>sudo cp -r dist/* /var/www/openinfra-atlas/</div>
              <br />
              <div className="text-slate-400"># 4. Configure Nginx with SPA routing fallback</div>
              <div>sudo cp deployment/nginx.conf /etc/nginx/sites-available/openinfra-atlas</div>
              <div>sudo ln -s /etc/nginx/sites-available/openinfra-atlas /etc/nginx/sites-enabled/</div>
              <div>sudo systemctl restart nginx</div>
            </div>
          </div>

          <p className="text-slate-500 text-[11px] leading-relaxed">
            The repository includes a ready-to-use Nginx configuration file (<code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-700">deployment/nginx.conf</code>) and deployment script (<code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-700">deployment/deploy-ec2.sh</code>).
          </p>
        </div>
      </section>

      {/* Open Source Governance & Code Repository */}
      <section className="bg-slate-100 border border-slate-200 rounded p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <GithubIcon className="w-4 h-4" />
            <span>Open Source Repository</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
            License: MIT
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          OpenInfra Atlas is an open-source initiative. Contributions, issues, methodology improvements, and new country datasets can be submitted via GitHub pull requests following the project's contribution guidelines.
        </p>

        <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-brand-700">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-900 inline-flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>View GitHub Repository (Placeholder)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </section>
    </div>
  );
};
