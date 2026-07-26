/** Backend serializes Decimal fields as strings (e.g. "17500.00") — parse before formatting. */
export function formatPrice(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (Number.isNaN(num)) return '';
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

export function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return Number.isNaN(num) ? 0 : num;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
