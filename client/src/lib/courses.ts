export type Chapter = {
  id: string;
  title: string;
  content?: string;
  video?: string; // url
};

export type Module = {
  id: string;
  title: string;
  chapters: Chapter[];
};

export type Resource = {
  id: string;
  type: 'pdf' | 'file' | 'link';
  title: string;
  url: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  instrument: string;
  level: string;
  duration: string;
  teacher: string;
  teacherBio?: string;
  teacherAvatar?: string;
  cargaHoraria?: string;
  description: string;
  modules: Module[];
  resources: Resource[];
  coverVideo?: string;
  coverImage?: string;
  tags?: string[];
  rating?: number;
};

export const courses: Course[] = [
  {
    id: '1',
    slug: 'bateria-para-iniciantes',
    title: 'Bateria para Iniciantes',
    instrument: 'Bateria',
    level: 'Iniciante',
    duration: '8 semanas',
    teacher: 'João Silva',
    teacherBio: 'Baterista profissional com 15 anos de experiência em estúdio e turnês. Especialista em técnica rítmica e performance ao vivo.',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop',
    cargaHoraria: '32 horas',
    description:
      'Bases de ritmo, postura e independência de mãos. Curso pensado para quem nunca tocou bateria e quer aprender desde o básico.',
    coverVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverImage: 'https://source.unsplash.com/collection/190727/1200x800?drums',
    tags: ['ritmo', 'técnica', 'performance'],
    rating: 4.7,
    modules: [
      {
        id: 'm1',
        title: 'Fundamentos',
        chapters: [
          { id: 'c1', title: 'Postura e Pegada', content: 'Aprenda a segurar as baquetas e a postura correta.' },
          { id: 'c2', title: 'Rudimentos Básicos', content: 'Paradiddles, flams e demais rudimentos iniciais.' }
        ]
      },
      {
        id: 'm2',
        title: 'Ritmos e Grooves',
        chapters: [
          { id: 'c3', title: 'Rock 4/4', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { id: 'c4', title: 'Bossa Nova', content: 'Padrões de compasso e acentuações típicas.' }
        ]
      }
    ],
    resources: [
      { id: 'r1', type: 'pdf', title: 'Ficha de Rudimentos', url: 'https://example.com/rudimentos.pdf' },
      { id: 'r1y', type: 'link', title: 'YouTube - Noções Básicas de Bateria (Aula 1)', url: 'https://www.youtube.com/watch?v=3GwjfUFyY6M' },
      { id: 'r1y2', type: 'link', title: 'YouTube - Rudimentos e Técnica (Aula 2)', url: 'https://www.youtube.com/watch?v=Z3Z5sQv5z4k' }
    ]
  },
  {
    id: '2',
    slug: 'guitarra-basica',
    title: 'Guitarra Básica',
    instrument: 'Guitarra',
    level: 'Iniciante',
    duration: '10 semanas',
    teacher: 'Carlos Souza',
    teacherBio: 'Instrutor e produtor musical com foco em guitarra popular e técnicas de improvisação.',
    teacherAvatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop',
    cargaHoraria: '40 horas',
    description: 'Acordes, ritmos e primeiras músicas. Curso voltado ao repertório popular.',
    coverVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverImage: 'https://source.unsplash.com/collection/190727/1200x800?guitar',
    tags: ['acordes', 'repertório', 'ritmo'],
    rating: 4.8,
    modules: [
      {
        id: 'm3',
        title: 'Acordes e Ritmo',
        chapters: [
          { id: 'c5', title: 'Acordes A, D, E', content: 'Posições e transição entre acordes.' },
          { id: 'c6', title: 'Ritmos Populares', content: 'Strumming patterns e variações.' }
        ]
      }
    ],
    resources: [
      { id: 'r2', type: 'link', title: 'Cifra de Exemplo', url: 'https://example.com/cifra' },
      { id: 'r2y1', type: 'link', title: 'YouTube - Acordes Básicos na Guitarra (Aula 1)', url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g' },
      { id: 'r2y2', type: 'link', title: 'YouTube - Ritmos Populares (Aula 2)', url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8' }
    ],
  },
  {
    id: '3',
    slug: 'teclado-essencial',
    title: 'Teclado Essencial',
    instrument: 'Teclado',
    level: 'Iniciante',
    duration: '8 semanas',
    teacher: 'Laura Mendes',
    teacherBio: 'Pianista e educadora com experiência em métodos modernos de ensino.',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop',
    cargaHoraria: '30 horas',
    description: 'Leitura básica, acordes e progressões. Ideal para quem quer iniciar no teclado e piano.',
    coverImage: 'https://source.unsplash.com/1200x800/?keyboard,piano',
    tags: ['harmonia', 'piano', 'leitura'],
    rating: 4.6,
    modules: [
      {
        id: 'm10',
        title: 'Fundamentos do Teclado',
        chapters: [
          { id: 'c100', title: 'Posição das mãos', content: 'Posicionamento e ergonomia ao tocar.' },
          { id: 'c101', title: 'Acordes básicos', content: 'Triádicos e progressões simples.' }
        ]
      }
    ],
    resources: []
  },
  {
    id: '4',
    slug: 'violao-para-todos',
    title: 'Violão para Todos',
    instrument: 'Violão',
    level: 'Iniciante',
    duration: '10 semanas',
    teacher: 'Rafael Lima',
    teacherBio: 'Guitarrista e compositor com ampla experiência em ensino popular.',
    teacherAvatar: 'https://images.unsplash.com/photo-1545996124-1b5d2c6b3a4c?w=200&q=80&auto=format&fit=crop',
    cargaHoraria: '42 horas',
    description: 'Acordes, dedilhado e repertório popular.',
    coverImage: 'https://source.unsplash.com/1200x800/?acoustic-guitar,violao',
    tags: ['dedilhado', 'acordes', 'repertório'],
    rating: 4.5,
    modules: [
      {
        id: 'm20',
        title: 'Primeiros Acordes',
        chapters: [
          { id: 'c200', title: 'Acordes maiores', content: 'Formação e transição entre acordes maiores.' },
          { id: 'c201', title: 'Dedilhado básico', content: 'Padrões para repertório popular.' }
        ]
      }
    ],
    resources: []
  },
  {
    id: '5',
    slug: 'baixo-groove',
    title: 'Baixo Groove',
    instrument: 'Baixo',
    level: 'Intermediário',
    duration: '8 semanas',
    teacher: 'Paulo Rocha',
    teacherBio: 'Baixista de sessão com foco em groove e técnica.',
    teacherAvatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop',
    cargaHoraria: '28 horas',
    description: 'Linhas de baixo, walking bass e groove.',
    coverImage: 'https://source.unsplash.com/1200x800/?bass,guitar',
    tags: ['groove', 'linha de baixo'],
    rating: 4.4,
    modules: [],
    resources: []
  },
  {
    id: '6',
    slug: 'tecnica-vocal-basica',
    title: 'Técnica Vocal Básica',
    instrument: 'Vocalização',
    level: 'Iniciante',
    duration: '6 semanas',
    teacher: 'Mariana Alves',
    teacherBio: 'Professora de canto com experiência em técnica respiratória e saúde vocal.',
    teacherAvatar: 'https://images.unsplash.com/photo-1545996124-1b5d2c6b3a4c?w=200&q=80&auto=format&fit=crop',
    cargaHoraria: '24 horas',
    description: 'Respiração, afinação e aquecimento.',
    coverImage: 'https://source.unsplash.com/1200x800/?singer,voice',
    tags: ['voz', 'técnica'],
    rating: 4.9,
    modules: [],
    resources: []
  },
  {
    id: '7',
    slug: 'producaomusical-basico',
    title: 'Produção Musical Básica',
    instrument: 'Produção',
    level: 'Iniciante',
    duration: '12 semanas',
    teacher: 'Marina Costa',
    teacherBio: 'Produtora e engenheira de som, especializada em home-studio e produção digital.',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop',
    cargaHoraria: '48 horas',
    description: 'Introdução à DAWs, gravação, edição e mixagem.',
    coverImage: 'https://source.unsplash.com/1200x800/?music-studio,production',
    tags: ['produção', 'mixagem', 'home-studio'],
    rating: 4.8,
    modules: [],
    resources: []
  }
];

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug) || null;
}

export function listCourses() {
  return courses.slice();
}
