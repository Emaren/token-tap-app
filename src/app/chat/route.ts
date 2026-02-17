import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export const runtime = 'nodejs'

type ChatMsg = { sender: string; message: string; ts: string }
type PostChatBody = { session_id?: unknown; sender?: unknown; message?: unknown }

function dataDir() {
  return process.env.TOKENTAP_DATA_DIR || '/var/lib/tokentap'
}

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true })
}

export async function POST(req: NextRequest) {
  const chatDir = path.join(dataDir(), 'chat')
  await ensureDir(chatDir)

  const parsedBody: unknown = await req.json().catch(() => ({}))
  const body =
    parsedBody && typeof parsedBody === 'object'
      ? (parsedBody as PostChatBody)
      : {}
  const session_id =
    typeof body.session_id === 'string' ? body.session_id : ''
  const sender = typeof body.sender === 'string' ? body.sender : ''
  const message = typeof body.message === 'string' ? body.message : ''

  if (!session_id || !sender || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const file = path.join(chatDir, `${session_id}.json`)

  let existing: ChatMsg[] = []
  try {
    existing = JSON.parse(await fs.readFile(file, 'utf8'))
    if (!Array.isArray(existing)) existing = []
  } catch {}

  existing.push({ sender, message, ts: new Date().toISOString() })

  await fs.writeFile(file, JSON.stringify(existing, null, 2), 'utf8')
  return NextResponse.json({ ok: true })
}
