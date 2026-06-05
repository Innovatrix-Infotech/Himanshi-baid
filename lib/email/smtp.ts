import nodemailer from 'nodemailer'

export interface ContactEmailPayload {
  name: string
  email: string
  subject: string
  message: string
}

export interface SmtpSettings {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
  fromEmail: string
  toEmail: string
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function hasSmtpSettings(settings: Partial<SmtpSettings>): settings is SmtpSettings {
  return Boolean(
    settings.host &&
      settings.port &&
      settings.user &&
      settings.password &&
      settings.fromEmail &&
      settings.toEmail,
  )
}

export async function sendContactEmail(
  payload: ContactEmailPayload,
  settings: SmtpSettings,
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: {
      user: settings.user,
      pass: settings.password,
    },
  })

  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    '',
    payload.message,
  ].join('\n')

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
    <p>${escapeHtml(payload.message).replaceAll('\n', '<br />')}</p>
  `

  await transporter.sendMail({
    from: settings.fromEmail,
    replyTo: payload.email,
    to: settings.toEmail,
    subject: `Portfolio contact: ${payload.subject}`,
    text,
    html,
  })
}
