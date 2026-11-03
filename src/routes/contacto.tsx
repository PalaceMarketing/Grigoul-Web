import { createFileRoute } from '@tanstack/react-router';
import { ArrowDownRight, Layers3, Phone, Mail } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { PageIntro } from '@/components/site-sections';
import { pageHead } from '@/lib/site-data';

export const Route = createFileRoute('/contacto')({
  head: () =>
    pageHead(
      'Contacto',
      'Consultá a Griguol e Hijos sobre pilotes, submuraciones y estudios de suelos. Contanos las necesidades de tu proyecto.',
    ),
  component: Contacto,
});

function Contacto() {
  return (
    <>
      <PageIntro
        eyebrow="Contacto"
        title="Hablemos de tu proyecto."
        description="Contanos qué necesitás. El primer paso para una solución de fundación es conocer tu obra."
      />
      <section className="section-space">
        <div className="site-width grid gap-12 md:grid-cols-[0.8fr_1.4fr] md:gap-24">
          <div>
            <ArrowDownRight className="mb-6 size-9 text-primary" strokeWidth={1} />
            <h2 className="text-2xl font-medium">
              <br />
              El comienzo de tu obra.
            </h2>
            <p className="body-copy mt-5">
              Compartinos la ubicación, el tipo de construcción y el servicio que estás buscando.
            </p>
            <div className="mt-8 border-t border-border pt-6">
              <Layers3 className="mb-4 text-primary" strokeWidth={1.3} />
              <p className="text-sm font-medium">Griguol e Hijos</p>
              <p className="body-copy mt-2">
                Pilotes · Submuraciones
                <br />
                Estudios de suelos
              </p>
            </div>
            <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
              <a href="tel:+543513101938" className="flex items-center gap-3 hover:text-primary">
                <Phone size={18} strokeWidth={1.5} /> 351 310-1938
              </a>
              <a href="tel:+543516313626" className="flex items-center gap-3 hover:text-primary">
                <Phone size={18} strokeWidth={1.5} /> 351 631-3626
              </a>
              <a
                href="mailto:griguolwalter@hotmail.com"
                className="flex items-center gap-3 hover:text-primary"
              >
                <Mail size={18} strokeWidth={1.5} /> griguolwalter@hotmail.com
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}