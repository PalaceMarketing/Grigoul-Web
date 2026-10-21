import { useEffect, useMemo, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

const AUTOPLAY_DELAY = 6000;

export function ServiceCarousel({ name, images, large = false }: { name: string; images: readonly string[]; large?: boolean }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAnimate(!query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const plugins = useMemo(() => animate ? [Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false, stopOnMouseEnter: true })] : [], [animate]);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => { api.off('select', update); api.off('reInit', update); };
  }, [api]);

  return (
    <Carousel opts={{ loop: true }} plugins={plugins} setApi={setApi} aria-label={`Imágenes de ${name}`} className={large ? 'service-carousel service-carousel-large' : 'service-carousel'}>
      <CarouselContent className="ml-0">
        {images.map((image, index) => (
          <CarouselItem key={image} className="pl-0 flex items-center justify-center" aria-label={`${index + 1} de ${images.length}`}>
            {/* Se reemplazó width/height fijos por clases para que respete el formato ancho 3:1 sin recortar */}
            <img 
              src={image} 
              alt={`Imagen ilustrativa de ${name.toLowerCase()} — ${index + 1}`} 
              className="w-full h-auto max-h-[500px] object-contain mx-auto"
              loading="lazy" 
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="carousel-controls">
        <span className="text-xs tabular-nums text-muted-foreground">{current + 1} / {images.length}</span>
        <div className="flex gap-2">
          <CarouselPrevious className="static size-8 translate-y-0 rounded-sm" aria-label={`Imagen anterior de ${name}`} title="Imagen anterior" />
          <CarouselNext className="static size-8 translate-y-0 rounded-sm" aria-label={`Imagen siguiente de ${name}`} title="Imagen siguiente" />
        </div>
      </div>
    </Carousel>
  );
}