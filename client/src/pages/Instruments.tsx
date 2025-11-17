import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Music, Headphones, Volume2, Wind, Zap, Piano, Guitar, Microwave, Mic, Drum } from 'lucide-react';

export default function Instruments() {
  const instruments = [
    {
      name: 'Bateria',
      icon: <Drum className="w-12 h-12" />,
      description: 'Aprenda ritmo e coordenacao motora com a bateria. Perfeito para iniciantes e avancados.',
      details: 'Aulas de tecnica, leitura de partitura e performance em grupo.'
    },
    {
      name: 'Guitarra',
      icon: <Zap className="w-12 h-12" />,
      description: 'Desde acordes basicos ate tecnicas avancadas. Para todos os estilos musicais.',
      details: 'Aulas de teoria musical, improvisacao e composicao.'
    },
    {
      name: 'Teclado',
      icon: <Piano className="w-12 h-12" />,
      description: 'Explore harmonia e melodia com o teclado. Ideal para aprender musica.',
      details: 'Aulas de piano, sintetizador e producao musical.'
    },
    {
      name: 'Violao',
      icon: <Guitar className="w-12 h-12" />,
      description: 'Instrumento versatil para musica classica, popular e contemporanea.',
      details: 'Aulas de fingerstyle, acordes e tecnicas de performance.'
    },
    {
      name: 'Baixo',
      icon: <Volume2 className="w-12 h-12" />,
      description: 'Seja a base ritmca de qualquer banda. Aprenda groove e sincronizacao.',
      details: 'Aulas de linhas de baixo, sincronizacao e performance em grupo.'
    },
    {
      name: 'Vocalizacao',
      icon: <Mic className="w-12 h-12" />,
      description: 'Desenvolva sua voz e aprenda tecnicas vocais profissionais.',
      details: 'Aulas de respiracao, aquecimento e interpretacao musical.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-purple-light to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Nossos <span className="text-accent">Instrumentos</span></h1>
            <p className="text-xl text-muted-foreground">
              Escolha entre diversos instrumentos e comece sua jornada musical hoje mesmo.
            </p>
          </div>
        </div>
      </section>

      {/* Instruments Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instruments.map((instrument, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors group-hover:scale-110">
                  {instrument.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{instrument.name}</h3>
                <p className="text-muted-foreground mb-4">{instrument.description}</p>
                <p className="text-sm text-accent mb-6">{instrument.details}</p>
                <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground">
                  Saiba Mais
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn Music */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">Por que aprender musica?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Musica transforma vidas, desenvolve habilidades e cria oportunidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Desenvolvimento Cognitivo', desc: 'Melhora memoria, concentracao e habilidades de resolucao de problemas.' },
              { title: 'Expressao Criativa', desc: 'Explore sua criatividade e expresse emocoes atraves da musica.' },
              { title: 'Disciplina e Paciencia', desc: 'Aprenda a estabelecer metas e trabalhar para alcanc-las.' },
              { title: 'Conexoes Sociais', desc: 'Faca amigos e colabore com outros musicos em nossa comunidade.' }
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:border-accent transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-accent to-accent/70 p-12 md:p-16 animate-fadeInUp">
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-accent-foreground mb-4">Escolha seu instrumento</h2>
              <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
                Comece sua aula gratuita hoje e descubra seu talento musical.
              </p>
              <Link href="/login">
                <Button size="lg" variant="secondary">
                  Comece Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
