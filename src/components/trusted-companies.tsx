import { useEffect, useState } from 'react';

import aguasLogo from '@/assets/aguas-cordobesas.png';
import arconLogo from '@/assets/arcon.png';
import educacionLogo from '@/assets/ministerio-educacion.png';
import epecLogo from '@/assets/epec.png';

const ROTATE_MS = 3500;

type Company = {
  name: string;
  src: string;
  alt: string;
};

const companies: Company[] = [
  { name: 'EPEC', src: epecLogo, alt: 'EPEC' },
  { name: 'AR-CON', src: arconLogo, alt: 'AR-CON Constructora y Desarrollista' },
  { name: 'Aguas Cordobesas', src: aguasLogo, alt: 'Aguas Cordobesas' },
  { name: 'Ministerio de Educación', src: educacionLogo, alt: 'Ministerio de Educación' },
];

const LOOP_COPIES = 4;

export function TrustedCompanies() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return (
    <section className="trust-band" data-motion={reducedMotion ? 'reduced' : 'full'}>
      <div className="trust-band-inner">
        <h2 className="trust-label">Empresas que confían en nosotros</h2>
        <div className="trust-marquee">
          <div className="trust-track">
            {Array.from({ length: LOOP_COPIES }).flatMap((_, copy) =>
              companies.map(company => (
                <figure
                  className="trust-logo"
                  key={`${copy}-${company.name}`}
                  aria-hidden={copy > 0}
                >
                  <img src={company.src} alt={copy === 0 ? company.alt : ''} decoding="async" />
                </figure>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
