import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export const runtime = 'nodejs'

function dataDir() {
  return process.env.TOKENTAP_DATA_DIR || '/var/lib/tokentap'
}

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true })
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params

  const chatDir = path.join(dataDir(), 'chat')
  const file = path.join(chatDir, `${sessionId}.json`)

  await ensureDir(chatDir)

  try {
    const raw = await fs.readFile(file, 'utf8')
    const json = JSON.parse(raw)
    return NextResponse.json(Array.isArray(json) ? json : [])
  } catch {
    return NextResponse.json([])
  }
}
