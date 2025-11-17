import React, { useState, useEffect, useRef } from 'react'
import '../index.css'
import ChatBotAdmin from './ChatBotAdmin'
import SendButton from './SendButton'

type Message = { from: 'bot' | 'user'; text: string }

// KB extraído das páginas principais do site (Home, About, Instruments, FAQ)
const SITE_KB: string[] = [
  'Transforme seus Sonhos em Harmonias — acesso democrático à educação musical de qualidade. A escola acredita que a música é um direito, não um privilégio.',
  'Oferecemos aulas de bateria, guitarra, baixo, teclado, violão, vocalização e prática em conjunto.',
  'Opções presenciais e online; instrumentos disponíveis para aulas presenciais e opções de empréstimo.',
  'Planos acessíveis: há opções gratuitas para alunos com dificuldades financeiras e planos a partir de R$ 50/mes; também oferecemos bolsas e patrocínios.',
  'Horários flexíveis: manhã, tarde, noite e sábados. Aulas adaptadas ao ritmo do aluno.',
  'Professores qualificados com metodologia moderna e experiência prática; foco em iniciantes e desenvolvimento de carreira.',
  'Missão: democratizar o acesso à educação musical; visão: ser plataforma inclusiva que transforma vidas; valores: acessibilidade, comunidade e qualidade.',
  'Beneficios de aprender musica: desenvolvimento cognitivo, expressao criativa, disciplina, paciencia e conexoes sociais.',
  'Inscricao: crie uma conta na pagina de login, escolha instrumento e horario; a equipe entra em contato para confirmar inscricao.',
  'O site organiza recitais, apresentacoes e oportunidades de performance para alunos.'
]

const PERSONA = `Lucas Silva, 16 anos, estudante do ensino médio, aspirante a baterista. Tem desafios financeiros e de transporte, busca uma escola de música acessível e orientações sobre carreira musical.`

function scoreAnswer(query: string, source: string) {
  const q = query.toLowerCase()
  const s = source.toLowerCase()
  let score = 0
  if (s.includes(q)) score += 10
  const words = q.split(/\W+/).filter(Boolean)
  for (const w of words) if (s.includes(w)) score += 1
  return score
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem('chat_messages')
      if (raw) {
        const parsed: Message[] = JSON.parse(raw)
        // filter admin mode messages that shouldn't persist for non-admins
        const filtered = parsed.filter(m => !/Modo de edição do KB ativado|Modo de edição do KB desativado/i.test(m.text))
        return filtered.length ? filtered : [{ from: 'bot', text: `Olá! Eu sou o assistente da escola. Posso ajudar com horários, cursos, preços e como começar a tocar bateria. Como posso ajudar hoje?` }]
      }
      return [{ from: 'bot', text: `Olá! Eu sou o assistente da escola. Posso ajudar com horários, cursos, preços e como começar a tocar bateria. Como posso ajudar hoje?` }]
    } catch (e) {
      return [{ from: 'bot', text: `Olá! Eu sou o assistente da escola. Posso ajudar com horários, cursos, preços e como começar a tocar bateria. Como posso ajudar hoje?` }]
    }
  })
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [typing, setTyping] = useState(false)
  const [kb, setKb] = useState<string[]>(SITE_KB)
  const [persona, setPersona] = useState(PERSONA)
  const [adminVisible, setAdminVisible] = useState(false)

  // index KB on mount (best-effort)
  useEffect(() => {
    async function index() {
      try {
        await fetch('/api/index-kb', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ texts: kb }) })
      } catch (e) {
        // ignore: server may not be configured
      }
    }
    index()
  }, [])

  // ensure chat is closed on fresh load
  useEffect(() => {
    setOpen(false)
    setMinimized(false)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  function handleSend() {
    if (!input.trim()) return
    const text = input.trim()
    const cmd = text.toLowerCase()

    // toggle edit KB mode when user types /editarkb
    if (cmd === '/editarkb') {
      setAdminVisible(v => {
        const next = !v
        // ensure chat is visible when entering edit mode
        if (!v) { setOpen(true); setMinimized(false) }
        return next
      })
      setInput('')
      return
    }
    setMessages(m => {
      const next = [...m, { from: 'user', text }]
      try { localStorage.setItem('chat_messages', JSON.stringify(next)) } catch (e) {}
      return next
    })
    setInput('')
    setTyping(true)
    // try server generate first
    fetch('http://localhost:3001/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: text }) })
      .then(async r => {
        if (!r.ok) throw new Error('no-server')
        const j = await r.json()
        const botText = j.answer || j || 'Desculpe, não tenho essa informação agora.'
        setMessages(m => {
          const next = [...m, { from: 'bot', text: botText }]
          try { localStorage.setItem('chat_messages', JSON.stringify(next)) } catch (e) {}
          return next
        })
      })
      .catch(() => {
        // fallback to local generator
        const bot = generateResponse(text)
        setMessages(m => {
          const next = [...m, { from: 'bot', text: bot }]
          try { localStorage.setItem('chat_messages', JSON.stringify(next)) } catch (e) {}
          return next
        })
      })
      .finally(() => setTyping(false))
  }

  function generateResponse(query: string) {
    const candidates = [...SITE_KB, PERSONA]
    let best = { score: -1, text: "Desculpe, não tenho essa informação agora. Você pode perguntar sobre cursos, horários, preços, bolsas ou como começar a tocar bateria." }
    for (const c of candidates) {
      const s = scoreAnswer(query, c)
      if (s > best.score) best = { score: s, text: c }
    }

    // Reescrever a resposta para usar tom empático e persona quando apropriado
  const q = query.toLowerCase()

    // Intencoes relacionadas a sonhos e apoio familiar (persona Lucas)
    if (q.includes('apoio') || q.includes('familia') || q.includes('nao me apoiam') || q.includes('por que nao') || q.includes('por que vocês')) {
      return `Entendo como voce se sente. Muitos jovens como Lucas enfrentam resistencia familiar por ser uma carreira considerada incerta. Podemos ajudar com informacoes praticas sobre carreira, oportunidades e planos acessiveis para mostrar que a musica pode ser uma trayectoria viavel.`
    }

    // Dúvidas sobre carreira / futuro incerto
    if (q.includes('carreira') || q.includes('futuro') || q.includes('profissional') || q.includes('incerto')) {
      return `A area musical oferece caminhos diversos: performance, ensino, producao e musica para midia. Com pratica e orientacao, e possivel construir uma carreira. Temos professores e um plano de aprendizagem para ajudar nesse percurso.`
    }

    // Transporte e logistica
    if (q.includes('transporte') || q.includes('como chegar') || q.includes('localizacao')) {
      return `Temos localizacao acessivel e orientacoes de transporte no site. Alem disso, oferecemos aulas online caso o transporte seja uma barreira.`
    }

    // Conciliar trabalho e estudo
    if (q.includes('trabalhar') || q.includes('conciliar') || q.includes('tempo') || q.includes('horario')) {
      return `Sabemos que conciliar trabalho e estudo e dificil. Nossas aulas possuem horarios flexiveis e planos modulares para encaixar nas rotinas de quem trabalha. Podemos sugerir um cronograma inicial adaptado a sua disponibilidade.`
    }

    if (q.includes('bateria') || q.includes('baterista')) {
      return `A bateria e uma otima escolha — oferecemos aulas para iniciantes ate avancados, com professores especializados. Podemos agendar uma aula experimental para voce experimentar.`
    }

    if (q.includes('preço') || q.includes('valor') || q.includes('taxa') || q.includes('quanto')) {
      return `Temos planos a partir de R$ 50/mes, opcoes gratuitas para quem precisa e programas de bolsas. Se quiser, posso listar as opcoes e ajudar a escolher conforme sua disponibilidade.`
    }

    if (q.includes('bolsa') || q.includes('desconto') || q.includes('acessível')) {
      return `Sim, oferecemos bolsas e descontos. Podemos avaliar sua situacao e orientar sobre documentos ou requisitos para solicitar apoio.`
    }

    // fallback: fornecer trecho mais relevante do KB e convite para esclarecimento
  const reply = best.text
  return `${reply} Se quiser mais detalhes sobre isso, pergunte de forma mais especifica (por exemplo: 'quais os horarios da bateria' ou 'como me inscrevo')`
  }

  return (
    <div>
      {/* painel do chat: renderiza somente quando open === true */}
      {open && (
        <div className={`fixed right-6 bottom-6 z-50 transition-transform duration-300 ease-out`} aria-live="polite">
          <div className={`w-80 ${minimized ? 'h-14' : ''} bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 animate-fade-in`} style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}>
            <div className="p-2 bg-gradient-to-r from-accent to-accent/70 text-white flex items-center justify-between space-x-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">🥁</div>
                <div className="leading-tight">
                  <div className="font-semibold">Assistente da Escola</div>
                  <div className="text-xs opacity-90">Como posso ajudar?</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setMinimized(m => !m); }} aria-label="Minimizar" className="px-2 py-1 rounded hover:bg-white/10 transition">_</button>
                <button onClick={() => { setOpen(false); setMinimized(false); }} aria-label="Fechar" className="px-2 py-1 rounded hover:bg-white/10 transition">✕</button>
              </div>
            </div>

            {!minimized && (
              <>
                <div ref={scrollRef} className="h-56 overflow-y-auto p-3 bg-white dark:bg-gray-800">
                  {messages.map((m, i) => (
                    <div key={i} className={`mb-3 flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${m.from === 'user' ? 'bg-accent text-accent-foreground' : 'bg-gray-100 dark:bg-gray-700 text-gray-900'} px-3 py-2 rounded-lg max-w-[70%]`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {typing && <div className="text-sm text-muted-foreground">Assistente está digitando...</div>}
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-900 flex gap-2 items-center">
                  <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSend() }} placeholder="Escreva sua pergunta..." className="flex-1 min-w-0 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
                  <div className="z-50">
                    <SendButton onClick={handleSend} disabled={!input.trim()} />
                  </div>
                </div>
                <div className="p-2 border-t border-border bg-card">
                  {adminVisible && (
                    <ChatBotAdmin initialKB={kb} initialPersona={persona} onSave={async (newKb, newPersona) => {
                      setKb(newKb)
                      setPersona(newPersona)
                      try { await fetch('/api/index-kb', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ texts: newKb }) }) } catch (e) {}
                    }} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* botão flutuante (bolinha) */}
      {!open && (
        <button onClick={() => { setOpen(true); setMinimized(false) }} className="fixed right-6 bottom-6 z-50 bg-accent hover:scale-105 active:scale-95 text-accent-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg animate-bounce transition-transform" aria-label="Abrir chat">💬</button>
      )}
    </div>
  )
}
