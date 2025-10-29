import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Music, Heart, Users, Zap, ArrowRight, Play } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-purple-light to-background">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-accent/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-accent/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slideInLeft">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Transforme seus <span className="text-accent">Sonhos</span> em <span className="text-accent">Harmonias</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Acesso democrático à educação musical de qualidade. Independentemente da sua situação financeira, você merece aprender a tocar e expressar sua criatividade através da música.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/instruments">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 group">
                    Explorar Instrumentos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/donations">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Heart className="w-4 h-4" />
                    Apoiar com Doação
                  </Button>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <p className="text-3xl font-bold text-accent">500+</p>
                  <p className="text-sm text-muted-foreground">Alunos Ativos</p>
                </div>
                <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <p className="text-3xl font-bold text-accent">10+</p>
                  <p className="text-sm text-muted-foreground">Instrumentos</p>
                </div>
                <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <p className="text-3xl font-bold text-accent">100%</p>
                  <p className="text-sm text-muted-foreground">Acessível</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative hidden lg:flex items-center justify-center animate-slideInRight">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/50 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-accent/20 to-accent/10 rounded-3xl flex items-center justify-center border border-accent/30 backdrop-blur-sm">
                  <div className="text-center">
                    <Music className="w-32 h-32 text-accent mx-auto mb-4 animate-pulse" />
                    <p className="text-accent font-semibold">Educação Musical</p>
                    <p className="text-accent/70 text-sm">Para Todos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">Por Que Escolher a Gente?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Somos dedicados a tornar a educação musical acessível para todos, independentemente de barreiras financeiras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Acessibilidade',
                description: 'Educação musical gratuita ou com preços acessíveis para todos os alunos.',
                delay: '0s'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Comunidade',
                description: 'Conecte-se com outros músicos e compartilhe sua jornada musical.',
                delay: '0.1s'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Qualidade',
                description: 'Professores experientes e metodologia moderna de ensino.',
                delay: '0.2s'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-background border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-accent to-accent/70 p-12 md:p-16 animate-fadeInUp">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -top-48 -left-48"></div>
              <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -bottom-48 -right-48"></div>
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-accent-foreground mb-4">Pronto para começar sua jornada?</h2>
              <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
                Explore nossos instrumentos, conheça nossa história e faça parte de uma comunidade que acredita no poder da música.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/instruments">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Play className="w-4 h-4" />
                    Começar Agora
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-accent-foreground border-accent-foreground hover:bg-accent-foreground/10 gap-2">
                    Saiba Mais
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
