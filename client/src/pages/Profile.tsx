import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import AuthContext from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { listEnrolled, unenroll } from '@/lib/enrollments';
import { getCourseBySlug, listCourses } from '@/lib/courses';
import { getProgressPercent } from '@/lib/progress';

export default function Profile() {
  const auth = useContext(AuthContext);
  const [, setLocation] = useLocation();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!auth?.isAuthenticated) {
        setLocation('/login');
        return;
      }

      try {
        const ids = (await listEnrolled()) as string[];
        const courses = ids.map((id: string) => listCourses().find((c) => c.id === id)).filter(Boolean) as any[];
        setEnrolledCourses(courses);
      } catch (err) {
        console.error('Erro ao carregar inscrições', err);
        setEnrolledCourses([]);
      }
    };
    load();
  }, [auth, setLocation]);

  if (!auth?.user) return null;

  const handleGoToCourse = (slug: string) => {
    setLocation(`/courses/${slug}/learn`);
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await unenroll(courseId);
      setEnrolledCourses((prev) => prev.filter((c) => c.id !== courseId));
    } catch (err) {
      console.error('Erro ao cancelar inscrição', err);
    }
  };

  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Perfil</h1>
            <p className="text-sm text-muted-foreground">{auth.user.name}</p>
            <p className="text-sm text-muted-foreground">{auth.user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setLocation('/')}>Voltar</Button>
            <Button onClick={() => { auth.logout(); setLocation('/'); }}>Sair</Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Meus Cursos</h2>
          {enrolledCourses.length === 0 ? (
            <div className="text-sm text-muted-foreground">Você não está inscrito em nenhum curso.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledCourses.map((c) => (
                <div key={c.id} className="p-4 rounded-lg bg-background border border-border flex items-center gap-4">
                  {c.coverImage && (
                    <img src={c.coverImage} alt={c.title} className="w-24 h-16 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-sm text-muted-foreground">Professor: {c.teacher}</div>
                    <div className="text-sm text-muted-foreground">Carga: {c.cargaHoraria || c.duration}</div>
                    <div className="text-sm text-muted-foreground mt-1">Progresso: {getProgressPercent(c.id, ((c.modules||[]).flatMap((m:any)=>m.chapters||[]).filter((ch:any)=>!!ch.video).length + (c.resources||[]).filter((r:any)=>r.url?.includes && r.url.includes('youtube.com')).length))}%</div>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleGoToCourse(c.slug)}>Ir para o Curso</Button>
                      <Button size="sm" variant="outline" onClick={() => handleUnenroll(c.id)}>Cancelar Inscrição</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
