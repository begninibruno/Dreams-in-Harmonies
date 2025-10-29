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

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, 'public')
      : path.resolve(__dirname, '..', 'dist', 'public');

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    // If the request starts with /usuarios or /login, skip and let API handle it
    if (req.path.startsWith('/usuarios') || req.path === '/login') {
      return res.status(404).json({ error: 'Not found' });
    }

    res.sendFile(path.join(staticPath, 'index.html'));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
