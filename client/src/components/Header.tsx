import { useContext, useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthContext from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Sobre Nós' },
  { href: '/instruments', label: 'Instrumentos' },
  // Cursos só aparecem para usuários autenticados
  ...(auth?.isAuthenticated ? [{ href: '/courses', label: 'Cursos' }] : []),
    { href: '/faq', label: 'FAQ' },
    { href: '/donations', label: 'Doações' },
    { href: '/partnership', label: 'Parceria' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border animate-fadeInDown">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-bold text-xl text-accent hover:text-accent/80 transition-colors">
            <Music className="w-6 h-6" />
            <span className="hidden sm:inline">Dreams in Harmonies</span>
            <span className="sm:hidden">DIH</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-accent/10 rounded-md transition-all duration-200">
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Desktop Login Button or Avatar */}
        <div className="hidden md:flex items-center gap-2">
          {auth?.isAuthenticated && auth.user ? (
            <div className="relative">
              <button
                className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold"
                onClick={() => setMenuOpen((s) => !s)}
                aria-label="Abrir menu do usuário"
              >
                {auth.user.initials || auth.user.name?.slice(0,2).toUpperCase()}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-md shadow-lg z-50">
                  <button className="w-full text-left px-3 py-2 hover:bg-accent/10" onClick={() => { setMenuOpen(false); setLocation('/profile'); }}>
                    Perfil
                  </button>
                  <button className="w-full text-left px-3 py-2 hover:bg-accent/10 text-destructive" onClick={() => { auth.logout(); setMenuOpen(false); setLocation('/'); }}>
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" className="bg-accent text-accent-foreground transition-transform duration-150 transform-gpu hover:scale-105">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-accent/10 rounded-md transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-accent" />
          ) : (
            <Menu className="w-6 h-6 text-accent" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur animate-slideInDown">
          <div className="container py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-accent/10 rounded-md transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            {auth?.isAuthenticated && auth.user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">
                  {auth.user.initials || auth.user.name?.slice(0,2).toUpperCase()}
                </div>
                <Button variant="outline" size="sm" className="ml-2" onClick={() => { auth.logout(); setIsOpen(false); }}>
                  Sair
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" className="w-full mt-2 bg-accent text-accent-foreground transition-transform duration-150 transform-gpu hover:scale-105">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
