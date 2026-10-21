import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactBand } from '@/components/site-sections';
import { WorkGallery } from '@/components/work-gallery';
import { pageHead } from '@/lib/site-data';
import { findWork, works } from '@/lib/work-data';

export const Route = createFileRoute('/trabajos_/$trabajoId')({
  loader: ({ params }) => {
    const work = findWork(params.trabajoId);
    if (!work) throw notFound();
    return work;
  },
  head: ({ loaderData }) => loaderData ? pageHead(loaderData.title, loaderData.summary) : { ...pageHead('Trabajo no disponible', 'El trabajo solicitado no está disponible.'), meta: [...pageHead('Trabajo no disponible', 'El trabajo solicitado no está disponible.').meta, { name: 'robots', content: 'noindex' }] },
  component: WorkDetail,
  notFoundComponent: () => <section className="section-space site-width"><h1 className="section-title">Trabajo no encontrado</h1><Button asChild variant="link" className="mt-6 px-0"><Link to="/trabajos"><ArrowLeft />Volver a nuestros trabajos</Link></Button></section>,
});

function WorkDetail() {
  const work = Route.useLoaderData();
  const next = works[(works.findIndex(item => item.id === work.id) + 1) % works.length];
  return <><section className="work-detail-heading"><div className="site-width"><Button asChild variant="link" className="mb-8 h-auto p-0"><Link to="/trabajos"><ArrowLeft />Nuestros trabajos</Link></Button><div className="eyebrow">{work.category} · Caso {work.number}</div><h1>{work.title}</h1><p className="body-copy mt-5 max-w-2xl">{work.summary}</p></div></section><section className="section-space"><div className="site-width"><p className="work-example-note">Caso e imágenes ilustrativos; no es una obra documentada de la empresa. Registro audiovisual real pendiente.</p><div className="work-detail-grid"><div className="work-description"><div className="eyebrow">El proyecto</div><h2 className="section-title">El punto de partida</h2><p className="body-copy mt-5">{work.context}</p><h2 className="mt-9 text-2xl font-medium">La intervención</h2><p className="body-copy mt-5">{work.intervention}</p><h3 className="mt-9 text-lg font-medium">Etapas de trabajo</h3><ol className="work-stages">{work.stages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, '0')}</span>{stage}</li>)}</ol><Button asChild className="mt-8"><Link to="/contacto">Consultar por una obra similar <ArrowUpRight /></Link></Button></div><WorkGallery key={work.id} title={work.title} media={work.media} /></div>{next && <div className="work-next"><span className="text-xs text-muted-foreground">Siguiente trabajo</span><Link to="/trabajos/$trabajoId" params={{ trabajoId: next.id }} className="flex items-center gap-5 text-xl font-medium text-primary">{next.title}<ArrowUpRight className="shrink-0" /></Link></div>}</div></section><ContactBand /></>;
}