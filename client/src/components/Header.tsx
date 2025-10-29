import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Sobre Nós' },
    { href: '/instruments', label: 'Instrumentos' },
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

        {/* Desktop Login Button */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
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
            <Link href="/login">
              <Button variant="outline" size="sm" className="w-full mt-2">
                Login
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
