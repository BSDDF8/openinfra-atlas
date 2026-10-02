import { EnergyDataRecord } from '../types/energy';

export class CsvService {
  /**
   * Escape standard CSV values compliant with RFC 4180
   */
  private static escapeCsvCell(value: any): string {
    if (value === null || value === undefined) {
      return '""';
    }
    const stringVal = String(value);
    if (stringVal.includes('"') || stringVal.includes(',') || stringVal.includes('\n') || stringVal.includes('\r')) {
      return `"${stringVal.replace(/"/g, '""')}"`;
    }
    return `"${stringVal}"`;
  }

  /**
   * Downloads array of EnergyDataRecords as CSV
   */
  public static downloadRecords(records: EnergyDataRecord[], filename = 'openinfra_data_export.csv'): void {
    if (!records || records.length === 0) {
      alert('No data rows to export.');
      return;
    }

    const headers = [
      'Country Name',
      'Country ID',
      'Indicator ID',
      'Indicator Name',
      'Year',
      'Value',
      'Unit',
      'Source Framework',
      'Dataset Classification',
      'Quality Tier'
    ];

    const rows = records.map(r => [
      this.escapeCsvCell(r.countryName),
      this.escapeCsvCell(r.countryId),
      this.escapeCsvCell(r.indicatorId),
      this.escapeCsvCell(r.indicatorName),
      this.escapeCsvCell(r.year),
      this.escapeCsvCell(r.value),
      this.escapeCsvCell(r.unit),
      this.escapeCsvCell(r.source),
      this.escapeCsvCell(r.sourceType),
      this.escapeCsvCell(r.dataQualityRating || 'High')
    ].join(','));

    // Prepend metadata comments as common in statistical agencies (EIA/World Bank)
    const metadataHeader = [
      `# OpenInfra Atlas Data Export`,
      `# Export Timestamp: ${new Date().toISOString()}`,
      `# Disclaimer: Demonstration dataset modeled after public reporting frameworks (IEA, Ember, IRENA).`,
      `# License: Creative Commons Attribution 4.0 International (CC-BY-4.0)`
    ].join('\r\n');

    const csvContent = `${metadataHeader}\r\n${headers.map(h => this.escapeCsvCell(h)).join(',')}\r\n${rows.join('\r\n')}`;
    this.triggerDownload(csvContent, filename);
  }

  /**
   * Generic tabular data export for arbitrary rows and columns
   */
  public static downloadCustomTable(headers: string[], rows: (string | number)[][], filename: string): void {
    const formattedHeaders = headers.map(h => this.escapeCsvCell(h)).join(',');
    const formattedRows = rows.map(row => row.map(cell => this.escapeCsvCell(cell)).join(',')).join('\r\n');
    
    const metadataHeader = [
      `# OpenInfra Atlas Data Export`,
      `# Generated: ${new Date().toISOString()}`,
      `# Note: Curated public infrastructure reference indicators.`
    ].join('\r\n');

    const csvContent = `${metadataHeader}\r\n${formattedHeaders}\r\n${formattedRows}`;
    this.triggerDownload(csvContent, filename);
  }

  private static triggerDownload(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
