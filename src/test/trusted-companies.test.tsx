import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TrustedCompanies } from '@/components/trusted-companies';

afterEach(() => {
  vi.unstubAllGlobals();
});

function stubReducedMotion(matches: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    onchange: null,
    dispatchEvent: () => false,
  }));
}

function visibleAlts(container: HTMLElement) {
  return Array.from(container.querySelectorAll('.trust-logo img'))
    .filter(img => img.getAttribute('alt'))
    .map(img => img.getAttribute('alt'));
}

describe('Trusted companies band', () => {
  it('shows the four client logos side by side, all visible at once', () => {
    const { container } = render(<TrustedCompanies />);

    expect(container.querySelectorAll('.trust-logo')).toHaveLength(16);
    expect(container.querySelectorAll('.trust-logo[aria-hidden="true"]')).toHaveLength(12);
    expect(visibleAlts(container)).toEqual([
      'EPEC',
      'AR-CON Constructora y Desarrollista',
      'Aguas Cordobesas',
      'Ministerio de Educación',
    ]);
  });

  it('has no counter, no progress line and no buttons', () => {
    const { container } = render(<TrustedCompanies />);

    expect(container.querySelector('.trust-count')).toBeNull();
    expect(container.querySelector('.trust-progress')).toBeNull();
    expect(container.querySelectorAll('button')).toHaveLength(0);
  });

  it('keeps all four logos visible when the visitor asks for reduced motion', () => {
    stubReducedMotion(true);
    const { container } = render(<TrustedCompanies />);

    expect(container.querySelector('.trust-band')?.getAttribute('data-motion')).toBe('reduced');
    expect(visibleAlts(container)).toHaveLength(4);
  });

  it('rolls the strip normally when motion is allowed', () => {
    stubReducedMotion(false);
    const { container } = render(<TrustedCompanies />);

    expect(container.querySelector('.trust-band')?.getAttribute('data-motion')).toBe('full');
    expect(container.querySelector('.trust-track')).not.toBeNull();
  });
});
