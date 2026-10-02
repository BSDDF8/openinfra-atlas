import { InsightArticle } from '../types/energy';

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'decade-in-transition',
    title: 'A Decade in Transition: How the Global Electricity Mix Has Shifted (2015–2024)',
    slug: 'decade-in-transition',
    category: 'System Transition',
    date: 'August 2024',
    publishedYear: '2024',
    summary: 'A 10-year comparative analysis of generation portfolios across major economies reveals rapid divergence: mature grids in Europe and the Americas experienced steep declines in coal generation replaced by gas and renewables, while emerging economies expanded renewables at record pace while continuing to utilize thermal capacity to support growing base load.',
    keyFindings: [
      'Germany expanded renewable electricity share from 29.8% in 2015 to 59.0% in 2024, successfully decommissioning its remaining nuclear fleet in 2023.',
      'The United Kingdom eliminated unabated coal power entirely from its grid by September 2024, down from 76 TWh (22% of generation) in 2015.',
      'China added more clean generation in absolute volume than any other country, with combined wind and solar generation expanding from 225 TWh in 2015 to over 1,830 TWh in 2024.',
      'Brazil maintained one of the lowest grid emissions intensities in the G20, with renewables supplying 89.2% of total electricity in 2024, propelled by hydro and rapid solar additions.'
    ],
    chartType: 'mix_evolution',
    chartIndicatorId: 'renewable_share',
    methodologyNote: 'Calculations utilize gross annual domestic generation aggregates. Renewable share includes hydro, wind, solar, and bioenergy. Direct exports and cross-border interconnect imports are accounted at point of grid injection.',
    sourceCitation: 'OpenInfra Atlas demonstration model synthesized from Ember Global Electricity Review (2024) and IEA World Energy Balances.',
    dataYear: '2015–2024'
  },
  {
    id: 'solar-capacity-expansion',
    title: 'The Solar Inflection: Analyzing Nameplate Capacity Acceleration Across Continents',
    slug: 'solar-capacity-expansion',
    category: 'Technology Deployment',
    date: 'July 2024',
    publishedYear: '2024',
    summary: 'Solar photovoltaics shifted from an emerging supplemental technology to the single largest source of new annual nameplate generation additions globally between 2019 and 2024. Declines in module manufacturing costs and supportive procurement mechanisms triggered compound annual capacity growth rates exceeding 25% in multiple jurisdictions.',
    keyFindings: [
      'China expanded cumulative operational solar PV capacity from 43.5 GW in 2015 to 880.0 GW by end of 2024, representing an approximate twentyfold increase.',
      'India crossed 90 GW of operational solar capacity in 2024, up from just 6.7 GW in 2015, driven by mega-solar parks and national reverse-auction tariffs.',
      'The United States quadrupled installed solar capacity from 43.3 GW in 2017 to 178.5 GW in 2024, spanning both utility-scale solar and distributed rooftop segments.',
      'Germany reached 94.2 GW of solar capacity by 2024, maintaining the highest installed solar capacity per capita among major European economies.'
    ],
    chartType: 'solar_growth',
    chartIndicatorId: 'solar_capacity',
    methodologyNote: 'Nameplate figures indicate maximum direct/alternating current rated capacity at year-end. Capacity factor variations across geographic solar irradiance zones mean equal nameplate capacity yields distinct annual generation totals.',
    sourceCitation: 'Derived from International Renewable Energy Agency (IRENA) Renewable Capacity Statistics (2024) and national grid filings.',
    dataYear: '2015–2024'
  },
  {
    id: 'wind-power-penetration',
    title: 'Wind Energy Integration: Comparing Capacity Densities and High-Demand Grids',
    slug: 'wind-power-penetration',
    category: 'Grid Integration',
    date: 'June 2024',
    publishedYear: '2024',
    summary: 'As wind generation approaches 20% to 30% of total electrical supply in economies like the UK and Germany, grid balancing requirements have evolved. Transmission expansion, offshore HVDC links, and enhanced interconnector capacity have become foundational prerequisites to prevent local curtailment.',
    keyFindings: [
      'The United Kingdom expanded wind generation from 40 TWh in 2015 to 88 TWh in 2024, driven by world-leading deployment of North Sea offshore wind farms.',
      'The United States more than doubled wind capacity between 2015 and 2024, reaching 154.2 GW concentrated in the Great Plains wind corridor and ERCOT (Texas).',
      'China established over 510 GW of grid-connected wind capacity by 2024, linking northern and western desert wind bases to eastern consumption centers via ultra-high-voltage (UHV) lines.',
      'Brazil developed 32.4 GW of wind capacity by 2024, primarily in the high-capacity-factor northeastern trade wind corridor.'
    ],
    chartType: 'renewables_compare',
    chartIndicatorId: 'wind_capacity',
    methodologyNote: 'Data accounts for both onshore turbines and bottom-fixed/floating offshore wind facilities. Offshore capacity metrics reflect point of common coupling (PCC) to the onshore grid.',
    sourceCitation: 'Global Wind Energy Council (GWEC) Annual Wind Report & Ember Electricity Review.',
    dataYear: '2015–2024'
  },
  {
    id: 'baseload-hydro-nuclear',
    title: 'Zero-Carbon Dispatchability: Hydropower Variation and Nuclear Stability',
    slug: 'baseload-hydro-nuclear',
    category: 'Grid Reliability',
    date: 'May 2024',
    publishedYear: '2024',
    summary: 'Evaluating the non-weather-intermittent clean power fleet: while nuclear energy provides round-the-clock baseload generation with capacity factors often exceeding 85%, hydropower output remains subject to multi-year rainfall variations and climate-induced drought cycles.',
    keyFindings: [
      'France generated over 66% of its electricity from its 56-reactor nuclear fleet in 2024 (365 TWh), yielding an exceptionally low grid emissions intensity of ~40 gCO₂/kWh.',
      'Brazil generated 432 TWh from hydropower in 2024, serving as the backbone of its electrical system and providing vital flexible reservoir storage.',
      'Prolonged dry spells in 2021 caused Brazilian hydropower output to drop to 363 TWh, necessitating temporary dispatch of emergency gas peakers before rebounding in 2023–2024.',
      'Japan maintained a gradual, regulated restart of its nuclear reactors under strict NRA oversight, producing 82 TWh in 2024 compared to 9 TWh in 2015.'
    ],
    chartType: 'baseload_stability',
    chartIndicatorId: 'nuclear_generation',
    methodologyNote: 'Hydro metrics exclude closed-loop pumped storage recycling. Nuclear generation represents net gigawatt-hours delivered after subtracting auxiliary in-plant loads.',
    sourceCitation: 'IAEA Power Reactor Information System (PRIS) and Operador Nacional do Sistema Elétrico (ONS).',
    dataYear: '2015–2024'
  }
];
