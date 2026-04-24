import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDateRange, formatFileSize, statusColors } from './mock-data';
import type { MediaPlan } from './mock-data';

describe('formatCurrency', () => {
  it('formats a positive integer as USD without fractional digits', () => {
    expect(formatCurrency(847500)).toBe('$847,500');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0');
  });

  it('formats a negative amount with the currency symbol and magnitude', () => {
    // Intl can emit ASCII '-' or Unicode minus '−' depending on ICU build, so match on magnitude.
    expect(formatCurrency(-1000)).toMatch(/^[-−]\$1,000$/);
  });

  it('rounds fractional amounts to whole dollars', () => {
    expect(formatCurrency(1000.49)).toBe('$1,000');
    expect(formatCurrency(1000.5)).toBe('$1,001');
  });

  it('formats very large amounts', () => {
    expect(formatCurrency(2_800_000)).toBe('$2,800,000');
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'returns em-dash for non-finite input %s',
    (value) => {
      expect(formatCurrency(value)).toBe('—');
    },
  );
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

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -1])(
    'returns em-dash for invalid size %s',
    (value) => {
      expect(formatFileSize(value)).toBe('—');
    },
  );
});

describe('formatDateRange', () => {
  it.each([
    ['not-a-date', '2025-06-30'],
    ['2025-03-01', 'bogus'],
    ['', ''],
  ])('returns em-dash for invalid input (%s, %s)', (start, end) => {
    expect(formatDateRange(start, end)).toBe('—');
  });

  it('produces the expected shape for a valid range', () => {
    // Mid-month UTC noon inputs stay mid-month across every real TZ, so the regex is stable.
    expect(formatDateRange('2025-03-15T12:00:00Z', '2025-06-15T12:00:00Z')).toMatch(
      /^[A-Za-z]{3} \d{1,2} - [A-Za-z]{3} \d{1,2}, 2025$/,
    );
  });

  it('derives the year from the end date', () => {
    expect(formatDateRange('2024-12-15T12:00:00Z', '2025-01-15T12:00:00Z')).toMatch(/, 2025$/);
  });
});

describe('statusColors', () => {
  const statuses = Object.keys(statusColors) as MediaPlan['status'][];

  it.each(statuses)('maps %s to a bg-prefixed surface class and text-prefixed text class', (status) => {
    const entry = statusColors[status];
    expect(entry.bg).toMatch(/^bg-[a-z]+-surface$/);
    expect(entry.text).toMatch(/^text-[a-z]+-text$/);
  });

  it('assigns a unique bg class to each status', () => {
    const tokens = statuses.map((s) => statusColors[s].bg);
    expect(new Set(tokens).size).toBe(statuses.length);
  });
});
