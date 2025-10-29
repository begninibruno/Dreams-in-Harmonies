import React from 'react'

type Props = { onClick: () => void; disabled?: boolean }

export default function SendButton({ onClick, disabled }: Props) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label="Enviar mensagem" className={`w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground shadow hover:scale-105 transition-transform ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    </button>
  )
}
