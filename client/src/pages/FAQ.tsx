import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Como funciona o programa de educacao musical?',
      answer: 'Oferecemos aulas online e presenciais com professores qualificados. Voce pode escolher seu instrumento, horario e nivel de aprendizado. Todas as aulas sao acessiveis e adaptadas ao seu ritmo.'
    },
    {
      question: 'Quanto custa as aulas?',
      answer: 'Oferecemos opcoes gratuitas para alunos com dificuldades financeiras e planos acessiveis a partir de R$ 50/mes. Tambem temos bolsas de estudo e programas de patrocinio.'
    },
    {
      question: 'Preciso ter experiencia anterior?',
      answer: 'Nao! Recebemos alunos iniciantes e avancados. Nossos professores adaptam o ensino ao seu nivel e ritmo de aprendizado.'
    },
    {
      question: 'Qual e a idade minima para participar?',
      answer: 'Aceitamos alunos a partir de 5 anos. Temos programas especificos para criancas, adolescentes e adultos.'
    },
    {
      question: 'Como funciona o acesso aos instrumentos?',
      answer: 'Fornecemos instrumentos para aulas presenciais. Para aulas online, voce pode usar seus proprios instrumentos ou entrar em contato conosco para opcoes de emprestimo.'
    },
    {
      question: 'Posso mudar de instrumento durante o curso?',
      answer: 'Sim! Voce pode explorar diferentes instrumentos. Recomendamos conversar com nossos coordenadores para planejar melhor sua jornada.'
    },
    {
      question: 'Como me inscrevo?',
      answer: 'Visite nossa pagina de login, crie uma conta e escolha seu instrumento e horario. Nosso time entrara em contato para confirmar sua inscricao.'
    },
    {
      question: 'Existem oportunidades de performance?',
      answer: 'Sim! Organizamos recitais, apresentacoes em comunidades e eventos musicais onde nossos alunos podem compartilhar seu aprendizado.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-purple-light to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Perguntas <span className="text-accent">Frequentes</span></h1>
            <p className="text-xl text-muted-foreground">
              Encontre respostas para suas duvidas sobre nossos programas e servicos.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-border overflow-hidden hover:border-accent transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between bg-card hover:bg-card/80 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground text-left">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-accent transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-background border-t border-border animate-slideInDown">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container max-w-3xl text-center animate-fadeInUp">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nao encontrou sua resposta?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Entre em contato conosco e nossa equipe ficara feliz em ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contato@dreamsinharmonies.com" className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold">
              Enviar Email
            </a>
            <a href="tel:+5511999999999" className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors font-semibold">
              Ligar Agora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
