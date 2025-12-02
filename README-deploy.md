# Deploy rápido (Vercel) — Static-only

Este repositório produz uma SPA (Vite) e um pequeno servidor Express. Para publicar apenas o front-end estático no Vercel (Opção A) siga estas instruções.

1) Pré-requisitos
- Ter `pnpm` instalado localmente (ou usar o instalador do Vercel).

2) Configuração do projeto no Vercel
- Em **Project Settings > General > Build & Output Settings** (ou durante criação do projeto):
  - **Build command**: `pnpm install && pnpm build`
  - **Output Directory**: `dist/public`

- Caso prefira configurar via `vercel.json`, já existe um arquivo `vercel.json` na raiz que define `dist/public` como saída e habilita SPA routing.

3) Variáveis de ambiente (opcional, mas recomendado)
- Se o front chamar APIs, defina `VITE_API_URL` apontando para o backend público (ex.: `https://api.meusite.com`). Sem isso, as chamadas para `/api` apontarão para a raiz do site.

4) Observações importantes
- Este deploy NÃO executa o servidor Express embutido em `server/`.
- Se precisar das APIs e do servidor Express junto com a SPA, use um host que rode processos Node (Render, Railway, Fly) e configure o `start` para `node dist/index.js`.

5) Teste local (antes de deploy)
```powershell
pnpm install
pnpm build
# Verifique artefatos
Test-Path .\dist\public\index.html  # deve retornar True
Test-Path .\dist\index.js            # deve retornar True (server bundle)

# Rodar server de produção local (opcional)
$env:NODE_ENV='production'; node dist/index.js
# abra http://localhost:3001
```

6) Re-deploy
- Atualize as configurações no painel do Vercel como mostrado acima e clique em Re-deploy.
- Se continuar vendo código fonte/Ts sendo servido, verifique o *Publish Directory* — o Vercel pode estar servindo a raiz do repositório por engano.

Se quiser, eu posso gerar um `README` separado com instruções para Render/Railway para hospedar o servidor Express também.
