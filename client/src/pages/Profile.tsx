import { useContext, useEffect } from 'react';
import { useLocation } from 'wouter';
import AuthContext from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const auth = useContext(AuthContext);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!auth?.isAuthenticated) setLocation('/login');
  }, [auth, setLocation]);

  if (!auth?.user) return null;

  return (
    <div className="container py-20">
      <div className="max-w-md mx-auto p-8 rounded-2xl bg-card border border-border">
        <h1 className="text-2xl font-bold mb-4">Perfil</h1>
        <p className="text-sm text-muted-foreground mb-2">Nome</p>
        <p className="mb-4 text-foreground">{auth.user.name}</p>
        <p className="text-sm text-muted-foreground mb-2">Email</p>
        <p className="mb-6 text-foreground">{auth.user.email || '-'}</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setLocation('/')}>Voltar</Button>
          <Button onClick={() => { auth.logout(); setLocation('/'); }}>Sair</Button>
        </div>
      </div>
    </div>
  );
}
