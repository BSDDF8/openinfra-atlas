export interface ExplorerFilters {
  indicatorId: string;
  countryIds: string[];
  year: number | 'all';
  searchQuery: string;
  sortBy: 'country' | 'year' | 'value';
  sortOrder: 'asc' | 'desc';
  viewMode: 'table' | 'chart';
}

export interface ComparisonFilters {
  selectedCountries: string[]; // 2 to 4 countries
  indicatorId: string;
  year: number;
}
