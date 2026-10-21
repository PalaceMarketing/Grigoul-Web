import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const nav = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Quiénes somos' },
  { to: '/servicios', label: 'Qué hacemos' },
  //{ to: '/trabajos', label: 'Nuestros trabajos' }
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });

  return (
    <header className="site-header">
      <div className="site-width flex h-full items-center justify-between gap-6">
        <Link to="/" aria-label="Griguol e Hijos — Inicio" onClick={() => setOpen(false)}>
          <img 
            className="brand-logo" 
            src="/logo.svg" 
            width={710} 
            height={194} 
            alt="Griguol e Hijos. Estudios de suelos, pilotes y submuraciones." 
          />
        </Link>
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex">
          {nav.map(item => (
            <Link key={item.to} to={item.to} className="nav-link" activeOptions={{ exact: item.to === '/' }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="hidden h-11 rounded-sm px-5 text-xs md:inline-flex">
          <Link to="/contacto">Contactanos <ArrowUpRight /></Link>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="mobile-nav md:hidden" aria-label="Navegación móvil">
          {nav.map(item => (
            <Link key={item.to} to={item.to} className="nav-link" onClick={() => setOpen(false)} data-status={pathname === item.to ? 'active' : undefined}>
              {item.label}
            </Link>
          ))}
          <Button asChild>
            <Link to="/contacto" onClick={() => setOpen(false)}>Contactanos <ArrowUpRight /></Link>
          </Button>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="site-width">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Link to="/">
            <img 
              src="/logo.svg" 
              className="footer-logo" 
              alt="Griguol e Hijos" 
              width={710} 
              height={194} 
              loading="lazy" 
            />
          </Link>
          <nav aria-label="Navegación del pie" className="flex flex-wrap gap-x-7 gap-y-3">
            {nav.slice(1).map(item => (
              <Link key={item.to} to={item.to} className="text-xs text-muted-foreground hover:text-primary">
                {item.label}
              </Link>
            ))}
            <Link to="/contacto" className="text-xs text-primary">Contacto</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Griguol e Hijos. Todos los derechos reservados.</span>
          <span>Estudios de suelos · Pilotes · Submuraciones</span>
        </div>
      </div>
    </footer>
  );
}