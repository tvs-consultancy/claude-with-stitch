import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDateRange, formatFileSize } from './mock-data';

describe('formatCurrency', () => {
  it('formats a positive integer as USD without fractional digits', () => {
    expect(formatCurrency(847500)).toBe('$847,500');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0');
  });

  it('formats a negative amount', () => {
    expect(formatCurrency(-1000)).toBe('-$1,000');
  });

  it('rounds fractional amounts to whole dollars', () => {
    expect(formatCurrency(1000.49)).toBe('$1,000');
    expect(formatCurrency(1000.5)).toBe('$1,001');
  });

  it('formats very large amounts', () => {
    expect(formatCurrency(2_800_000)).toBe('$2,800,000');
  });

  it('returns em-dash for NaN', () => {
    expect(formatCurrency(Number.NaN)).toBe('—');
  });

  it('returns em-dash for Infinity', () => {
    expect(formatCurrency(Number.POSITIVE_INFINITY)).toBe('—');
    expect(formatCurrency(Number.NEGATIVE_INFINITY)).toBe('—');
  });
});

describe('formatFileSize', () => {
  it('handles zero bytes explicitly', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  it('formats small byte counts', () => {
    expect(formatFileSize(500)).toBe('500 Bytes');
  });

  it('uses Bytes up to 1023 and switches to KB at 1024', () => {
    expect(formatFileSize(1023)).toBe('1023 Bytes');
    expect(formatFileSize(1024)).toBe('1 KB');
  });

  it('formats megabytes with one decimal place', () => {
    expect(formatFileSize(2_516_582)).toBe('2.4 MB');
    expect(formatFileSize(245_850_931)).toBe('234.5 MB');
  });

  it('formats gigabytes', () => {
    expect(formatFileSize(1024 ** 3)).toBe('1 GB');
  });

  it('returns em-dash for NaN', () => {
    expect(formatFileSize(Number.NaN)).toBe('—');
  });

  it('returns em-dash for negative sizes', () => {
    expect(formatFileSize(-1)).toBe('—');
  });

  it('returns em-dash for Infinity', () => {
    expect(formatFileSize(Number.POSITIVE_INFINITY)).toBe('—');
  });
});

describe('formatDateRange', () => {
  it('returns em-dash when the start date is invalid', () => {
    expect(formatDateRange('not-a-date', '2025-06-30')).toBe('—');
  });

  it('returns em-dash when the end date is invalid', () => {
    expect(formatDateRange('2025-03-01', 'bogus')).toBe('—');
  });

  it('returns em-dash when both dates are empty strings', () => {
    expect(formatDateRange('', '')).toBe('—');
  });

  it('produces the expected shape for a valid range', () => {
    expect(formatDateRange('2025-03-15T12:00:00Z', '2025-06-15T12:00:00Z')).toMatch(
      /^[A-Za-z]{3} \d{1,2} - [A-Za-z]{3} \d{1,2}, 2025$/,
    );
  });

  it('derives the year from the end date', () => {
    expect(formatDateRange('2024-12-15T12:00:00Z', '2025-01-15T12:00:00Z')).toMatch(/, 2025$/);
  });
});
