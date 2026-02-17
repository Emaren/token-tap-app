// src/app/onboarding/onboarding-inner.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Message {
  from: string;
  text: string;
}

type SessionData = {
  id?: string;
  status?: string | null;
  customer_email?: string | null;
  payment_status?: string | null;
  error?: string;
};

function errorMessage(err: unknown, fallback: string) {
  return err instanceof Error ? err.message : fallback;
}

export default function OnboardingInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const canLoad = useMemo(() => Boolean(sessionId), [sessionId]);

  useEffect(() => {
    let alive = true;

    async function fetchAll() {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // 1) Stripe session (via Next route — no localhost)
        const sessionRes = await fetch(`/stripe-session/${encodeURIComponent(sessionId)}`);
        const sessionJson = (await sessionRes.json().catch(() => null)) as SessionData | null;

        if (!alive) return;

        if (!sessionRes.ok) {
          setSessionData({ error: sessionJson?.error ?? "Failed to load Stripe session" });
        } else {
          setSessionData(sessionJson);
        }

        // 2) Existing chat (via Next route — no localhost)
        const chatRes = await fetch(`/chat/${encodeURIComponent(sessionId)}`);
        const chatJson = (await chatRes.json().catch(() => null)) as
          | Array<{ sender: string; message: string }>
          | { error?: string }
          | null;

        if (!alive) return;

        if (chatRes.ok && Array.isArray(chatJson)) {
          setMessages(
            chatJson.map((m) => ({
              from: m.sender === "Tony" ? "Tony" : "You",
              text: m.message,
            }))
          );
        } else {
          // If chat is empty or errors, just start with no messages.
          setMessages([]);
        }
      } catch (err: unknown) {
        if (!alive) return;
        setSessionData({
          error: errorMessage(err, "Failed to load onboarding data"),
        });
        setMessages([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    fetchAll();

    return () => {
      alive = false;
    };
  }, [sessionId]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !sessionId) return;

    const newMsg: Message = { from: "You", text };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          sender: "User",
          message: text,
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        console.error("❌ Chat POST failed", { status: res.status, data: j });
      }
    } catch (e) {
      console.error("❌ Chat POST error", e);
    }
  };

  if (loading) return <p className="text-white p-10">Loading&nbsp;session…</p>;

  if (!canLoad) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">
        <div className="max-w-lg w-full">
          <h1 className="text-2xl font-bold mb-2">Missing session_id</h1>
          <p className="text-white/70">
            This page needs a Stripe session id in the URL, like:
            <span className="block mt-2 font-mono text-white/80">
              /onboarding?session_id=cs_test_...
            </span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">🎉 Payment Confirmed</h1>

        {sessionData?.error ? (
          <p className="mb-4 text-red-300">{sessionData.error}</p>
        ) : (
          <>
            <p className="mb-2">
              Welcome,&nbsp;
              <strong>{sessionData?.customer_email ?? "customer"}</strong>!
            </p>
            <p className="mb-4">Let’s customize your token.</p>
          </>
        )}

        <div className="bg-gray-900 rounded p-4 mb-4 h-64 overflow-y-auto text-sm space-y-2">
          {messages.length === 0 ? (
            <div className="text-white/60">No messages yet.</div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx}>
                <span className="font-semibold">{msg.from}:</span> {msg.text}
              </div>
            ))
          )}
        </div>

        <div className="flex">
          <textarea
            className="flex-1 p-2 text-white bg-zinc-900 rounded-l resize-none"
            placeholder="Type a message and hit Enter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded-r">
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
