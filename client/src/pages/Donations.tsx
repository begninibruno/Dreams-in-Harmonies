import { Button } from '@/components/ui/button';
import { Heart, Users, Target, TrendingUp } from 'lucide-react';

export default function Donations() {
  const donationPlans = [
    {
      amount: 'R$ 25',
      period: 'mes',
      title: 'Amigo',
      description: 'Ajude um aluno a ter sua primeira aula',
      benefits: ['Acesso a relatorios de impacto', 'Certificado de doador', 'Newsletter mensal']
    },
    {
      amount: 'R$ 100',
      period: 'mes',
      title: 'Patrocinador',
      description: 'Sponsor uma bolsa de estudos completa',
      benefits: ['Todos os beneficios anteriores', 'Reconhecimento no site', 'Atualizacoes trimestrais']
    },
    {
      amount: 'R$ 500',
      period: 'mes',
      title: 'Benfeitor',
      description: 'Transforme vidas atraves da musica',
      benefits: ['Todos os beneficios anteriores', 'Reunioes trimestrais', 'Influencia em decisoes']
    }
  ];

  const impacts = [
    { icon: <Users className="w-8 h-8" />, value: '500+', label: 'Alunos Beneficiados' },
    { icon: <Target className="w-8 h-8" />, value: '10+', label: 'Instrumentos Disponiveis' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '95%', label: 'Taxa de Sucesso' }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-purple-light to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Apoie Nossa <span className="text-accent">Missão</span></h1>
            <p className="text-xl text-muted-foreground">
              Sua doação transforma vidas. Ajude jovens talentosos a realizar seus sonhos musicais.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-background border border-border hover:border-accent transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                  {impact.icon}
                </div>
                <p className="text-4xl font-bold text-accent mb-2">{impact.value}</p>
                <p className="text-muted-foreground">{impact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Plans */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">Escolha Como Ajudar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada contribuicao, por menor que seja, faz uma diferenca real na vida de nossos alunos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {donationPlans.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-300 group animate-fadeInUp ${
                  index === 1
                    ? 'border-accent bg-gradient-to-br from-accent/10 to-accent/5 scale-105'
                    : 'border-border bg-card hover:border-accent'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {index === 1 && (
                  <div className="mb-4 inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                    Mais Popular
                  </div>
                )}
                <div className="mb-4">
                  <span className="text-4xl font-bold text-accent">{plan.amount}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.title}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${
                    index === 1
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                      : 'border border-accent text-accent hover:bg-accent/10'
                  }`}
                  variant={index === 1 ? 'default' : 'outline'}
                >
                  Doar Agora
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-time Donation */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container max-w-2xl text-center animate-fadeInUp">
          <Heart className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-foreground mb-4">Doação Unica</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Prefere fazer uma doação unica? Escolha o valor que faz sentido para voce.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {['R$ 50', 'R$ 100', 'R$ 250', 'Outro'].map((value, i) => (
              <Button
                key={i}
                variant={i === 0 ? 'default' : 'outline'}
                className={i === 0 ? 'bg-accent hover:bg-accent/90' : 'border-accent text-accent hover:bg-accent/10'}
              >
                {value}
              </Button>
            ))}
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Fazer Doação
          </Button>
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">Por que Doar?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Transformacao de Vidas',
                description: 'Suas doação permitem que jovens talentosos como Lucas Silva realizem seus sonhos musicais.'
              },
              {
                title: 'Impacto Comunitario',
                description: 'Ajudamos a criar uma comunidade mais rica culturalmente e socialmente.'
              },
              {
                title: 'Transparencia Total',
                description: 'Saiba exatamente como sua doação e utilizada atraves de relatorios detalhados.'
              },
              {
                title: 'Deducao Fiscal',
                description: 'Suas doação podem ser dedutiveis em sua declaracao de imposto de renda.'
              }
            ].map((reason, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-background border border-border hover:border-accent transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
