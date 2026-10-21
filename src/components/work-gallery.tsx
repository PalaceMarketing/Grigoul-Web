import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { WorkMedia } from '@/lib/work-data';

export function WorkGallery({ title, media }: { title: string; media: WorkMedia[] }) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const selected = media[current];
  useEffect(() => {
    if (paused || expanded || selected?.type === 'video' || media.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setCurrent(value => (value + 1) % media.length), 3000);
    return () => window.clearInterval(timer);
  }, [paused, expanded, selected?.type, media.length]);
  if (!selected) return null;
  const move = (step: number) => { video.current?.pause(); setCurrent(value => (value + step + media.length) % media.length); };
  return <div className="work-gallery" aria-label={`Fotos y videos de ${title}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="work-media-frame">
      {selected.type === 'photo' ? <img src={selected.src} alt={selected.caption} width={1536} height={1024} /> : <video ref={video} key={selected.src} controls playsInline preload="metadata" poster={selected.poster} aria-label={selected.caption}><source src={selected.src} />Tu navegador no admite este video.</video>}
      {selected.type === 'photo' && <Button variant="secondary" size="icon" className="work-expand" onClick={() => setExpanded(true)} aria-label="Ampliar foto" title="Ampliar foto"><Maximize2 /></Button>}
    </div>
    <div className="work-gallery-toolbar"><p className="text-xs text-muted-foreground">{selected.caption}</p><div className="flex shrink-0 items-center gap-2"><span className="mr-2 text-xs tabular-nums text-muted-foreground">{current + 1} / {media.length}</span><Button variant="outline" size="icon" aria-label="Foto anterior" title="Foto anterior" onClick={() => move(-1)}><ArrowLeft /></Button><Button variant="outline" size="icon" aria-label="Foto siguiente" title="Foto siguiente" onClick={() => move(1)}><ArrowRight /></Button></div></div>
    <div className="work-thumbnails">{media.map((item, index) => <Button key={item.src} variant="ghost" className="work-thumbnail" aria-label={`${item.type === 'video' ? 'Video' : 'Foto'} ${index + 1}`} aria-pressed={current === index} onClick={() => { video.current?.pause(); setCurrent(index); }}><img src={item.type === 'photo' ? item.src : item.poster} alt="" width={160} height={110} loading="lazy" />{item.type === 'video' && <Play className="absolute text-primary-foreground" />}</Button>)}</div>
    <Dialog open={expanded} onOpenChange={setExpanded}><DialogContent className="work-lightbox"><DialogTitle className="sr-only">{title} — {selected.caption}</DialogTitle>{selected.type === 'photo' && <img src={selected.src} alt={selected.caption} width={1536} height={1024} />}<div className="flex items-center justify-between gap-4"><Button variant="outline" size="icon" aria-label="Foto anterior ampliada" onClick={() => move(-1)}><ArrowLeft /></Button><p className="text-sm text-muted-foreground">{selected.caption}</p><Button variant="outline" size="icon" aria-label="Foto siguiente ampliada" onClick={() => move(1)}><ArrowRight /></Button></div></DialogContent></Dialog>
  </div>;
}