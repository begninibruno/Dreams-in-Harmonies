# Dreams-in-Harmonies
Dreams in Harmonies Website

## ChatBot integrado

Este projeto inclui um ChatBot simples embutido que aparece no canto inferior direito de todas as páginas. Ele usa um pequeno KB extraído do conteúdo do site e uma persona (Lucas Silva) para responder perguntas sobre cursos, horarios, bolsas e como começar a tocar instrumentos como bateria.

Onde editar:
- `client/src/components/ChatBot.tsx` — componente do ChatBot. Atualize a constante `SITE_KB` para adicionar mais texto do site e `PERSONA` para ajustar a persona.

Nota: o motor atual utiliza correspondência por palavras-chave e retornos predefinidos; para um assistente com "inteligência" mais avançada, integre um serviço de LLM ou vetor de semântica externo.

### Integração com OpenAI (opcional — recomendado)

Para respostas mais naturais e baseadas no conteúdo do site, o projeto inclui endpoints no servidor que usam a API da OpenAI para gerar respostas e criar embeddings.

1. Defina a variável de ambiente `OPENAI_API_KEY` no ambiente do servidor.

2. Inicie o servidor (na raiz do projeto):

```bash
# Instale dependências (se necessário)
pnpm install
# Inicie o servidor (exemplo)
pnpm --filter server start
```

3. O servidor expõe os endpoints:
- `POST /api/index-kb` — body: `{ texts: string[] }` vai indexar os trechos na memória.
- `POST /api/query` — body: `{ question: string, k?: number }` retorna os trechos mais similares.
- `POST /api/generate` — body: `{ question: string }` retorna uma resposta gerada usando os trechos recuperados e a persona.

4. O cliente (`ChatBot`) tenta usar `/api/generate` automaticamente; se o servidor não estiver disponível, cai para o motor local.

Aviso: colocar a chave da OpenAI em um repositório publico é inseguro; use variáveis de ambiente no servidor e nunca as compartilhe.

