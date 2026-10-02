# OpenInfra Atlas

> **Open infrastructure data, explained.**  
> A public-facing infrastructure intelligence platform for exploring global electricity generation, renewable energy capacity, fuel mix transitions, and grid indicators through transparent public datasets.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## 1. Project Overview

**OpenInfra Atlas** is an open-source analytical web application designed for policy researchers, electrical engineers, energy economists, and students. Modeled after the editorial rigor and statistical clarity of organizations like *Our World in Data*, the *International Energy Agency (IEA)*, and the *World Bank*, OpenInfra Atlas prioritizes transparent methodology, data provenance, and dense, usable information over decorative marketing fluff.

The platform provides interactive exploration of:
- Gross electricity generation & thermal fuel displacement
- Variable renewable capacity (Solar PV & Wind power in GW)
- Dispatchable clean power (Hydropower & Nuclear fission in TWh)
- National fuel mix compositions across 10 years of consistent observations (2015–2024)
- Multi-country side-by-side comparative matrices
- Browser-native RFC 4180 CSV data export

---

## 2. Interface Preview

```
+------------------------------------------------------------------------------------+
|  [||] OpenInfra Atlas   Explore Data   Countries   Compare   Insights   Methodology   |
+------------------------------------------------------------------------------------+
|  Open infrastructure data, explained.                                              |
|  Explore energy capacity, electricity generation and infrastructure trends...      |
|  [ Search countries, indicators or metrics...                     ] [Explore Data] |
+------------------------------------------------------------------------------------+
|  [ Total Generation ]   [ Renewable Share ]   [ Solar Capacity ]   [ Wind Capacity ]|
|      23,892 TWh                32.4%                1,514 GW            1,056 GW   |
|  Source: IEA / Ember    Source: Ember GER     Source: IRENA        Source: GWEC    |
+------------------------------------------------------------------------------------+
|  Interactive Visualizations: Stacked Fuel Mix  *  Multi-Country Decarbonization     |
+------------------------------------------------------------------------------------+
```

---

## 3. Key Features

- **Interactive Data Explorer (`/explore`):** Filter by indicator, country cohort, and observation year. Switch seamlessly between sortable data tables and responsive multi-line or grouped bar charts.
- **Dynamic Country Profiles (`/countries/:countryId`):** In-depth system profiles for major economies (India, United States, China, Germany, Japan, Brazil, United Kingdom, France) featuring 10-year stacked fuel mix areas, capacity growth curves, and grid telemetry specs.
- **Multi-Country Comparison Tool (`/compare`):** Select 2 to 4 countries to evaluate capacity, clean energy penetration, and emissions intensity side-by-side without subjective rankings or arbitrary scores.
- **Empirical Analytical Briefs (`/insights`):** Evidence-grounded editorial briefings analyzing solar cost curves, European coal phaseouts, and baseload dispatchability.
- **RFC 4180 CSV Data Export:** Download currently filtered tables directly from the browser with standardized headers, timestamps, and provenance citations.
- **Authoritative Methodology & Provenance Registry (`/methodology`):** Exhaustive documentation detailing the distinction between nameplate capacity (GW) and electrical generation (TWh), capacity factors, missing observation protocols, and source licensing.
- **Responsive & Accessible Design:** Full keyboard accessibility, semantic HTML, high color contrast, and fluid responsiveness from mobile devices (375px) to ultra-wide desktop monitors.

---

## 4. Technology Stack

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom editorial color tokens and tabular figures
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Iconography:** [Lucide React](https://lucide.dev/)
- **Deployment Platform:** Standard [AWS EC2](https://aws.amazon.com/ec2/) Ubuntu instance behind [Nginx](https://nginx.org/)

---

## 5. Project Directory Structure

```
openinfra-atlas/
├── deployment/
│   ├── nginx.conf              # Production Nginx reverse-proxy & SPA config
│   └── deploy-ec2.sh           # Automated deployment script for AWS EC2
├── public/
│   ├── favicon.svg             # Crisp geometric infrastructure favicon
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── charts/             # EnergyMixChart, HistoricalTrendChart, MultiCountryBarChart
│   │   ├── common/             # StatCard, Badge, Button, SearchInput, EmptyState, DataNoticeBanner
│   │   ├── layout/             # Header, Footer, RootLayout
│   │   └── tables/             # DataTable, ComparisonTable
│   ├── data/
│   │   ├── countries.ts        # Sovereign metadata (ISO codes, grid frequency, population)
│   │   ├── energyData.ts       # Coherent multi-year historical dataset & fuel balances
│   │   ├── indicators.ts       # Standardized indicators, formulas, units, and categories
│   │   ├── insightsData.ts     # Analytical research briefs
│   │   └── provenance.ts       # Data provenance registry and disclaimer metadata
│   ├── pages/
│   │   ├── HomePage.tsx        # Executive summary, global metrics, quick search
│   │   ├── ExplorePage.tsx     # Full data explorer with filters & CSV export
│   │   ├── CountriesPage.tsx   # Country directory
│   │   ├── CountryDetailPage.tsx # Deep-dive country profile
│   │   ├── ComparePage.tsx     # Multi-country comparison tool
│   │   ├── InsightsPage.tsx    # Analytical articles with interactive charts
│   │   ├── MethodologyPage.tsx # Standards, formulas, and provenance registry
│   │   ├── AboutPage.tsx       # Mission, philosophy, and EC2 hosting guide
│   │   └── NotFoundPage.tsx    # 404 state
│   ├── services/
│   │   ├── dataService.ts      # Querying, filtering, and aggregation abstraction
│   │   └── csvService.ts       # RFC 4180 CSV serialization and download trigger
│   ├── types/
│   │   ├── energy.ts           # Domain models for records, profiles, and indicators
│   │   └── filters.ts          # State definitions for explorer and comparison views
│   ├── utils/
│   │   └── formatters.ts       # Number, unit, and date formatting helpers
│   ├── App.tsx                 # Client-side route declarations & ScrollToTop
│   ├── index.css               # Tailwind layers and tabular numeric defaults
│   └── main.tsx                # React DOM entrypoint
├── CONTRIBUTING.md
├── LICENSE                     # MIT License
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 6. Installation & Local Development

### Prerequisites
- Node.js version 18.0 or higher
- npm version 9.0 or higher

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/example/openinfra-atlas.git
   cd openinfra-atlas
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Verify TypeScript compilation & build:**
   ```bash
   npm run build
   ```

5. **Preview the production bundle locally:**
   ```bash
   npm run preview
   ```

---

## 7. AWS EC2 Production Deployment

OpenInfra Atlas compiles into optimized static assets (`dist/`), making it ready for high-throughput, low-latency hosting on an AWS EC2 instance.

### Option A: Using the Automated Script
On your Ubuntu EC2 instance, execute:
```bash
chmod +x deployment/deploy-ec2.sh
./deployment/deploy-ec2.sh
```

### Option B: Manual Setup

1. **Launch an EC2 instance:** Choose an Ubuntu Server 22.04 / 24.04 LTS instance (e.g. `t3.micro` or `t3.small`). Configure Security Groups to allow inbound traffic on **Port 80 (HTTP)** and **Port 443 (HTTPS)**.
2. **Build and copy artifacts:**
   ```bash
   npm install && npm run build
   sudo mkdir -p /var/www/openinfra-atlas
   sudo cp -r dist/* /var/www/openinfra-atlas/
   ```
3. **Configure Nginx:**
   ```bash
   sudo cp deployment/nginx.conf /etc/nginx/sites-available/openinfra-atlas
   sudo ln -sf /etc/nginx/sites-available/openinfra-atlas /etc/nginx/sites-enabled/
   sudo rm -f /etc/nginx/sites-enabled/default
   sudo nginx -t
   sudo systemctl restart nginx
   ```
4. **Enable SSL (Optional via Let's Encrypt):**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 8. Data Architecture & API Replacement

Data access is decoupled from UI components via `src/services/dataService.ts`. Currently, the platform operates on a curated multi-year demonstration dataset modeled after real-world reporting frameworks.

To connect this interface to live production REST APIs (e.g., US EIA API v2, Ember Open Data API, or ENTSO-E Transparency Platform):
1. Modify `src/services/dataService.ts` to implement asynchronous API fetch methods.
2. Keep the return signatures matching `EnergyDataRecord` and `FuelMixRecord` defined in `src/types/energy.ts`.
3. The UI components will render live responses without requiring template modifications.

---

## 9. Data Sources & Provenance

| Dataset | Provider | Coverage | License |
| :--- | :--- | :--- | :--- |
| **Global Electricity Review** | Ember Climate | Generation, Fossil Fuels, Carbon Intensity | CC-BY-4.0 |
| **Renewable Capacity Statistics** | IRENA | Solar PV, Wind, Hydropower (GW) | Open Access |
| **World Energy Balances** | International Energy Agency (IEA) | Electricity Supply & Balances | Academic/Research |
| **Power Reactor Information System**| IAEA | Nuclear Generation & Availability | Public Domain |

> **Disclaimer:** This version uses a curated demonstration dataset. Before production deployment or regulatory usage, connect this interface to authoritative public datasets.

---

## 10. Roadmap

- [x] Initial release with 8 major economies (IND, USA, CHN, DEU, JPN, BRA, GBR, FRA)
- [x] Fuel mix historical stacked visualizations (2015–2024)
- [x] 4-country comparison matrix and bar chart snapshot
- [x] Browser-native RFC 4180 CSV export
- [x] Standardized methodology documentation and provenance registry
- [ ] Connect `dataService.ts` to live Ember and EIA v2 REST APIs
- [ ] Interactive geographic choropleth map visualization
- [ ] Regional sub-grid dispatch breakdowns (e.g., ERCOT, CAISO, PJM, POSOCO regions)
- [ ] Hourly day-ahead price and load curve integration

---

## 11. Contributing

Contributions are welcomed! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide for instructions on submitting bug reports, indicator proposals, or new country datasets.

---

## 12. License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
