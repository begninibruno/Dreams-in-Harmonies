import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";
import { getCourseBySlug, Course } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import { enroll as enrollCourse, isEnrolled as isCourseEnrolled } from '@/lib/enrollments';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CourseDetail() {
  const [match, params] = useRoute("/courses/:slug");
  const [, setLocation] = useLocation();
  const auth = useContext(AuthContext);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // modal state
  const [open, setOpen] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  // Verificação obrigatória de autenticação antes de carregar qualquer dado
  useEffect(() => {
    const check = async () => {
      if (!auth?.isAuthenticated) {
        setLoading(false);
        setLocation(
          "/login?msg=" + encodeURIComponent("Você precisa estar logado para acessar este recurso.")
        );
        return;
      }

      // carregar dinamicamente o curso somente após autorização
      const slug = params?.slug;
      if (!slug) {
        setCourse(null);
        setLoading(false);
        return;
      }

      // simula fetch assíncrono (pode ser substituído por chamada real)
      await new Promise((r) => setTimeout(r, 200));
      const c = getCourseBySlug(slug);
      setCourse(c);
      // verificar inscrição existente via API
      if (c) {
        try {
          const enrolledFlag = await isCourseEnrolled(c.id);
          setEnrolled(enrolledFlag);
        } catch (err) {
          console.error('Erro ao checar inscrição', err);
          setEnrolled(false);
        }
      }
      // pré-preencher dados do usuário autenticado
      if (auth?.user) {
        setFullName(auth.user.name || "");
        setEmail(auth.user.email || "");
      }
      setLoading(false);
    };

    check();
    // intentionally not including getCourseBySlug
  }, [auth, params, setLocation]);

  const handleEnroll = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSubmitting(true);
    // simula chamada de inscrição
    try {
      await new Promise((r) => setTimeout(r, 300));
      if (course) {
        await enrollCourse(course.id);
        setEnrolled(true);
      }
    } catch (err) {
      console.error('Erro ao inscrever', err);
    } finally {
      setSubmitting(false);
    }
    setOpen(false);
    // redireciona automaticamente para a área de aprendizagem do curso
    if (course?.slug) {
      // aguarda ligeiramente para permitir animação de fechamento do modal
      setTimeout(() => {
        setLocation(`/courses/${course.slug}/learn`);
      }, 300);
    }
  };

  if (loading) {
    return <div className="container py-20 text-center">Carregando curso...</div>;
  }

  if (!course) {
    return (
      <div className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Curso não encontrado</h2>
          <p className="text-muted-foreground mb-6">O curso solicitado não está disponível.</p>
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setLocation("/courses")}>Voltar aos Cursos</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">{course.title}</h1>
          <p className="text-sm text-muted-foreground">{course.instrument} • {course.level} • {course.duration} • Professor: {course.teacher}</p>
        </div>

        {course.coverVideo && (
          <div className="w-full mb-8">
            <div className="relative" style={{ paddingTop: '56.25%' }}>
              <video
                controls
                className="absolute inset-0 w-full h-full rounded-lg bg-black"
                src={course.coverVideo}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Descrição</h2>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Módulos</h2>
              <div className="space-y-6">
                {course.modules.map((m) => (
                  <div key={m.id} className="p-4 rounded-lg bg-background border border-border">
                    <h3 className="text-lg font-bold mb-2">{m.title}</h3>
                    <ul className="space-y-2">
                      {m.chapters.map((ch) => (
                        <li key={ch.id} className="text-muted-foreground">
                          <strong>{ch.title}</strong>
                          {ch.content && <div className="text-sm mt-1">{ch.content}</div>}
                          {ch.video && (
                            <div className="mt-2">
                              <div className="relative" style={{ paddingTop: '56.25%' }}>
                                <video controls className="absolute inset-0 w-full h-full rounded-md bg-black" src={ch.video} />
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside>
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="text-center">
                <p className="text-lg font-semibold">Detalhes do Curso</p>
                <p className="text-sm text-muted-foreground">Duração: {course.duration}</p>
                <p className="text-sm text-muted-foreground">Nível: {course.level}</p>
                <p className="text-sm text-muted-foreground">Professor: {course.teacher}</p>
              </div>

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

              <div className="pt-2">
                <Button className="w-full mb-2" onClick={() => setLocation('/courses')}>Voltar aos Cursos</Button>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Iniciar Curso</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Inscrição: {course.title}</DialogTitle>
                      <DialogDescription>Preencha os dados abaixo para efetivar sua inscrição.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleEnroll} className="space-y-4">
                      <div>
                        <Label>Nome Completo</Label>
                        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                      </div>

                      <div>
                        <Label>Email</Label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>

                      <div>
                        <Label>Observações (opcional)</Label>
                        <Input value={note} onChange={(e) => setNote(e.target.value)} />
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={submitting}>{submitting ? 'Inscrevendo...' : 'Confirmar Inscrição'}</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                {enrolled && <div className="mt-3 text-sm text-accent">Inscrição realizada com sucesso!</div>}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
