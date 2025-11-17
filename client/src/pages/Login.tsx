import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Music } from 'lucide-react';
import AuthContext from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // parsing helper to avoid exceptions on empty/non-JSON responses
      const safeParse = async (res: Response) => {
        const text = await res.text();
        if (!text) return {};
        try {
          return JSON.parse(text);
        } catch {
          return { text };
        }
      };

      try {
        if (isSignUp) {
          // use context signup helper
          await auth.signup(name, email, password);
          // após criar conta, alterna para login
          setIsSignUp(false);
          setLocation('/login');
        } else {
          // use context login helper
          await auth.login(email, password);
          // redireciona para home
          setLocation('/');
        }
      } catch (err) {
        console.error(err);
        alert(err instanceof Error ? err.message : String(err));
      }
    };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-purple-light to-background py-12">
      <div className="w-full max-w-md animate-fadeInUp">
        <div className="p-8 rounded-2xl bg-card border border-border shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Music className="w-8 h-8 text-accent" />
              <h1 className="text-2xl font-bold text-foreground">Dreams in Harmonies</h1>
            </div>
            <p className="text-muted-foreground">
              {isSignUp ? 'Crie sua conta' : 'Acesse sua conta'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  required
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border accent-accent"
                  />
                  <span className="text-sm text-muted-foreground">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm text-accent hover:text-accent/80 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2 rounded-lg transition-all"
            >
              {isSignUp ? 'Criar Conta' : 'Entrar'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full border-border hover:bg-accent/10"
            >
              Continuar com Google
            </Button>
            <Button
              variant="outline"
              className="w-full border-border hover:bg-accent/10"
            >
              Continuar com Facebook
            </Button>
          </div>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? 'Ja tem uma conta?' : 'Nao tem uma conta?'}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-accent hover:text-accent/80 font-semibold transition-colors"
              >
                {isSignUp ? 'Entrar' : 'Criar Conta'}
              </button>
            </p>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-xs text-muted-foreground text-center">
              Ao continuar, voce concorda com nossos Termos de Servico e Politica de Privacidade.
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Voltar para Home
          </a>
        </div>
      </div>
    </div>
  );
}
