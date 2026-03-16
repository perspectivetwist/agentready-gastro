import { NextRequest, NextResponse } from 'next/server'
import { saveSlipstreamLead } from '@/lib/notion'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LENGTH = 254

export async function POST(request: NextRequest) {
  try {
    const { email, url, score } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email ist erforderlich' },
        { status: 400 }
      )
    }

    const trimmedEmail = email.trim().toLowerCase()

    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: 'Email zu lang' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Ungültige Email-Adresse' },
        { status: 400 }
      )
    }

    await saveSlipstreamLead({
      email: trimmedEmail,
      url: typeof url === 'string' ? url : '',
      score: typeof score === 'number' ? score : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('save-email error:', err instanceof Error ? err.message : err)
    return NextResponse.json(
      { error: 'Fehler beim Speichern' },
      { status: 500 }
    )
  }
}
