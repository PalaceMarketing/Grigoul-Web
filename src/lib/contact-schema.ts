import { z } from 'zod';
export const contactServices = ['Pilotes', 'Submuraciones', 'Estudios de suelos', 'Consulta general'] as const;
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Ingresá tu nombre.').max(100, 'Máximo 100 caracteres.'),
  email: z.string().trim().email('Ingresá un correo válido.').max(255),
  phone: z.string().trim().max(40).regex(/^[0-9+() .-]*$/, 'Ingresá un teléfono válido.'),
  service: z.enum(contactServices, { errorMap: () => ({ message: 'Seleccioná un servicio.' }) }),
  message: z.string().trim().min(10, 'Contanos un poco más: al menos 10 caracteres.').max(2000, 'Máximo 2000 caracteres.'),
});