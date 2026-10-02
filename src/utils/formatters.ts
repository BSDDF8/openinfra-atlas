export function formatNumber(val: number | undefined | null, digits = 1): string {
  if (val === undefined || val === null || isNaN(val)) return '—';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(val);
}

export function formatPercent(val: number | undefined | null, digits = 1): string {
  if (val === undefined || val === null || isNaN(val)) return '—';
  return `${formatNumber(val, digits)}%`;
}

export function formatValueWithUnit(val: number | undefined | null, unit: string, digits = 1): string {
  if (val === undefined || val === null || isNaN(val)) return '—';
  if (unit === '%') {
    return `${formatNumber(val, digits)}%`;
  }
  return `${formatNumber(val, digits)} ${unit}`;
}

export function formatCompactNumber(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return '—';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(val);
}
