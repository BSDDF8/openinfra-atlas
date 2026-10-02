import { Country } from '../types/energy';

export const COUNTRIES: Country[] = [
  {
    id: 'india',
    name: 'India',
    iso2: 'IN',
    iso3: 'IND',
    region: 'Asia',
    subregion: 'Southern Asia',
    incomeGroup: 'Lower-middle income',
    populationMillions: 1428.6,
    gridFrequencyHz: 50,
    majorGridSystem: 'National Synchronous Grid (POSOCO / Grid-India)'
  },
  {
    id: 'united-states',
    name: 'United States',
    iso2: 'US',
    iso3: 'USA',
    region: 'Americas',
    subregion: 'Northern America',
    incomeGroup: 'High income',
    populationMillions: 335.8,
    gridFrequencyHz: 60,
    majorGridSystem: 'Eastern, Western & ERCOT Interconnections (NERC)'
  },
  {
    id: 'china',
    name: 'China',
    iso2: 'CN',
    iso3: 'CHN',
    region: 'Asia',
    subregion: 'Eastern Asia',
    incomeGroup: 'Upper-middle income',
    populationMillions: 1411.7,
    gridFrequencyHz: 50,
    majorGridSystem: 'State Grid Corporation of China & China Southern Power Grid'
  },
  {
    id: 'germany',
    name: 'Germany',
    iso2: 'DE',
    iso3: 'DEU',
    region: 'Europe',
    subregion: 'Western Europe',
    incomeGroup: 'High income',
    populationMillions: 84.4,
    gridFrequencyHz: 50,
    majorGridSystem: 'ENTSO-E Synchronous Grid of Continental Europe'
  },
  {
    id: 'japan',
    name: 'Japan',
    iso2: 'JP',
    iso3: 'JPN',
    region: 'Asia',
    subregion: 'Eastern Asia',
    incomeGroup: 'High income',
    populationMillions: 124.5,
    gridFrequencyHz: 50, // 50 Hz East, 60 Hz West connected via HVDC back-to-back
    majorGridSystem: 'OCCTO (Dual 50/60 Hz Interconnected Island Grid)'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    iso2: 'BR',
    iso3: 'BRA',
    region: 'Americas',
    subregion: 'South America',
    incomeGroup: 'Upper-middle income',
    populationMillions: 215.3,
    gridFrequencyHz: 60,
    majorGridSystem: 'Sistema Interligado Nacional (ONS)'
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    iso2: 'GB',
    iso3: 'GBR',
    region: 'Europe',
    subregion: 'Northern Europe',
    incomeGroup: 'High income',
    populationMillions: 67.7,
    gridFrequencyHz: 50,
    majorGridSystem: 'National Grid Electricity System Operator (ESO / NESO)'
  },
  {
    id: 'france',
    name: 'France',
    iso2: 'FR',
    iso3: 'FRA',
    region: 'Europe',
    subregion: 'Western Europe',
    incomeGroup: 'High income',
    populationMillions: 68.0,
    gridFrequencyHz: 50,
    majorGridSystem: 'Réseau de Transport d’Électricité (RTE / ENTSO-E)'
  }
];

export const COUNTRY_LOOKUP: Record<string, Country> = COUNTRIES.reduce((acc, c) => {
  acc[c.id] = c;
  return acc;
}, {} as Record<string, Country>);
