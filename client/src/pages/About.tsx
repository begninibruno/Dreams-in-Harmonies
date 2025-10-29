import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Target, Heart, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-purple-light to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Sobre <span className="text-accent">Dreams in Harmonies</span></h1>
            <p className="text-xl text-muted-foreground">
              Uma iniciativa dedicada a democratizar o acesso a educacao musical e transformar vidas atraves da musica.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-4xl font-bold text-foreground mb-6">Nossa Historia</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Dreams in Harmonies nasceu da conviccao de que a musica e um direito, nao um privilegio. Observamos muitos jovens talentosos como Lucas Silva, que sonham em ser musicos profissionais, mas enfrentam barreiras financeiras.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Decidimos criar uma plataforma que oferecesse educacao musical acessivel, com professores qualificados, instrumentos disponiveis e uma comunidade de apoio.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hoje, somos uma comunidade crescente de educadores, musicos profissionais e investidores que acreditam no poder transformador da musica.
              </p>
            </div>

            <div className="relative hidden lg:flex items-center justify-center animate-slideInRight">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/50 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-accent/20 to-accent/10 rounded-3xl flex items-center justify-center border border-accent/30 backdrop-blur-sm">
                  <div className="text-center">
                    <Heart className="w-32 h-32 text-accent mx-auto mb-4 animate-pulse" />
                    <p className="text-accent font-semibold">Missao Social</p>
                    <p className="text-accent/70 text-sm">Educacao para Todos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nossa Missao, Visao e Valores</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Missao',
                description: 'Democratizar o acesso a educacao musical, oferecendo oportunidades de aprendizado de qualidade para todos.',
                delay: '0s'
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: 'Visao',
                description: 'Ser a principal plataforma de educacao musical inclusiva, transformando vidas e criando uma geracao de musicos profissionais.',
                delay: '0.1s'
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Valores',
                description: 'Acessibilidade, qualidade, comunidade, inclusao e excelencia. Todo mundo merece explorar seu potencial musical.',
                delay: '0.2s'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-background border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: item.delay }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent/70 rounded-3xl mx-4 md:mx-0">
        <div className="container">
          <div className="text-center animate-fadeInUp">
            <h2 className="text-4xl font-bold text-accent-foreground mb-4">Quer fazer parte dessa jornada?</h2>
            <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
              Junte-se a nos como aluno, professor, investidor ou voluntario.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partnership">
                <Button size="lg" variant="secondary">
                  Seja um Parceiro
                </Button>
              </Link>
              <Link href="/donations">
                <Button size="lg" variant="outline" className="text-accent-foreground border-accent-foreground hover:bg-accent-foreground/10">
                  Apoiar com Doacao
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
