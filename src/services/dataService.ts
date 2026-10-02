import { Country, Indicator, CountryProfile, EnergyDataRecord, FuelMixRecord } from '../types/energy';
import { ExplorerFilters } from '../types/filters';
import { COUNTRIES, COUNTRY_LOOKUP } from '../data/countries';
import { INDICATORS, INDICATOR_LOOKUP } from '../data/indicators';
import { FUEL_MIX_DATA, CAPACITY_AND_INTENSITY_DATA, ALL_ENERGY_RECORDS, HISTORICAL_YEARS } from '../data/energyData';
import { PROVENANCE_RECORDS } from '../data/provenance';

export class DataService {
  public static getCountries(): Country[] {
    return COUNTRIES;
  }

  public static getCountry(id: string): Country | undefined {
    return COUNTRY_LOOKUP[id.toLowerCase()];
  }

  public static getIndicators(): Indicator[] {
    return INDICATORS;
  }

  public static getIndicator(id: string): Indicator | undefined {
    return INDICATOR_LOOKUP[id];
  }

  public static getAvailableYears(): number[] {
    return HISTORICAL_YEARS;
  }

  public static getCountryFuelMix(countryId: string): FuelMixRecord[] {
    return FUEL_MIX_DATA[countryId.toLowerCase()] || [];
  }

  public static getCountryTimeSeries(countryId: string, indicatorId: string): { year: number; value: number }[] {
    const records = ALL_ENERGY_RECORDS.filter(
      r => r.countryId === countryId.toLowerCase() && r.indicatorId === indicatorId
    );
    return records.map(r => ({ year: r.year, value: r.value })).sort((a, b) => a.year - b.year);
  }

  public static getCountryProfile(countryId: string): CountryProfile | null {
    const country = this.getCountry(countryId);
    if (!country) return null;

    const fuelMix = this.getCountryFuelMix(country.id);
    const latestFuel = fuelMix[fuelMix.length - 1];
    const latestYear = latestFuel ? latestFuel.year : 2024;
    const caps = (CAPACITY_AND_INTENSITY_DATA[country.id] && CAPACITY_AND_INTENSITY_DATA[country.id][latestYear]) || {
      solarCapacity: 0,
      windCapacity: 0,
      hydroCapacity: 0,
      emissionsIntensity: 0
    };

    const timeSeriesMap: Record<string, { year: number; value: number }[]> = {};
    INDICATORS.forEach(ind => {
      timeSeriesMap[ind.id] = this.getCountryTimeSeries(country.id, ind.id);
    });

    return {
      country,
      latestYear,
      latestStats: {
        totalGenerationTWh: latestFuel ? latestFuel.total : 0,
        renewableSharePercent: latestFuel ? latestFuel.renewableShare : 0,
        solarCapacityGW: caps.solarCapacity,
        windCapacityGW: caps.windCapacity,
        hydroCapacityGW: caps.hydroCapacity,
        nuclearGenerationTWh: latestFuel ? latestFuel.nuclear : 0,
        emissionsIntensityGCO2: caps.emissionsIntensity
      },
      fuelMixHistory: fuelMix,
      timeSeries: timeSeriesMap,
      dataSources: PROVENANCE_RECORDS
    };
  }

  public static getMultiCountryComparison(countryIds: string[], indicatorId: string) {
    const indicator = this.getIndicator(indicatorId) || INDICATORS[0];
    const years = this.getAvailableYears();

    // Chart trend series: Array of { year, [countryId]: value }
    const trendData = years.map(yr => {
      const row: Record<string, any> = { year: yr };
      countryIds.forEach(cId => {
        const match = ALL_ENERGY_RECORDS.find(
          r => r.countryId === cId && r.indicatorId === indicator.id && r.year === yr
        );
        if (match) {
          row[cId] = match.value;
        }
      });
      return row;
    });

    // Single-year snapshot (latest 2024) for bar chart & comparison cards
    const latestYear = 2024;
    const snapshotData = countryIds.map(cId => {
      const country = this.getCountry(cId);
      const match = ALL_ENERGY_RECORDS.find(
        r => r.countryId === cId && r.indicatorId === indicator.id && r.year === latestYear
      );
      return {
        countryId: cId,
        countryName: country ? country.name : cId,
        year: latestYear,
        value: match ? match.value : 0,
        unit: indicator.unit
      };
    });

    return {
      indicator,
      trendData,
      snapshotData
    };
  }

  public static queryRecords(filters: ExplorerFilters): EnergyDataRecord[] {
    let results = ALL_ENERGY_RECORDS.filter(r => r.indicatorId === filters.indicatorId);

    if (filters.countryIds && filters.countryIds.length > 0) {
      const set = new Set(filters.countryIds.map(id => id.toLowerCase()));
      results = results.filter(r => set.has(r.countryId));
    }

    if (filters.year !== 'all') {
      results = results.filter(r => r.year === Number(filters.year));
    }

    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(r => 
        r.countryName.toLowerCase().includes(q) ||
        r.year.toString().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.value.toString().includes(q)
      );
    }

    // Sort
    results.sort((a, b) => {
      let comparison = 0;
      if (filters.sortBy === 'country') {
        comparison = a.countryName.localeCompare(b.countryName);
      } else if (filters.sortBy === 'year') {
        comparison = a.year - b.year;
      } else if (filters.sortBy === 'value') {
        comparison = a.value - b.value;
      }
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return results;
  }

  public static getGlobalOverviewHeadline() {
    // Sum aggregates across the 8 key monitored economies for 2024
    const records2024 = ALL_ENERGY_RECORDS.filter(r => r.year === 2024);
    
    const sumIndicator = (indId: string) => {
      return records2024
        .filter(r => r.indicatorId === indId)
        .reduce((sum, r) => sum + r.value, 0);
    };

    const totalGen = sumIndicator('electricity_generation');
    const renewGen = sumIndicator('renewable_generation');
    const solarCap = sumIndicator('solar_capacity');
    const windCap = sumIndicator('wind_capacity');
    const avgRenewShare = totalGen > 0 ? (renewGen / totalGen) * 100 : 0;

    return {
      year: 2024,
      totalGenerationTWh: totalGen,
      renewableGenerationTWh: renewGen,
      renewableSharePercent: avgRenewShare,
      solarCapacityGW: solarCap,
      windCapacityGW: windCap,
      economiesCovered: COUNTRIES.length,
      sampleSource: 'Synthesized from IEA, Ember GER & IRENA reporting frameworks'
    };
  }
}
