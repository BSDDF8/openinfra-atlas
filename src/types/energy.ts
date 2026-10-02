export type IndicatorCategory = 'generation' | 'capacity' | 'emissions' | 'mix';

export interface Country {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  region: string;
  subregion: string;
  incomeGroup: string;
  populationMillions: number;
  gridFrequencyHz: number;
  majorGridSystem: string;
}

export interface Indicator {
  id: string;
  name: string;
  shortName: string;
  category: IndicatorCategory;
  unit: string;
  description: string;
  calculationMethod?: string;
  sourceStandard: string;
  digits: number;
  isPercentage?: boolean;
}

export interface EnergyDataRecord {
  id: string;
  countryId: string;
  countryName: string;
  year: number;
  indicatorId: string;
  indicatorName: string;
  value: number;
  unit: string;
  source: string;
  sourceType: 'Demonstration dataset' | 'Public Reporting Framework';
  dataQualityRating?: 'High' | 'Provisional' | 'Estimated';
  notes?: string;
}

export interface FuelMixRecord {
  year: number;
  coal: number;        // TWh
  gas: number;         // TWh
  nuclear: number;     // TWh
  hydro: number;       // TWh
  wind: number;        // TWh
  solar: number;       // TWh
  bioenergy: number;   // TWh
  other: number;       // TWh
  total: number;       // TWh
  renewableShare: number; // %
}

export interface CountryProfile {
  country: Country;
  latestYear: number;
  latestStats: {
    totalGenerationTWh: number;
    renewableSharePercent: number;
    solarCapacityGW: number;
    windCapacityGW: number;
    hydroCapacityGW: number;
    nuclearGenerationTWh: number;
    emissionsIntensityGCO2: number;
  };
  fuelMixHistory: FuelMixRecord[];
  timeSeries: Record<string, { year: number; value: number }[]>;
  dataSources: DataSourceProvenance[];
}

export interface DataSourceProvenance {
  datasetName: string;
  provider: string;
  indicatorCoverage: string;
  temporalCoverage: string;
  lastUpdated: string;
  license: string;
  sourceUrl: string;
  methodologySummary: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  publishedYear: string;
  summary: string;
  keyFindings: string[];
  narrativeHtml?: string;
  chartType: 'mix_evolution' | 'solar_growth' | 'renewables_compare' | 'baseload_stability';
  chartIndicatorId: string;
  methodologyNote: string;
  sourceCitation: string;
  dataYear: string;
}
