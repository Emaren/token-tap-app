// src/app/onboarding/onboarding-inner.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Message {
  from: string
  text: string
}

export default function OnboardingInner() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [sessionData, setSessionData] =
    useState<{ customer_email?: string } | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    async function fetchAll() {
      if (!sessionId) return

      // 1. Stripe session
      const sessionRes = await fetch(
        `http://localhost:8000/stripe-session/${sessionId}`
      )
      const sessionJson = await sessionRes.json()
      setSessionData(sessionJson)

      // 2. Existing chat
      const chatRes = await fetch(`http://localhost:8000/chat/${sessionId}`)
      const chatJson = await chatRes.json()
      setMessages(
        chatJson.map(
          (m: { sender: string; message: string }): Message => ({
            from: m.sender === 'Tony' ? 'Tony' : 'You',
            text: m.message,
          })
        )
      )

      setLoading(false)
    }

    fetchAll()
  }, [sessionId])

  const handleSend = async () => {
    if (!input.trim()) return

    const newMsg = { from: 'You', text: input.trim() }
    setMessages((prev) => [...prev, newMsg])
    setInput('')

    await fetch('http://localhost:8000/chat/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        sender: 'User',
        message: newMsg.text,
      }),
    })
  }

  if (loading)
    return <p className="text-white p-10">Loading&nbsp;session…</p>

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">🎉 Payment Confirmed</h1>
        <p className="mb-2">
          Welcome,&nbsp;<strong>{sessionData?.customer_email}</strong>!
        </p>
        <p className="mb-4">Let’s customize your token.</p>

        <div className="bg-gray-900 rounded p-4 mb-4 h-64 overflow-y-auto text-sm space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx}>
              <span className="font-semibold">{msg.from}:</span> {msg.text}
            </div>
          ))}
        </div>

        <div className="flex">
          <textarea
            className="flex-1 p-2 text-white bg-zinc-900 rounded-l resize-none"
            placeholder="Type a message and hit Enter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              !e.shiftKey &&
              (e.preventDefault(), handleSend())
            }
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  )
}
