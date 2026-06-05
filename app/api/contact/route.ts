import { NextResponse } from 'next/server'
import { createItem } from '@directus/sdk'
import { directusClient } from '@/lib/cms/directus-client'
import { getSiteConfig } from '@/lib/cms/queries'
import { hasSmtpSettings, sendContactEmail, type SmtpSettings } from '@/lib/email/smtp'

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 5

const submissions = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = submissions.get(ip) ?? []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  submissions.set(ip, recent)
  return recent.length >= RATE_LIMIT_MAX
}

function recordSubmission(ip: string): void {
  const timestamps = submissions.get(ip) ?? []
  timestamps.push(Date.now())
  submissions.set(ip, timestamps)
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ValidationErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function validate(body: Record<string, unknown>): ValidationErrors | null {
  const errors: ValidationErrors = {}

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name) errors.name = 'Name is required'
  else if (name.length > 200) errors.name = 'Name is too long'

  if (!email) errors.email = 'Email is required'
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Invalid email address'
  else if (email.length > 320) errors.email = 'Email is too long'

  if (!subject) errors.subject = 'Subject is required'
  else if (subject.length > 500) errors.subject = 'Subject is too long'

  if (!message) errors.message = 'Message is required'
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters'
  else if (message.length > 5000) errors.message = 'Message is too long'

  return Object.keys(errors).length > 0 ? errors : null
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 },
      )
    }

    const errors = validate(body)
    if (errors) {
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 },
      )
    }

    const name = (body.name as string).trim()
    const email = (body.email as string).trim()
    const subject = (body.subject as string).trim()
    const message = (body.message as string).trim()

    await directusClient.request(
      createItem('hb_contact_submissions', { name, email, subject, message }),
    )

    const siteConfig = await getSiteConfig()
    const smtpSettings: Partial<SmtpSettings> = {
      host: siteConfig.smtp_host,
      port: siteConfig.smtp_port ?? undefined,
      secure: siteConfig.smtp_secure,
      user: siteConfig.smtp_user,
      password: siteConfig.smtp_password,
      fromEmail: siteConfig.smtp_from_email,
      toEmail: siteConfig.smtp_to_email,
    }

    if (hasSmtpSettings(smtpSettings)) {
      await sendContactEmail({ name, email, subject, message }, smtpSettings)
    }

    recordSubmission(ip)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to save your message. Please try again.' },
      { status: 500 },
    )
  }
}
