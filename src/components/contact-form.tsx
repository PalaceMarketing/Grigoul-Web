import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactSchema, contactServices } from '@/lib/contact-schema';


export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'phone' | 'service' | 'message', string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [reference, setReference] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map(issue => [String(issue.path[0]), issue.message]))); return; }
    setErrors({}); setStatus('sending');
    try {
  const res = await fetch('/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  });
  if (!res.ok) { setStatus('error'); return; }
  const data = await res.json();
  setReference(data.reference);
  setStatus('sent');
  form.reset();
} catch { setStatus('error'); }
  }
  if (status === 'sent') return <div className="form-status" role="status"><CheckCircle2 className="mb-4" /><h2 className="text-xl font-medium">Tu consulta quedó registrada.</h2><p className="mt-3 leading-relaxed">Gracias por contactarte con Griguol e Hijos.</p><p className="mt-3 text-xs">Referencia: {reference}</p><Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>Enviar otra consulta <ArrowUpRight /></Button></div>;
  return <form onSubmit={submit} noValidate className="grid gap-6"><div className="grid gap-6 sm:grid-cols-2">
    <label className="form-field">Nombre y apellido *<Input name="name" autoComplete="name" maxLength={100} className="form-control" placeholder="Tu nombre" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="field-error">{errors.name}</span>}</label>
    <label className="form-field">Correo electrónico *<Input name="email" type="email" autoComplete="email" maxLength={255} className="form-control" placeholder="nombre@correo.com" aria-invalid={Boolean(errors.email)} />{errors.email && <span className="field-error">{errors.email}</span>}</label>
    <label className="form-field">Teléfono<Input name="phone" type="tel" autoComplete="tel" maxLength={40} className="form-control" placeholder="Código de área y número" aria-invalid={Boolean(errors.phone)} />{errors.phone && <span className="field-error">{errors.phone}</span>}</label>
    <label className="form-field">Servicio de interés *<select name="service" defaultValue="" className="form-control w-full border border-input px-3 text-foreground focus:outline-none focus:ring-1 focus:ring-ring" aria-invalid={Boolean(errors.service)}><option value="" disabled>Seleccioná un servicio</option>{contactServices.map(service => <option key={service}>{service}</option>)}</select>{errors.service && <span className="field-error">{errors.service}</span>}</label>
  </div><label className="form-field">Contanos sobre tu proyecto *<Textarea name="message" maxLength={2000} className="form-control min-h-36" placeholder="Tipo de obra, ubicación y necesidades del proyecto…" aria-invalid={Boolean(errors.message)} />{errors.message && <span className="field-error">{errors.message}</span>}</label><p className="text-xs leading-relaxed text-muted-foreground">Usaremos tus datos únicamente para gestionar esta consulta.</p>{status === 'error' && <p role="alert" className="field-error">No pudimos registrar tu consulta. Por favor, intentá nuevamente.</p>}<Button type="submit" disabled={status === 'sending'} className="h-12 justify-self-start rounded-sm px-7">{status === 'sending' ? <>Enviando <Loader2 className="animate-spin" /></> : <>Enviar consulta <ArrowUpRight /></>}</Button></form>;
}