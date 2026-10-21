import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/lib/contact-schema';
const valid = { name: 'Arquitecto de prueba', email: 'prueba@example.com', phone: '+54 351 1234567', service: 'Pilotes', message: 'Consulta sobre fundaciones para una obra.' };
describe('Contact inquiry validation', () => {
  it.each(['Pilotes', 'Submuraciones', 'Estudios de suelos'])('accepts the offered service %s', service => { expect(contactSchema.safeParse({ ...valid, service }).success).toBe(true); });
  it('rejects services not offered', () => { expect(contactSchema.safeParse({ ...valid, service: 'Demoliciones' }).success).toBe(false); });
  it('rejects invalid email', () => { expect(contactSchema.safeParse({ ...valid, email: 'incorrecto' }).success).toBe(false); });
  it('rejects an empty inquiry', () => { expect(contactSchema.safeParse({ ...valid, message: '' }).success).toBe(false); });
});