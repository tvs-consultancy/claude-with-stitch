import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MediaPlans from './MediaPlans';
import { mockMediaPlans } from '../data/mock-data';

function getDataRowCount(): number {
  return screen.getAllByRole('row').length - 1;
}

function getStatusFilter() {
  return screen.getByRole('combobox');
}

function getSearchInput() {
  return screen.getByPlaceholderText(/filter plans/i);
}

describe('MediaPlans filter/search', () => {
  it('renders every plan by default', () => {
    render(<MediaPlans />);
    expect(getDataRowCount()).toBe(mockMediaPlans.length);
  });

  it('filters by case-insensitive search matching name or client', async () => {
    const user = userEvent.setup();
    render(<MediaPlans />);

    await user.type(getSearchInput(), 'VOSS');

    expect(getDataRowCount()).toBe(1);
    expect(screen.getByText('Voss Automotive Launch')).toBeInTheDocument();
  });

  it('filters by status alone', async () => {
    const user = userEvent.setup();
    render(<MediaPlans />);

    await user.selectOptions(getStatusFilter(), 'draft');

    const draftPlans = mockMediaPlans.filter((p) => p.status === 'draft');
    expect(getDataRowCount()).toBe(draftPlans.length);
    for (const plan of draftPlans) {
      expect(screen.getByText(plan.name)).toBeInTheDocument();
    }
  });

  it('combines search and status filter', async () => {
    const user = userEvent.setup();
    render(<MediaPlans />);

    await user.type(getSearchInput(), 'retail');
    await user.selectOptions(getStatusFilter(), 'paused');

    // Only "Global Omni-Channel Q4" (client "Lumina Retail", paused) satisfies both.
    expect(getDataRowCount()).toBe(1);
    expect(screen.getByText('Global Omni-Channel Q4')).toBeInTheDocument();
  });

  it('renders the empty state when no plan matches', async () => {
    const user = userEvent.setup();
    render(<MediaPlans />);

    await user.type(getSearchInput(), 'zzznotfound');

    expect(getDataRowCount()).toBe(0);
    expect(screen.getByText(/no plans found/i)).toBeInTheDocument();
  });
});
