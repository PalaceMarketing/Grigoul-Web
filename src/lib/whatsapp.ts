export const whatsappNumber = '5493513101938';
export const whatsappDisplay = '+54 9 351 310 1938';
export const whatsappMessage = 'Hola Griguol e Hijos, quiero consultar por un proyecto.';

export function whatsappUrl(message: string = whatsappMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}