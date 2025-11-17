import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import AuthContext from '@/contexts/AuthContext';
import { Music, Drum, Zap, Piano, Guitar, Volume2, Mic } from 'lucide-react';

const coursesData = [
  {
    instrument: 'Bateria',
    icon: <Drum className="w-12 h-12" />, 
    courses: [
      { title: 'Bateria para Iniciantes', level: 'Iniciante', desc: 'Bases de ritmo, postura e independência de mãos.', teacher: 'João Silva', duration: '8 semanas' },
      { title: 'Groove e Performance', level: 'Intermediário', desc: 'Grooves, fill-ins e técnica de palco.', teacher: 'Ana Pereira', duration: '6 semanas' }
    ]
  },
  {
    instrument: 'Guitarra',
    icon: <Zap className="w-12 h-12" />, 
    courses: [
      { title: 'Guitarra Básica', level: 'Iniciante', desc: 'Acordes, ritmos e primeiras músicas.', teacher: 'Carlos Souza', duration: '10 semanas' },
      { title: 'Improvisação e Solos', level: 'Avançado', desc: 'Escalas, licks e fraseado.', teacher: 'Marina Costa', duration: '8 semanas' }
    ]
  },
  {
    instrument: 'Teclado',
    icon: <Piano className="w-12 h-12" />, 
    courses: [
      { title: 'Teclado Essencial', level: 'Iniciante', desc: 'Leitura básica, acordes e progressões.', teacher: 'Laura Mendes', duration: '8 semanas' }
    ]
  },
  {
    instrument: 'Violão',
    icon: <Guitar className="w-12 h-12" />, 
    courses: [
      { title: 'Violão para Todos', level: 'Iniciante', desc: 'Acordes, dedilhado e repertório popular.', teacher: 'Rafael Lima', duration: '10 semanas' }
    ]
  },
  {
    instrument: 'Baixo',
    icon: <Volume2 className="w-12 h-12" />, 
    courses: [
      { title: 'Baixo Groove', level: 'Intermediário', desc: 'Linhas de baixo, walking bass e groove.', teacher: 'Paulo Rocha', duration: '8 semanas' }
    ]
  },
  {
    instrument: 'Vocalização',
    icon: <Mic className="w-12 h-12" />, 
    courses: [
      { title: 'Técnica Vocal Básica', level: 'Iniciante', desc: 'Respiração, afinação e aquecimento.', teacher: 'Mariana Alves', duration: '6 semanas' }
    ]
  }
];

export default function Courses() {
  const auth = useContext(AuthContext);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      // redireciona não-autenticados para a tela de login
      setLocation('/login');
    }
  }, [auth, setLocation]);

  if (!auth?.isAuthenticated) {
    return null; // enquanto redireciona
  }

  return (
    <div className="w-full">
      <section className="py-20 bg-gradient-to-br from-background via-purple-light to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Nossos <span className="text-accent">Cursos</span></h1>
            <p className="text-xl text-muted-foreground">Cursos por instrumento para todos os níveis — feito para a nossa comunidade.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((group, gi) => (
              <div key={gi} className="p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 animate-fadeInUp" style={{ animationDelay: `${gi * 0.06}s` }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{group.instrument}</h3>
                    <p className="text-sm text-muted-foreground">Cursos disponíveis: {group.courses.length}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {group.courses.map((c, i) => (
                    <div key={i} className="p-4 rounded-lg bg-background border border-border">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{c.title}</h4>
                          <p className="text-sm text-muted-foreground">{c.desc}</p>
                          <p className="text-xs text-muted-foreground mt-2">Professor: {c.teacher} • Duração: {c.duration}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button size="sm" variant="outline">Ver Curso</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-accent to-accent/70 p-12 md:p-16 animate-fadeInUp">
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-accent-foreground mb-4">Quer criar um curso?</h2>
              <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">Se você é professor ou quer colaborar, entre em contato com a equipe para publicar seu curso.</p>
              <Link href="/profile">
                <Button size="lg" variant="secondary">Ir para o Perfil</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
