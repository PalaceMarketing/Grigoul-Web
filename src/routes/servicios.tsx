import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactBand, PageIntro } from '@/components/site-sections';
import { pageHead, services } from '@/lib/site-data';
import { z } from 'zod';
import { ServiceCarousel } from '@/components/service-carousel';
export const Route = createFileRoute('/servicios')({ validateSearch: z.object({ servicio: z.string().optional() }), head: () => pageHead('Qué hacemos', 'Servicios de pilotes, submuraciones y estudios de suelos. Fundaciones profundas, intervenciones y análisis geotécnico.'), component: Servicios });
function Servicios() {
  const { servicio } = Route.useSearch();
  const ordered = servicio ? [...services].sort((a,b) => Number(b.name === servicio) - Number(a.name === servicio)) : services;
  return <><PageIntro eyebrow="Qué hacemos" title="Soluciones desde los cimientos." description="Tres especialidades, un mismo objetivo: aportar una base técnica adecuada para cada proyecto de construcción." /><div className="site-width">{ordered.map(service => <section key={service.name} className="section-space grid items-center gap-9 border-b border-border md:grid-cols-2 md:gap-16"><ServiceCarousel name={service.name} images={service.images} large /><div><div className="eyebrow">Servicio {service.number}</div><h2 className="section-title">{service.name}</h2><p className="body-copy mt-6">{service.detail}</p><div className="mt-6">{service.points.map(point => <div className="check-row" key={point}><Check />{point}</div>)}</div><Button asChild className="mt-7 h-11 rounded-sm"><Link to="/contacto">Consultar por este servicio <ArrowUpRight /></Link></Button></div></section>)}</div><ContactBand /></>;
}