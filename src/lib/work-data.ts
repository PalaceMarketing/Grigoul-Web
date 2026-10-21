import foundations from '@/assets/work-pile-foundations.jpg';
import basement from '@/assets/work-basement.jpg';
import drilling from '@/assets/foundation-site.jpg';
import pilesDetail from '@/assets/piles-detail.jpg';
import underpinningDetail from '@/assets/underpinning-detail.jpg';
import soil from '@/assets/soil-study.jpg';
import samples from '@/assets/soil-samples.jpg';

export type WorkMedia = { type: 'photo'; src: string; caption: string } | { type: 'video'; src: string; poster: string; caption: string };
export type Work = {
  id: string; number: string; title: string; category: string; summary: string;
  cover: string; context: string; intervention: string; stages: string[];
  media: WorkMedia[];
};

// Illustrative cases only: replace with verified company projects and supplied media.
export const works: Work[] = [
  {
    id: 'fundaciones-edificio', number: '01', title: 'Fundaciones para un edificio', category: 'Pilotes',
    summary: 'Una intervención de fundación profunda, desde la perforación hasta la preparación de los apoyos estructurales.',
    cover: foundations,
    context: 'Este caso ilustrativo presenta la fundación de una estructura que necesita transmitir sus cargas a estratos de mayor resistencia. La solución se define a partir del estudio del terreno y del cálculo estructural.',
    intervention: 'La intervención contempla el replanteo de los apoyos, la perforación del terreno, la colocación de las armaduras y el hormigonado de los pilotes. La preparación de las cabezas permite vincular la fundación con la estructura proyectada.',
    stages: ['Replanteo de los puntos de fundación', 'Perforación y colocación de armaduras', 'Hormigonado y preparación de las cabezas de pilotes'],
    media: [{ type: 'photo', src: foundations, caption: 'Vista ilustrativa de los apoyos de fundación.' }, { type: 'photo', src: drilling, caption: 'Equipo de perforación en un terreno de obra.' }, { type: 'photo', src: pilesDetail, caption: 'Detalle ilustrativo de la ejecución de pilotes.' }],
  },
  {
    id: 'excavacion-subsuelos', number: '02', title: 'Excavación y contención de un subsuelo', category: 'Submuraciones',
    summary: 'Una excavación junto a construcciones existentes, con una secuencia de intervención por etapas.',
    cover: basement,
    context: 'Este ejemplo aborda una excavación próxima a muros existentes. La profundidad de trabajo, las fundaciones vecinas y las características del suelo condicionan la planificación de la intervención.',
    intervention: 'El caso contempla submuraciones ejecutadas por sectores y una secuencia de excavación coordinada con la contención. El objetivo de la intervención es acompañar el descenso de la excavación y el trabajo junto a las estructuras existentes.',
    stages: ['Evaluación del entorno y de las fundaciones existentes', 'Intervención por sectores y contención', 'Excavación progresiva y coordinación de las etapas'],
    media: [{ type: 'photo', src: basement, caption: 'Vista ilustrativa de una excavación junto a una medianera.' }, { type: 'photo', src: underpinningDetail, caption: 'Detalle ilustrativo de una intervención de submuración.' }],
  },
  {
    id: 'investigacion-terreno', number: '03', title: 'Investigación del terreno para una nueva obra', category: 'Estudios de suelos',
    summary: 'Una campaña de reconocimiento geotécnico para aportar información al diseño de las fundaciones.',
    cover: soil,
    context: 'Antes de definir una fundación, es necesario conocer las características del terreno. Este caso ilustrativo muestra el reconocimiento de un sitio destinado a una nueva construcción.',
    intervention: 'La campaña contempla exploraciones del terreno y toma de muestras. Su análisis permite caracterizar los estratos y elaborar información geotécnica para que los profesionales del proyecto evalúen el sistema de fundación.',
    stages: ['Reconocimiento y exploración del terreno', 'Obtención y análisis de muestras', 'Información geotécnica para el proyecto estructural'],
    media: [{ type: 'photo', src: soil, caption: 'Exploración ilustrativa del terreno.' }, { type: 'photo', src: samples, caption: 'Muestras ilustrativas para la caracterización del suelo.' }],
  },
];

export function findWork(id: string) { return works.find(work => work.id === id); }