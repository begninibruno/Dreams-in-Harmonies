import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint que seu chatbot já usa!
app.post("/api/generate", async (req, res) => {
  const { question } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente da escola de música. Responda com clareza, simpatia e detalhes úteis sobre aulas, preços, horários, bolsas, instrumentos e suporte ao aluno."
        },
        { role: "user", content: question }
      ]
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });

  } catch (e) {
    console.error(e);
    res.status(500).json({ answer: "Desculpe, ocorreu um erro ao gerar a resposta." });
  }
});

app.listen(3001, () => console.log("API rodando na porta 3001"));
