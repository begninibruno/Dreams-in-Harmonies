import { useEffect, useMemo, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import AuthContext from '@/contexts/AuthContext';
import { useContext } from 'react';
import { getCourseBySlug, Course } from '@/lib/courses';
import { listEnrolled } from '@/lib/enrollments';
import { markCompleted, isCompleted, getProgressPercent } from '@/lib/progress';
import { Button } from '@/components/ui/button';

function toEmbedUrl(url: string) {
  try {
    if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
    return url;
  } catch (e) {
    return url;
  }
}

export default function CoursePlayer() {
  const [match, params] = useRoute('/courses/:slug/learn');
  const [, setLocation] = useLocation();
  const auth = useContext(AuthContext);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const slug = params?.slug;
      if (!slug) return setLocation('/courses');

      if (!auth?.isAuthenticated) {
        setLocation('/login?msg=' + encodeURIComponent('Você precisa estar logado para acessar este recurso.'));
        return;
      }

      const c = getCourseBySlug(slug);
      if (!c) {
        setLocation('/courses');
        return;
      }

      // checar inscrição via API
      try {
        const ids = (await listEnrolled()) as string[];
        if (!ids.includes(c.id)) {
          setLocation(`/courses/${slug}?msg=` + encodeURIComponent('Por favor, inscreva-se para acessar as aulas.'));
          return;
        }
      } catch (err) {
        console.error('Erro ao verificar inscrição', err);
        setLocation(`/courses/${slug}?msg=` + encodeURIComponent('Por favor, inscreva-se para acessar as aulas.'));
        return;
      }

      setCourse(c);
      // escolhe primeiro vídeo disponível (capítulo com video ou recurso do youtube)
      const chapterVideo = c.modules?.flatMap(m => m.chapters || []).find(ch => ch.video)?.video || null;
      const ytResource = c.resources?.find(r => r.type === 'link' && r.url.includes('youtube.com'))?.url || null;
      setActiveVideo(chapterVideo || ytResource);
      setLoading(false);
    };
    init();
  }, [auth, params, setLocation]);

  const playlist = useMemo(() => {
    if (!course) return [] as { id: string; title: string; url: string }[];
    const list: { id: string; title: string; url: string }[] = [];
    // capítulos com vídeo
    course.modules.forEach((m) => {
      m.chapters.forEach((ch) => {
        if (ch.video) list.push({ id: ch.id, title: `${m.title} — ${ch.title}`, url: ch.video! });
      });
    });
    // recursos do YouTube
    course.resources.forEach((r) => {
      if (r.type === 'link' && r.url.includes('youtube.com')) list.push({ id: r.id, title: r.title, url: r.url });
    });
    return list;
  }, [course]);

  if (loading) return <div className="container py-20 text-center">Carregando aula...</div>;
  if (!course) return <div className="container py-20 text-center">Curso não encontrado.</div>;

  return (
    <div className="container py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-sm text-muted-foreground">{course.instrument} • {course.level} • {course.cargaHoraria || course.duration}</p>
          </div>

          <div className="bg-black rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
            {activeVideo ? (
              <iframe
                title="Player"
                src={toEmbedUrl(activeVideo)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">Nenhum vídeo disponível.</div>
            )}
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Descrição</h2>
            <p className="text-muted-foreground leading-relaxed">{course.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Aulas e Conteúdos</h2>
            <div className="space-y-4">
              {playlist.map((p) => (
                <div key={p.id} className="p-4 rounded-lg bg-background border border-border flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-muted-foreground">{p.url}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-muted-foreground">{isCompleted(course.id, p.id) ? 'Concluído' : ''}</div>
                    <Button onClick={() => { setActiveVideo(p.url); markCompleted(course.id, p.id); }} variant="outline">Assistir</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="mt-6">
            <h3 className="text-sm text-muted-foreground mb-2">Progresso do Curso</h3>
            <div className="w-full bg-border h-2 rounded-full overflow-hidden">
              <div className="h-2 bg-accent" style={{ width: `${getProgressPercent(course.id, playlist.length)}%` }} />
            </div>
            <div className="text-xs text-muted-foreground mt-2">{getProgressPercent(course.id, playlist.length)}% concluído</div>
          </div>
        </main>

        <aside>
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-4">
              {course.teacherAvatar && (
                <img src={course.teacherAvatar} alt={course.teacher} className="w-12 h-12 rounded-full object-cover" />
              )}
              <div>
                <div className="font-semibold">{course.teacher}</div>
                {course.teacherBio && <div className="text-sm text-muted-foreground">{course.teacherBio}</div>}
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Carga Horária</div>
              <div className="font-medium">{course.cargaHoraria || course.duration}</div>
            </div>

            {course.tags && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 bg-accent/10 rounded">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {course.resources.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Recursos</h4>
                <ul className="space-y-2 text-sm">
                  {course.resources.map((r) => (
                    <li key={r.id}>
                      <a href={r.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">{r.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
