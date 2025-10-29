import React, { useState } from 'react'

type Props = { onSave: (kb: string[], persona: string) => void; initialKB: string[]; initialPersona: string }

export default function ChatBotAdmin({ onSave, initialKB, initialPersona }: Props) {
  const [kbText, setKbText] = useState(initialKB.join('\n\n'))
  const [persona, setPersona] = useState(initialPersona)

  return (
    <div className="p-3 bg-card border border-border rounded-lg space-y-2">
      <h3 className="font-semibold">Editar KB / Persona</h3>
      <label className="text-sm">Persona</label>
      <textarea value={persona} onChange={e => setPersona(e.target.value)} className="w-full p-2 rounded border" rows={3} />
      <label className="text-sm">KB (separe trechos com linha em branco)</label>
      <textarea value={kbText} onChange={e => setKbText(e.target.value)} className="w-full p-2 rounded border" rows={6} />
      <div className="flex gap-2 justify-end">
        <button onClick={() => onSave(kbText.split(/\n\n+/).map(s => s.trim()).filter(Boolean), persona)} className="px-3 py-2 rounded bg-accent text-accent-foreground">Salvar & Indexar</button>
      </div>
    </div>
  )
}
