import { Button } from '@/components/ui/button';
import { Handshake, TrendingUp, Users, Lightbulb } from 'lucide-react';

export default function Partnership() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-purple-light to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Seja Nosso <span className="text-accent">Parceiro</span></h1>
            <p className="text-xl text-muted-foreground">
              Investidores e empresas que acreditam no poder transformador da música.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">Por que Investir em Música?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforme vidas enquanto constrói um legado de impacto social e cultural.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Impacto Social',
                description: 'Ajude jovens talentosos a realizar seus sonhos e transformar suas comunidades.'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Retorno Mensuravel',
                description: 'Acompanhe o impacto de seu investimento através de relatorios detalhados.'
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: 'Inovação',
                description: 'Seja parte de uma iniciativa inovadora que reimagina a educacao musical.'
              },
              {
                icon: <Handshake className="w-8 h-8" />,
                title: 'Parcerias Estrátegicas',
                description: 'Conecte-se com outras empresas e investidores alinhados com seus valores.'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">Níveis de Parceria</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: 'Bronze',
                investment: 'A partir de R$ 5.000',
                benefits: [
                  'Reconhecimento no site',
                  'Relatorios trimestrais',
                  'Acesso a eventos',
                  'Logo em materiais'
                ]
              },
              {
                level: 'Prata',
                investment: 'A partir de R$ 15.000',
                benefits: [
                  'Todos os beneficios Bronze',
                  'Reunioes mensais',
                  'Influencia em decisoes',
                  'Oportunidades de mídia'
                ],
                featured: true
              },
              {
                level: 'Ouro',
                investment: 'A partir de R$ 50.000',
                benefits: [
                  'Todos os beneficios Prata',
                  'Assento no conselho',
                  'Nomeacao de bolsas',
                  'Parceria estrátegica'
                ]
              }
            ].map((tier, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-300 group animate-fadeInUp ${
                  tier.featured
                    ? 'border-accent bg-gradient-to-br from-accent/10 to-accent/5 scale-105'
                    : 'border-border bg-background hover:border-accent'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tier.featured && (
                  <div className="mb-4 inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.level}</h3>
                <p className="text-accent font-semibold mb-6">{tier.investment}</p>
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    tier.featured
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                      : 'border border-accent text-accent hover:bg-accent/10'
                  }`}
                  variant={tier.featured ? 'default' : 'outline'}
                >
                  Saiba Mais
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">Histórias de Sucesso</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheca as vidas transformadas pelo apoio de nossos parceiros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Lucas Silva',
                story: 'Aos 16 anos, Lucas sonhava em ser baterista profissional. Com o apoio de nossos parceiros, conseguiu sua primeira bateria e agora e instrutor em nossa escola.'
              },
              {
                name: 'Maria Santos',
                story: 'Descobriu sua paixao pela musica atraves de nossas aulas. Hoje estuda em uma universidade renomada de musica com bolsa integral.'
              }
            ].map((story, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-lg text-muted-foreground mb-4 italic">"{story.story}"</p>
                <p className="font-semibold text-foreground">— {story.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent/70 rounded-3xl mx-4 md:mx-0">
        <div className="container">
          <div className="text-center animate-fadeInUp">
            <h2 className="text-4xl font-bold text-accent-foreground mb-4">Vamos Transformar Vidas Juntos?</h2>
            <p className="text-lg text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco para discutir oportunidades de parceria e investimento.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:parceria@dreamsinharmonies.com" className="px-8 py-3 bg-accent-foreground text-accent rounded-lg hover:bg-accent-foreground/90 transition-colors font-semibold">
                Fale Conosco
              </a>
              <a href="tel:+5511999999999" className="px-8 py-3 border border-accent-foreground text-accent-foreground rounded-lg hover:bg-accent-foreground/10 transition-colors font-semibold">
                Agendar Reuniao
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
