import fetch from 'node-fetch';

type Item = { id: string; text: string; embedding: number[] };

const store: Item[] = [];

export function clearStore() {
  store.length = 0
}

export function addItem(id: string, text: string, embedding: number[]) {
  store.push({ id, text, embedding })
}

export function allItems() {
  return store.slice()
}

function dot(a: number[], b: number[]) {
  let s = 0
  for (let i = 0; i < a.length; i++) s += (a[i] || 0) * (b[i] || 0)
  return s
}

function norm(a: number[]) {
  return Math.sqrt(a.reduce((s, v) => s + v * v, 0))
}

export function similarity(a: number[], b: number[]) {
  const n = norm(a) * norm(b)
  if (n === 0) return 0
  return dot(a, b) / n
}

export function findNearest(embedding: number[], k = 3) {
  const scored = store.map(it => ({ item: it, score: similarity(embedding, it.embedding) }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, k).map(s => ({ id: s.item.id, text: s.item.text, score: s.score }))
}

export async function embedText(text: string, apiKey: string) {
  // Use OpenAI embeddings endpoint (text-embedding-3-small or similar)
  const url = 'https://api.openai.com/v1/embeddings'
  const model = 'text-embedding-3-small'
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ input: text, model })
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Embedding error: ${res.status} ${t}`)
  }
  const j = await res.json()
  return j.data[0].embedding as number[]
}
