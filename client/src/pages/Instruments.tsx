import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Music, Headphones, Volume2, Wind, Zap, Piano, Guitar, Mic, Drum } from 'lucide-react';

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
      icon: <Guitar className="w-12 h-12" />,
      description: 'Desde acordes básicos até técnicas avançadas. Para todos os estilos musicais.',
      details: 'Aulas de teoria musical, improvisação e composição.'
    },
    {
      name: 'Teclado',
      icon: <Piano className="w-12 h-12" />,
      description: 'Explore harmonia e melodia com o teclado. Ideal para aprender música.',
      details: 'Aulas de piano, sintetizador e produção musical.'
    },
    {
      name: 'Violao',
      icon: <Guitar className="w-12 h-12" />,
      description: 'Instrumento versátil para música clássica, popular e contemporânea.',
      details: 'Aulas de fingerstyle, acordes e técnicas de performance.'
    },
    {
      name: 'Baixo',
      icon: <Volume2 className="w-12 h-12" />,
      description: 'Seja a base rítmica de qualquer banda. Aprenda groove e sincronização.',
      details: 'Aulas de linhas de baixo, sincronização e performance em grupo.'
    },
    {
      name: 'Vocalização',
      icon: <Mic className="w-12 h-12" />,
      description: 'Desenvolva sua voz e aprenda técnicas vocais profissionais.',
      details: 'Aulas de respiração, aquecimento e interpretação musical.'
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
            <h2 className="text-4xl font-bold text-foreground mb-4">Por que aprender música?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Música transforma vidas, desenvolve habilidades e cria oportunidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Desenvolvimento Cognitivo', desc: 'Melhora memória, concentração e habilidades de resolução de problemas.' },
              { title: 'Expressão Criativa', desc: 'Explore sua criatividade e expresse emoções através da música.' },
              { title: 'Disciplina e Paciência', desc: 'Aprenda a estabelecer metas e trabalhar para alcançá-las.' },
              { title: 'Conexões Sociais', desc: 'Faça amigos e colabore com outros músicos em nossa comunidade.' }
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
              <CTABtn />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CTABtn() {
  const auth = useContext(AuthContext);
  const [, setLocation] = useLocation();

  const handleClick = () => {
    if (auth?.isAuthenticated) {
      // se existir /profile, poderia apontar para la; por enquanto vamos para /
      setLocation('/');
    } else {
      setLocation('/login');
    }
  };

  return (
    <Button size="lg" variant="secondary" onClick={handleClick}>
      Comece Agora
    </Button>
  );
}
