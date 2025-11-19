import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(cors());
  app.use(express.json());

  // --- Simple vector endpoints for ChatBot (requires OPENAI_API_KEY) ---
  const { embedText, addItem, clearStore, findNearest, allItems } = await (async () => await import('./vectorStore'))()

  app.post('/api/index-kb', async (req, res) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' })
      const { texts } = req.body
      if (!Array.isArray(texts)) return res.status(400).json({ error: 'texts must be an array of strings' })
      clearStore()
      for (let i = 0; i < texts.length; i++) {
        const t = String(texts[i])
        const emb = await embedText(t, apiKey)
        addItem(String(i), t, emb)
      }
      res.json({ message: 'Indexed', count: texts.length })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err instanceof Error ? err.message : String(err) })
    }
  })

  app.post('/api/query', async (req, res) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' })
      const { question, k = 3 } = req.body
      if (!question) return res.status(400).json({ error: 'question required' })
      const qEmb = await embedText(String(question), apiKey)
      const hits = findNearest(qEmb, Number(k))
      res.json({ hits })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err instanceof Error ? err.message : String(err) })
    }
  })

  app.post('/api/generate', async (req, res) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' })
      const { question } = req.body
      if (!question) return res.status(400).json({ error: 'question required' })
      // retrieve top passages
      const qEmb = await embedText(String(question), apiKey)
      const hits = findNearest(qEmb, 3)
      const context = hits.map(h => h.text).join('\n\n')

      // Build prompt with persona and context
      const persona = `Lucas Silva, 16 anos, estudante do ensino medio, aspirante a baterista. Seja empatico e encorajador.`
      const prompt = `Context:\n${context}\n\nPersona:\n${persona}\n\nQuestion:\n${question}\n\nAnswer in Portuguese, be concise and helpful:`

      const completionRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], max_tokens: 400 })
      })
      if (!completionRes.ok) {
        const t = await completionRes.text()
        throw new Error(`OpenAI completion error: ${completionRes.status} ${t}`)
      }
      const jr = await completionRes.json()
      const text = jr.choices?.[0]?.message?.content || ''
      res.json({ answer: text, hits })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err instanceof Error ? err.message : String(err) })
    }
  })

  // --- end vector endpoints ---

  // --- API routes ---

  // Criar usuário (registro)
  app.post('/usuarios', async (req, res) => {
    try {
      const { email, name, key } = req.body;

      if (!email || !key) {
        return res.status(400).json({ error: 'Email e senha (key) são obrigatórios' });
      }

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: 'Usuário com este email já existe' });
      }

      const hashed = await bcrypt.hash(key, 10);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          key: hashed, // salva a senha de forma segura (hash)
        },
        select: { id: true, email: true, name: true },
      });

      res.status(201).json({ message: 'Usuário criado com sucesso!', user });
    } catch (err) {
      console.error(err);
      const message = process.env.NODE_ENV === 'production' ? 'Erro ao criar usuário' : (err instanceof Error ? err.message : String(err));
      res.status(500).json({ error: message });
    }
  });

  // Login
  app.post('/login', async (req, res) => {
    try {
      const { email, key } = req.body;

      if (!email || !key) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const match = await bcrypt.compare(key, user.key);
      if (!match) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'segredo_super_secreto',
        { expiresIn: '1h' }
      );

      res.json({ message: 'Login realizado com sucesso!', token, email: user.email, name: user.name, id: user.id });
    } catch (err) {
      console.error(err);
      const message = process.env.NODE_ENV === 'production' ? 'Erro no login' : (err instanceof Error ? err.message : String(err));
      res.status(500).json({ error: message });
    }
  });

  // Listar usuários (com filtros simples)
  app.get('/usuarios', async (req, res) => {
    try {
      const where: any = {};
      if (req.query.name) where.name = { contains: String(req.query.name), mode: 'insensitive' };
      if (req.query.email) where.email = { contains: String(req.query.email), mode: 'insensitive' };

      const users = await prisma.user.findMany({ where, select: { id: true, email: true, name: true } });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      const message = process.env.NODE_ENV === 'production' ? 'Erro ao buscar usuários' : (err instanceof Error ? err.message : String(err));
      res.status(500).json({ error: message });
    }
  });

  // Atualizar usuário
  app.put('/usuarios/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const data: any = { email: req.body.email, name: req.body.name };
      if (req.body.key) {
        data.key = await bcrypt.hash(req.body.key, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data,
        select: { id: true, email: true, name: true },
      });

      res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      const message = process.env.NODE_ENV === 'production' ? 'Erro ao atualizar usuário' : (err instanceof Error ? err.message : String(err));
      res.status(500).json({ error: message });
    }
  });

  // Deletar usuário
  app.delete('/usuarios/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      await prisma.user.delete({ where: { id } });
      // Retornar JSON para evitar que clientes tentem parsear corpo vazio
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
      console.error(err);
      const message = process.env.NODE_ENV === 'production' ? 'Erro ao deletar usuário' : (err instanceof Error ? err.message : String(err));
      res.status(500).json({ error: message });
    }
  });

  // --- Fim das rotas de API ---

  // --- Enrollment endpoints (por usuário) ---
  function getTokenFromHeader(req: any) {
    const h = req.headers?.authorization || req.headers?.Authorization;
    if (!h) return null;
    const parts = String(h).split(' ');
    if (parts.length !== 2) return null;
    return parts[1];
  }

  function verifyToken(token: string | null) {
    try {
      if (!token) return null;
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'segredo_super_secreto') as any;
      return payload;
    } catch (err) {
      return null;
    }
  }

  // lista inscrições do usuário autenticado
  app.get('/api/enrollments', async (req, res) => {
    try {
      const token = getTokenFromHeader(req);
      const payload = verifyToken(token);
      if (!payload || !payload.userId) return res.status(401).json({ error: 'Unauthorized' });
      const userId = payload.userId as number;
      const items = await prisma.enrollment.findMany({ where: { userId }, select: { courseSlug: true } });
      return res.json({ enrollments: items.map((i) => i.courseSlug) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  // criar inscrição
  app.post('/api/enrollments', async (req, res) => {
    try {
      const token = getTokenFromHeader(req);
      const payload = verifyToken(token);
      if (!payload || !payload.userId) return res.status(401).json({ error: 'Unauthorized' });
      const userId = payload.userId as number;
      const { courseSlug } = req.body;
      if (!courseSlug) return res.status(400).json({ error: 'courseSlug required' });
      // upsert-like behaviour: ignore if already exists
      const existing = await prisma.enrollment.findUnique({ where: { userId_courseSlug: { userId, courseSlug } } }).catch(() => null);
      if (existing) return res.status(200).json({ message: 'Already enrolled' });
      const created = await prisma.enrollment.create({ data: { userId, courseSlug } });
      return res.status(201).json({ message: 'Enrolled', enrollment: { courseSlug: created.courseSlug } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  // remover inscrição
  app.delete('/api/enrollments/:slug', async (req, res) => {
    try {
      const token = getTokenFromHeader(req);
      const payload = verifyToken(token);
      if (!payload || !payload.userId) return res.status(401).json({ error: 'Unauthorized' });
      const userId = payload.userId as number;
      const slug = String(req.params.slug || '');
      await prisma.enrollment.deleteMany({ where: { userId, courseSlug: slug } });
      return res.json({ message: 'Unenrolled' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  // --- fim endpoints de enrollment ---

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, 'public')
      : path.resolve(__dirname, '..', 'dist', 'public');

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    // Serve the SPA entry for any non-API route so client-side routing works.
    // Previously this returned 404 for `/usuarios` and `/login`, which caused
    // direct navigations or refreshes on those client routes to fail.
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  // Use 3001 as the default backend port to avoid colliding with Vite dev server (which uses 3000).
  const port = process.env.PORT || 3001;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
