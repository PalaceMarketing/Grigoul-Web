import { createFileRoute } from "@tanstack/react-router";
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ArrowDown, ShieldCheck, HardHat, Layers3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AboutSection, ContactBand, ServicesSection } from '@/components/site-sections';
import { pageHead } from '@/lib/site-data';
import hero from '@/assets/foundation-site.jpg';
export const Route = createFileRoute("/")({
  head: () => pageHead('Pilotes, submuraciones y estudios de suelos', 'Griguol e Hijos. Soluciones de fundación para proyectos de arquitectura y construcción. Conocé nuestros servicios y consultá por tu obra.'),
  component: Index,
});
function Index() {
  return <><section className="hero"><img src={hero} alt="Imagen ilustrativa de equipo de perforación para pilotes en obra" className="hero-photo" width={1920} height={1024} fetchPriority="high" /><div className="site-width"><div className="eyebrow">Griguol e Hijos · Ingeniería de fundaciones</div><h1>Cimientos sólidos.<br />Proyectos seguros.</h1><p className="hero-copy">Pilotes, submuraciones y estudios de suelos.<br />Soluciones técnicas para construir con confianza,<br className="hidden md:block" /> desde la primera etapa de tu obra.</p><div className="hero-buttons"><Button asChild variant="hero" size="lg" className="h-12 px-6 text-xs"><Link to="/servicios">Nuestros servicios <ArrowUpRight /></Link></Button><Button asChild variant="heroOutline" size="lg" className="h-12 px-6 text-xs"><Link to="/contacto">Hablemos de tu proyecto <ArrowUpRight /></Link></Button></div></div><div className="hero-bottom site-width"><span>PRECISIÓN TÉCNICA. COMPROMISO EN OBRA.</span><span className="flex items-center gap-3">CONOCÉ GRIGUOL <ArrowDown size={14} /></span></div></section><section className="expertise-strip"><div className="site-width grid grid-cols-3"><div className="strip-item"><ShieldCheck />Soluciones para cada terreno</div><div className="strip-item"><HardHat />Compromiso profesional</div><div className="strip-item"><Layers3 />De la base al proyecto</div></div></section><ServicesSection /><AboutSection /><ContactBand /></>;
}
