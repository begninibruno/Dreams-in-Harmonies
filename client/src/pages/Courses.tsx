import { useContext, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import AuthContext from '@/contexts/AuthContext';
import { Music, Drum, Zap, Piano, Guitar, Volume2, Mic } from 'lucide-react';
import { listCourses } from '@/lib/courses';
import { listEnrolled } from '@/lib/enrollments';
import { getProgressPercent } from '@/lib/progress';
import { useState } from 'react';

// Agrupa cursos por instrumento para manter o layout original
function groupByInstrument(courses: any[]) {
  const map: Record<string, any> = {};
  for (const c of courses) {
    if (!map[c.instrument]) map[c.instrument] = [];
    map[c.instrument].push(c);
  }
  return Object.keys(map).map((instrument) => ({ instrument, courses: map[instrument] }));
}

export default function Courses() {
  const auth = useContext(AuthContext);
  const [, setLocation] = useLocation();
  const [enrolledSet, setEnrolledSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const load = async () => {
      if (!auth?.isAuthenticated) return;
      try {
        const ids = (await listEnrolled()) as string[];
        setEnrolledSet(new Set(ids));
      } catch (err) {
        console.error('Erro ao carregar inscrições', err);
      }
    };
    load();
  }, [auth]);

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      // não bloqueia a navegação aqui — o detalhe do curso fará a checagem rígida
    }
  }, [auth]);

  const handleViewCourse = (slug: string) => {
    if (!auth?.isAuthenticated) {
      const msg = encodeURIComponent('Você precisa estar logado para acessar este recurso.');
      setLocation(`/login?msg=${msg}`);
      return;
    }
    setLocation(`/courses/${slug}`);
  };

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
            {useMemo(() => groupByInstrument(listCourses()), []).map((group, gi) => (
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
                  {group.courses.map((c: any, i: number) => (
                    <div key={i} className="p-4 rounded-lg bg-background border border-border">
                      {c.coverImage && (
                        <div className="mb-3 overflow-hidden rounded-md">
                          <img src={c.coverImage} alt={c.title} className="w-full h-36 object-cover" />
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-lg font-semibold text-foreground">{c.title}</h4>
                                  {enrolledSet.has(c.id) && (
                                    <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">Inscrito</span>
                                  )}
                                </div>
                                {/* progresso */}
                                <div className="mt-2">
                                  <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                                    <div className="h-2 bg-accent" style={{ width: `${getProgressPercent(c.id, ((c.modules||[]).flatMap((m:any)=>m.chapters||[]).filter((ch:any)=>!!ch.video).length + (c.resources||[]).filter((r:any)=>r.url?.includes && r.url.includes('youtube.com')).length))}%` }} />
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">{getProgressPercent(c.id, ((c.modules||[]).flatMap((m:any)=>m.chapters||[]).filter((ch:any)=>!!ch.video).length + (c.resources||[]).filter((r:any)=>r.url?.includes && r.url.includes('youtube.com')).length))}%</div>
                                </div>
                          <p className="text-sm text-muted-foreground">{c.desc}</p>
                          <p className="text-xs text-muted-foreground mt-2">Professor: {c.teacher} • Duração: {c.duration}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button size="sm" variant="outline" onClick={() => handleViewCourse(c.slug)}>Ver Curso</Button>
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
