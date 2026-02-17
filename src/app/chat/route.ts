import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export const runtime = 'nodejs'

type ChatMsg = { sender: string; message: string; ts: string }

function dataDir() {
  return process.env.TOKENTAP_DATA_DIR || '/var/lib/tokentap'
}

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true })
}

export async function POST(req: NextRequest) {
  const chatDir = path.join(dataDir(), 'chat')
  await ensureDir(chatDir)

  const body = await req.json().catch(() => ({} as any))
  const session_id = String(body?.session_id ?? '')
  const sender = String(body?.sender ?? '')
  const message = String(body?.message ?? '')

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
