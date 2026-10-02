import { FuelMixRecord, EnergyDataRecord } from '../types/energy';
import { COUNTRIES } from './countries';
import { INDICATORS } from './indicators';

export const HISTORICAL_YEARS = [2015, 2017, 2019, 2021, 2023, 2024];

export const FUEL_MIX_DATA: Record<string, FuelMixRecord[]> = {
  'india': [
    { year: 2015, coal: 990, gas: 50, nuclear: 38, hydro: 140, wind: 33, solar: 7, bioenergy: 20, other: 12, total: 1290, renewableShare: 15.5 },
    { year: 2017, coal: 1140, gas: 50, nuclear: 37, hydro: 142, wind: 53, solar: 21, bioenergy: 25, other: 12, total: 1480, renewableShare: 16.3 },
    { year: 2019, coal: 1190, gas: 55, nuclear: 45, hydro: 161, wind: 63, solar: 46, bioenergy: 30, other: 10, total: 1600, renewableShare: 18.8 },
    { year: 2021, coal: 1260, gas: 40, nuclear: 44, hydro: 160, wind: 68, solar: 69, bioenergy: 33, other: 11, total: 1685, renewableShare: 19.6 },
    { year: 2023, coal: 1470, gas: 35, nuclear: 48, hydro: 150, wind: 82, solar: 113, bioenergy: 36, other: 11, total: 1945, renewableShare: 19.6 },
    { year: 2024, coal: 1530, gas: 36, nuclear: 51, hydro: 155, wind: 91, solar: 138, bioenergy: 39, other: 10, total: 2050, renewableShare: 20.6 }
  ],
  'united-states': [
    { year: 2015, coal: 1350, gas: 1330, nuclear: 797, hydro: 249, wind: 191, solar: 39, bioenergy: 64, other: 70, total: 4090, renewableShare: 13.3 },
    { year: 2017, coal: 1206, gas: 1296, nuclear: 805, hydro: 300, wind: 254, solar: 77, bioenergy: 62, other: 35, total: 4035, renewableShare: 17.2 },
    { year: 2019, coal: 965, gas: 1586, nuclear: 809, hydro: 288, wind: 296, solar: 107, bioenergy: 59, other: 17, total: 4127, renewableShare: 18.2 },
    { year: 2021, coal: 898, gas: 1575, nuclear: 778, hydro: 260, wind: 378, solar: 164, bioenergy: 54, other: 9, total: 4116, renewableShare: 20.8 },
    { year: 2023, coal: 675, gas: 1802, nuclear: 775, hydro: 240, wind: 425, solar: 238, bioenergy: 52, other: 8, total: 4215, renewableShare: 22.7 },
    { year: 2024, coal: 630, gas: 1845, nuclear: 780, hydro: 245, wind: 455, solar: 290, bioenergy: 50, other: 8, total: 4303, renewableShare: 24.2 }
  ],
  'china': [
    { year: 2015, coal: 4110, gas: 166, nuclear: 171, hydro: 1110, wind: 186, solar: 39, bioenergy: 52, other: 26, total: 5860, renewableShare: 23.7 },
    { year: 2017, coal: 4540, gas: 200, nuclear: 248, hydro: 1190, wind: 305, solar: 118, bioenergy: 79, other: 20, total: 6700, renewableShare: 25.3 },
    { year: 2019, coal: 5040, gas: 230, nuclear: 348, hydro: 1300, wind: 405, solar: 224, bioenergy: 111, other: 12, total: 7670, renewableShare: 26.6 },
    { year: 2021, coal: 5330, gas: 272, nuclear: 407, hydro: 1340, wind: 656, solar: 327, bioenergy: 164, other: 14, total: 8510, renewableShare: 29.2 },
    { year: 2023, coal: 5780, gas: 285, nuclear: 433, hydro: 1230, wind: 886, solar: 584, bioenergy: 198, other: 14, total: 9410, renewableShare: 30.8 },
    { year: 2024, coal: 5890, gas: 295, nuclear: 445, hydro: 1350, wind: 1010, solar: 820, bioenergy: 210, other: 15, total: 10035, renewableShare: 33.8 }
  ],
  'germany': [
    { year: 2015, coal: 273, gas: 62, nuclear: 92, hydro: 25, wind: 79, solar: 39, bioenergy: 51, other: 26, total: 647, renewableShare: 29.8 },
    { year: 2017, coal: 245, gas: 87, nuclear: 76, hydro: 26, wind: 106, solar: 39, bioenergy: 51, other: 24, total: 654, renewableShare: 34.0 },
    { year: 2019, coal: 171, gas: 91, nuclear: 75, hydro: 27, wind: 126, solar: 46, bioenergy: 50, other: 23, total: 609, renewableShare: 40.9 },
    { year: 2021, coal: 163, gas: 90, nuclear: 69, hydro: 25, wind: 114, solar: 49, bioenergy: 50, other: 27, total: 588, renewableShare: 40.5 },
    { year: 2023, coal: 133, gas: 79, nuclear: 7, hydro: 25, wind: 140, solar: 60, bioenergy: 49, other: 16, total: 509, renewableShare: 53.8 },
    { year: 2024, coal: 108, gas: 77, nuclear: 0, hydro: 26, wind: 146, solar: 68, bioenergy: 48, other: 15, total: 488, renewableShare: 59.0 }
  ],
  'japan': [
    { year: 2015, coal: 343, gas: 405, nuclear: 9, hydro: 87, wind: 5, solar: 35, bioenergy: 26, other: 120, total: 1030, renewableShare: 14.8 },
    { year: 2017, coal: 345, gas: 408, nuclear: 33, hydro: 88, wind: 6, solar: 55, bioenergy: 31, other: 84, total: 1050, renewableShare: 17.1 },
    { year: 2019, coal: 324, gas: 383, nuclear: 66, hydro: 87, wind: 8, solar: 69, bioenergy: 37, other: 44, total: 1018, renewableShare: 19.7 },
    { year: 2021, coal: 310, gas: 350, nuclear: 71, hydro: 86, wind: 9, solar: 83, bioenergy: 42, other: 39, total: 990, renewableShare: 22.2 },
    { year: 2023, coal: 295, gas: 330, nuclear: 78, hydro: 84, wind: 11, solar: 92, bioenergy: 45, other: 30, total: 965, renewableShare: 24.0 },
    { year: 2024, coal: 290, gas: 320, nuclear: 82, hydro: 85, wind: 12, solar: 98, bioenergy: 48, other: 25, total: 960, renewableShare: 25.3 }
  ],
  'brazil': [
    { year: 2015, coal: 23, gas: 80, nuclear: 15, hydro: 360, wind: 22, solar: 0.1, bioenergy: 53, other: 57, total: 610, renewableShare: 71.3 },
    { year: 2017, coal: 20, gas: 70, nuclear: 16, hydro: 371, wind: 42, solar: 1, bioenergy: 54, other: 36, total: 610, renewableShare: 76.7 },
    { year: 2019, coal: 15, gas: 60, nuclear: 16, hydro: 398, wind: 56, solar: 7, bioenergy: 54, other: 25, total: 631, renewableShare: 81.6 },
    { year: 2021, coal: 21, gas: 88, nuclear: 15, hydro: 363, wind: 72, solar: 17, bioenergy: 56, other: 18, total: 650, renewableShare: 78.2 },
    { year: 2023, coal: 14, gas: 48, nuclear: 15, hydro: 428, wind: 96, solar: 51, bioenergy: 53, other: 8, total: 713, renewableShare: 88.1 },
    { year: 2024, coal: 12, gas: 45, nuclear: 15, hydro: 432, wind: 102, solar: 55, bioenergy: 52, other: 6, total: 719, renewableShare: 89.2 }
  ],
  'united-kingdom': [
    { year: 2015, coal: 76, gas: 100, nuclear: 70, hydro: 9, wind: 40, solar: 8, bioenergy: 29, other: 7, total: 339, renewableShare: 25.4 },
    { year: 2017, coal: 23, gas: 137, nuclear: 70, hydro: 8, wind: 50, solar: 12, bioenergy: 32, other: 6, total: 338, renewableShare: 30.2 },
    { year: 2019, coal: 7, gas: 129, nuclear: 56, hydro: 8, wind: 64, solar: 13, bioenergy: 37, other: 10, total: 324, renewableShare: 37.7 },
    { year: 2021, coal: 6, gas: 123, nuclear: 46, hydro: 7, wind: 65, solar: 12, bioenergy: 40, other: 9, total: 308, renewableShare: 40.3 },
    { year: 2023, coal: 3, gas: 98, nuclear: 41, hydro: 8, wind: 82, solar: 14, bioenergy: 41, other: 8, total: 295, renewableShare: 49.2 },
    { year: 2024, coal: 0, gas: 85, nuclear: 39, hydro: 8, wind: 88, solar: 16, bioenergy: 42, other: 7, total: 285, renewableShare: 54.0 }
  ],
  'france': [
    { year: 2015, coal: 9, gas: 22, nuclear: 437, hydro: 59, wind: 21, solar: 7, bioenergy: 10, other: 3, total: 568, renewableShare: 17.1 },
    { year: 2017, coal: 12, gas: 41, nuclear: 400, hydro: 53, wind: 24, solar: 9, bioenergy: 10, other: 4, total: 553, renewableShare: 17.4 },
    { year: 2019, coal: 2, gas: 39, nuclear: 399, hydro: 61, wind: 34, solar: 12, bioenergy: 11, other: 2, total: 560, renewableShare: 21.1 },
    { year: 2021, coal: 4, gas: 33, nuclear: 379, hydro: 62, wind: 37, solar: 15, bioenergy: 11, other: 3, total: 544, renewableShare: 23.0 },
    { year: 2023, coal: 2, gas: 30, nuclear: 336, hydro: 59, wind: 51, solar: 22, bioenergy: 12, other: 2, total: 514, renewableShare: 28.0 },
    { year: 2024, coal: 1, gas: 26, nuclear: 365, hydro: 68, wind: 49, solar: 24, bioenergy: 12, other: 2, total: 547, renewableShare: 28.0 }
  ]
};

export const CAPACITY_AND_INTENSITY_DATA: Record<string, Record<number, {
  solarCapacity: number;
  windCapacity: number;
  hydroCapacity: number;
  emissionsIntensity: number;
}>> = {
  'india': {
    2015: { solarCapacity: 6.7, windCapacity: 25.1, hydroCapacity: 44.6, emissionsIntensity: 740 },
    2017: { solarCapacity: 18.1, windCapacity: 32.8, hydroCapacity: 45.3, emissionsIntensity: 720 },
    2019: { solarCapacity: 35.0, windCapacity: 37.5, hydroCapacity: 45.8, emissionsIntensity: 680 },
    2021: { solarCapacity: 49.3, windCapacity: 40.1, hydroCapacity: 46.5, emissionsIntensity: 670 },
    2023: { solarCapacity: 73.3, windCapacity: 44.7, hydroCapacity: 46.9, emissionsIntensity: 690 },
    2024: { solarCapacity: 90.8, windCapacity: 47.4, hydroCapacity: 47.2, emissionsIntensity: 675 }
  },
  'united-states': {
    2015: { solarCapacity: 23.4, windCapacity: 72.6, hydroCapacity: 79.6, emissionsIntensity: 458 },
    2017: { solarCapacity: 43.3, windCapacity: 87.5, hydroCapacity: 79.8, emissionsIntensity: 420 },
    2019: { solarCapacity: 62.3, windCapacity: 103.6, hydroCapacity: 80.1, emissionsIntensity: 385 },
    2021: { solarCapacity: 95.2, windCapacity: 132.7, hydroCapacity: 80.3, emissionsIntensity: 365 },
    2023: { solarCapacity: 139.2, windCapacity: 147.5, hydroCapacity: 80.2, emissionsIntensity: 350 },
    2024: { solarCapacity: 178.5, windCapacity: 154.2, hydroCapacity: 80.4, emissionsIntensity: 338 }
  },
  'china': {
    2015: { solarCapacity: 43.5, windCapacity: 130.8, hydroCapacity: 319.5, emissionsIntensity: 620 },
    2017: { solarCapacity: 130.4, windCapacity: 163.7, hydroCapacity: 341.2, emissionsIntensity: 585 },
    2019: { solarCapacity: 204.7, windCapacity: 210.1, hydroCapacity: 356.4, emissionsIntensity: 560 },
    2021: { solarCapacity: 306.6, windCapacity: 328.5, hydroCapacity: 391.0, emissionsIntensity: 535 },
    2023: { solarCapacity: 609.4, windCapacity: 441.3, hydroCapacity: 421.5, emissionsIntensity: 520 },
    2024: { solarCapacity: 880.0, windCapacity: 510.0, hydroCapacity: 425.0, emissionsIntensity: 490 }
  },
  'germany': {
    2015: { solarCapacity: 39.3, windCapacity: 44.9, hydroCapacity: 11.2, emissionsIntensity: 480 },
    2017: { solarCapacity: 42.3, windCapacity: 55.9, hydroCapacity: 11.2, emissionsIntensity: 440 },
    2019: { solarCapacity: 49.0, windCapacity: 61.4, hydroCapacity: 11.2, emissionsIntensity: 380 },
    2021: { solarCapacity: 59.4, windCapacity: 63.8, hydroCapacity: 11.2, emissionsIntensity: 375 },
    2023: { solarCapacity: 81.7, windCapacity: 69.5, hydroCapacity: 11.2, emissionsIntensity: 310 },
    2024: { solarCapacity: 94.2, windCapacity: 73.8, hydroCapacity: 11.3, emissionsIntensity: 270 }
  },
  'japan': {
    2015: { solarCapacity: 34.4, windCapacity: 3.1, hydroCapacity: 49.8, emissionsIntensity: 550 },
    2017: { solarCapacity: 48.6, windCapacity: 3.5, hydroCapacity: 49.9, emissionsIntensity: 510 },
    2019: { solarCapacity: 63.2, windCapacity: 4.0, hydroCapacity: 50.0, emissionsIntensity: 480 },
    2021: { solarCapacity: 74.2, windCapacity: 4.5, hydroCapacity: 50.1, emissionsIntensity: 450 },
    2023: { solarCapacity: 84.1, windCapacity: 5.2, hydroCapacity: 50.2, emissionsIntensity: 425 },
    2024: { solarCapacity: 88.5, windCapacity: 5.6, hydroCapacity: 50.2, emissionsIntensity: 410 }
  },
  'brazil': {
    2015: { solarCapacity: 0.1, windCapacity: 8.7, hydroCapacity: 95.3, emissionsIntensity: 145 },
    2017: { solarCapacity: 1.1, windCapacity: 12.3, hydroCapacity: 100.3, emissionsIntensity: 130 },
    2019: { solarCapacity: 4.6, windCapacity: 15.4, hydroCapacity: 108.9, emissionsIntensity: 110 },
    2021: { solarCapacity: 13.7, windCapacity: 21.6, hydroCapacity: 109.4, emissionsIntensity: 125 },
    2023: { solarCapacity: 37.1, windCapacity: 28.7, hydroCapacity: 109.8, emissionsIntensity: 85 },
    2024: { solarCapacity: 44.5, windCapacity: 32.4, hydroCapacity: 110.0, emissionsIntensity: 70 }
  },
  'united-kingdom': {
    2015: { solarCapacity: 9.5, windCapacity: 14.5, hydroCapacity: 4.3, emissionsIntensity: 340 },
    2017: { solarCapacity: 12.8, windCapacity: 19.8, hydroCapacity: 4.5, emissionsIntensity: 260 },
    2019: { solarCapacity: 13.6, windCapacity: 24.1, hydroCapacity: 4.7, emissionsIntensity: 215 },
    2021: { solarCapacity: 14.2, windCapacity: 26.8, hydroCapacity: 4.7, emissionsIntensity: 185 },
    2023: { solarCapacity: 15.7, windCapacity: 29.6, hydroCapacity: 4.8, emissionsIntensity: 145 },
    2024: { solarCapacity: 16.8, windCapacity: 31.2, hydroCapacity: 4.8, emissionsIntensity: 130 }
  },
  'france': {
    2015: { solarCapacity: 6.6, windCapacity: 10.3, hydroCapacity: 25.4, emissionsIntensity: 60 },
    2017: { solarCapacity: 8.0, windCapacity: 13.5, hydroCapacity: 25.5, emissionsIntensity: 58 },
    2019: { solarCapacity: 10.6, windCapacity: 16.5, hydroCapacity: 25.5, emissionsIntensity: 52 },
    2021: { solarCapacity: 14.7, windCapacity: 18.7, hydroCapacity: 25.6, emissionsIntensity: 48 },
    2023: { solarCapacity: 19.0, windCapacity: 22.4, hydroCapacity: 25.7, emissionsIntensity: 42 },
    2024: { solarCapacity: 22.0, windCapacity: 23.5, hydroCapacity: 25.7, emissionsIntensity: 40 }
  }
};

/**
 * Compiles flattened tabular records for the Explorer and Data Export features.
 */
export function generateFlatEnergyRecords(): EnergyDataRecord[] {
  const records: EnergyDataRecord[] = [];

  COUNTRIES.forEach(country => {
    const fuelHistory = FUEL_MIX_DATA[country.id] || [];
    const capHistory = CAPACITY_AND_INTENSITY_DATA[country.id] || {};

    fuelHistory.forEach(fm => {
      const year = fm.year;
      const caps = capHistory[year] || { solarCapacity: 0, windCapacity: 0, hydroCapacity: 0, emissionsIntensity: 0 };
      const renewableGen = Number((fm.hydro + fm.wind + fm.solar + fm.bioenergy).toFixed(1));
      const fossilGen = Number((fm.coal + fm.gas + (fm.other || 0)).toFixed(1));

      const indicatorValues: Record<string, number> = {
        'electricity_generation': fm.total,
        'renewable_generation': renewableGen,
        'renewable_share': fm.renewableShare,
        'solar_capacity': caps.solarCapacity,
        'wind_capacity': caps.windCapacity,
        'hydro_capacity': caps.hydroCapacity,
        'nuclear_generation': fm.nuclear,
        'fossil_generation': fossilGen,
        'emissions_intensity': caps.emissionsIntensity
      };

      INDICATORS.forEach(ind => {
        const val = indicatorValues[ind.id];
        if (val !== undefined) {
          records.push({
            id: `${country.id}-${ind.id}-${year}`,
            countryId: country.id,
            countryName: country.name,
            year: year,
            indicatorId: ind.id,
            indicatorName: ind.name,
            value: val,
            unit: ind.unit,
            source: ind.sourceStandard,
            sourceType: 'Demonstration dataset',
            dataQualityRating: 'High'
          });
        }
      });
    });
  });

  return records;
}

export const ALL_ENERGY_RECORDS: EnergyDataRecord[] = generateFlatEnergyRecords();
