import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/site-data';
import underpinning from '@/assets/ggpilotes.png';
import { ServiceCarousel } from '@/components/service-carousel';

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro"><div className="site-width"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="body-copy">{description}</p></div></section>;
}
export function ServicesSection() {
  return <section className="section-space"><div className="site-width"><div className="section-heading"><div><div className="eyebrow">Qué hacemos</div><h2 className="section-title">La base de cada proyecto.</h2></div><Link to="/servicios" className="flex items-center gap-3 text-xs text-primary">Conocé nuestros servicios <ArrowUpRight size={17} /></Link></div><div className="grid gap-6 md:grid-cols-3">{services.map(service => <article key={service.name} className="service-card"><ServiceCarousel name={service.name} images={service.images} /><Link to="/servicios" search={{ servicio: service.name }} className="block service-card-content"><span className="service-number">{service.number} /</span><h3>{service.name}</h3><p className="body-copy">{service.description}</p><span className="card-action">Conocer más <ArrowUpRight size={18} /></span></Link></article>)}</div></div></section>;
}
export function AboutSection() {
  return <section className="about-band section-space"><div className="site-width grid items-center gap-10 md:grid-cols-2 md:gap-20"><img src={underpinning} className="about-image" alt="Detalle ilustrativo de fundaciones y submuraciones" width={1200} height={912} loading="lazy" /><div><div className="eyebrow">Quiénes somos</div><h2 className="section-title">El compromiso empieza<br />desde los cimientos.</h2><p className="body-copy mt-6">En Griguol e Hijos nos dedicamos a los pilotes, las submuraciones y los estudios de suelos. Acompañamos proyectos de arquitectura y construcción con un enfoque técnico en sus fundaciones.</p><div className="mt-5">{['Un enfoque específico para cada terreno', 'Trabajo coordinado con arquitectos y profesionales', 'Compromiso con cada etapa del proyecto'].map(text => <div className="check-row" key={text}><Check />{text}</div>)}</div><Button variant="link" asChild className="mt-6 px-0"><Link to="/servicios">Conocé lo que hacemos <ArrowUpRight /></Link></Button></div></div></section>;
}
export function ContactBand() {
  return <section className="cta-band"><div className="site-width flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2>Tu próximo proyecto empieza acá.</h2><p className="mt-3 text-sm text-primary-foreground/75">Conversemos sobre el terreno y las necesidades de tu obra.</p></div><Button variant="hero" size="lg" asChild className="h-12 self-start"><Link to="/contacto">Consultar por un proyecto <ArrowRight /></Link></Button></div></section>;
}