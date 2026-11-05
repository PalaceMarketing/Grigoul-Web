import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { WhatsAppButton, WhatsAppFloat } from '@/components/whatsapp';
import { whatsappNumber, whatsappUrl } from '@/lib/whatsapp';

describe('WhatsApp contact link', () => {
  it('points to the owner number in international wa.me form', () => {
    expect(whatsappNumber).toBe('5493513101938');
    expect(whatsappUrl()).toBe(
      'https://wa.me/5493513101938?text=Hola%20Griguol%20e%20Hijos%2C%20quiero%20consultar%20por%20un%20proyecto.',
    );
  });

  it('opens the button link in a new tab without leaking the page', () => {
    const { container } = render(<WhatsAppButton />);
    const link = container.querySelector('a');

    expect(link?.getAttribute('href')).toBe(whatsappUrl());
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toContain('noopener');
    expect(link?.textContent).toContain('WhatsApp');
  });

  it('keeps the floating button on the same number', () => {
    const { container } = render(<WhatsAppFloat />);
    const link = container.querySelector('.whatsapp-float');

    expect(link?.getAttribute('href')).toBe(whatsappUrl());
    expect(link?.getAttribute('aria-label')).toBe('Escribinos por WhatsApp');
  });
});