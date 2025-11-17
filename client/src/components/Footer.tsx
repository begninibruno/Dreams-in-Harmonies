import { Link } from 'wouter';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div className="animate-fadeInUp">
            <h3 className="text-lg font-bold text-accent mb-4 ">Dreams in Harmonies</h3>
            <p className="text-sm text-muted-foreground">
              Transformando sonhos em realidade através da música, oferecendo acesso a educação musical de qualidade para todos.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors">Sobre Nós</a>
                </Link>
              </li>
              <li>
                <Link href="/instruments">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors">Instrumentos</a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors">FAQ</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:@dreamsinharmonies.com" className="hover:text-accent transition-colors">
                  @dreamsinharmonies.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+5511999999999" className="hover:text-accent transition-colors">
                  +55 (19) 96536-2584
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Americana, SP</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold text-foreground mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Dreams in Harmonies. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Termos de Serviço
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
