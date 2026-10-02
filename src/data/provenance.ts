import { DataSourceProvenance } from '../types/energy';

export const DATASET_DISCLAIMER = {
  shortNotice: 'Demonstration dataset — curated from public reporting frameworks for development and evaluation.',
  fullNotice: 'This web application currently utilizes a curated demonstration dataset modeled after authoritative public reporting frameworks (IEA World Energy Balances, Ember Global Electricity Review, and IRENA Renewable Capacity Statistics). Before production deployment or regulatory usage, connect this interface to live API endpoints or authoritative statistical releases.',
  lastReviewDate: '2025-01-15',
  version: 'v1.0.0-demo'
};

export const PROVENANCE_RECORDS: DataSourceProvenance[] = [
  {
    datasetName: 'Global Electricity Review (GER)',
    provider: 'Ember Climate',
    indicatorCoverage: 'Electricity Generation, Fossil Generation, Renewable Generation, Grid Carbon Intensity',
    temporalCoverage: '2015 – 2024 (Annual)',
    lastUpdated: 'May 2024',
    license: 'Creative Commons Attribution 4.0 International (CC-BY-4.0)',
    sourceUrl: 'https://ember-climate.org/data/data-tools/data-explorer/',
    methodologySummary: 'Annual generation aggregated from national transmission system operators (TSOs), Eurostat, US EIA, and national statistical bureaus with standard unit conversions to TWh.'
  },
  {
    datasetName: 'Renewable Capacity Statistics',
    provider: 'International Renewable Energy Agency (IRENA)',
    indicatorCoverage: 'Solar Photovoltaic Capacity, Wind Power Capacity, Hydropower Capacity',
    temporalCoverage: '2015 – 2024 (Annual, year-end)',
    lastUpdated: 'April 2024',
    license: 'Open Access / Attribution Required',
    sourceUrl: 'https://www.irena.org/Data/View-data-by-topic/Capacity-and-Generation/Country-Rankings',
    methodologySummary: 'Nameplate alternating current (AC) and direct current (DC) operational rated capacities compiled via official government questionnaires and national regulator registries.'
  },
  {
    datasetName: 'World Energy Balances & Electricity Information',
    provider: 'International Energy Agency (IEA)',
    indicatorCoverage: 'Total Electricity Supply, Fuel Transformation, Nuclear Electricity Output',
    temporalCoverage: '2015 – 2023 (Provisional 2024)',
    lastUpdated: 'July 2024',
    license: 'Terms of Use for Non-Commercial Public Research & Demonstration',
    sourceUrl: 'https://www.iea.org/data-and-statistics/data-product/world-energy-balances',
    methodologySummary: 'Standardized energy balance methodology converting physical mass/volume of energy commodities into common energy units using net calorific values.'
  },
  {
    datasetName: 'Power Reactor Information System (PRIS)',
    provider: 'International Atomic Energy Agency (IAEA)',
    indicatorCoverage: 'Nuclear Electricity Generation, Operational Reactor Units, Nuclear Availability Factors',
    temporalCoverage: '2015 – 2024 (Continuous)',
    lastUpdated: 'June 2024',
    license: 'Public Domain / Open Data',
    sourceUrl: 'https://pris.iaea.org/PRIS/',
    methodologySummary: 'Direct monthly telemetry and annual utility filings of net electrical energy supplied to electrical grids by commercial nuclear fission power plants worldwide.'
  }
];
