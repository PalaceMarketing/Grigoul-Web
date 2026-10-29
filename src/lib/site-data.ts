import piles from '@/assets/foundation-site.jpg';
import underpinning from '@/assets/underpinning.jpg';
import soil from '@/assets/soil-study.jpg';
import pilesDetail from '@/assets/piles-detail.jpg';
import underpinningDetail from '@/assets/underpinning-detail.jpg';
import soilSamples from '@/assets/soil-samples.jpg';
import subimg1 from '@/assets/subimg1.jpg'
import Nuevo1 from '@/assets/Nuevo.png'

export const services = [
  { number: '01', name: 'Pilotes', image: piles, images: [piles, pilesDetail], description: 'Fundaciones profundas que transmiten las cargas de la estructura a los estratos resistentes del terreno.', detail: 'Una solución de cimentación para proyectos que requieren alcanzar suelos de mayor capacidad portante. La definición del sistema parte de las condiciones del terreno y de las cargas previstas por el proyecto estructural.', points: ['Fundaciones profundas de diámetro 30 40 50 60 cm con sus respectivas campanas hasta 15 m de profundidad', 'Coordinación con el proyecto estructural', 'Soluciones según las condiciones del suelo'] },
  { number: '02', name: 'Submuraciones', image: underpinning, images: [subimg1, underpinningDetail, Nuevo1, underpinning], description: 'Análisis del terreno para definir los estratos resistentes del terreno y definir tipo de fundaciones.', detail: 'Las submuraciones permiten abordar excavaciones y modificaciones de fundaciones próximas a construcciones existentes. Cada intervención requiere evaluar el entorno, la profundidad y la secuencia de ejecución.', points: ['Intervención en estructuras dañadas de la vivienda (submuracion)', 'Contención en excavaciones', 'Planificación de las etapas de ejecución'] },
  { number: '03', name: 'Estudios de suelos', image: soil, images: [soil, soilSamples], description: 'Análisis del terreno para definir una base técnica sólida antes de comenzar a construir.', detail: 'Conocer las características del suelo es el punto de partida para elegir una fundación adecuada. El estudio geotécnico aporta información sobre la composición y el comportamiento del terreno para la toma de decisiones del proyecto.', points: ['Investigación geotécnica', 'Caracterización del terreno', 'Información para el diseño de fundaciones'] },
] as const;

export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Griguol e Hijos` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Griguol e Hijos` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
