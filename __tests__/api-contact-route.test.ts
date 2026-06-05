/** @jest-environment node */

import { POST } from '@/app/api/contact/route'

const mockRequest = jest.fn()
const mockCreateItem = jest.fn((collection: string, payload: Record<string, unknown>) => ({
  collection,
  payload,
}))
const mockGetSiteConfig = jest.fn()
const mockSendContactEmail = jest.fn()

jest.mock('@/lib/cms/directus-client', () => ({
  directusClient: {
    request: (...args: unknown[]) => mockRequest(...args),
  },
}))

jest.mock('@/lib/cms/queries', () => ({
  getSiteConfig: () => mockGetSiteConfig(),
}))

jest.mock('@/lib/email/smtp', () => ({
  hasSmtpSettings: (settings: Record<string, unknown>) =>
    Boolean(
      settings.host &&
        settings.port &&
        settings.user &&
        settings.password &&
        settings.fromEmail &&
        settings.toEmail,
    ),
  sendContactEmail: (...args: unknown[]) => mockSendContactEmail(...args),
}))

jest.mock('@directus/sdk', () => ({
  createItem: (...args: [string, Record<string, unknown>]) => mockCreateItem(...args),
}))

function buildRequest(body: Record<string, unknown>, ip: string): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  })
}

function validBody(): Record<string, unknown> {
  return {
    name: 'Dr. Test User',
    email: 'test.user@example.com',
    subject: 'Academic Collaboration',
    message: 'I would love to collaborate on emergency medicine education research.',
  }
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    mockRequest.mockReset()
    mockCreateItem.mockReset()
    mockGetSiteConfig.mockReset()
    mockSendContactEmail.mockReset()
    mockCreateItem.mockImplementation((collection: string, payload: Record<string, unknown>) => ({
      collection,
      payload,
    }))
    mockGetSiteConfig.mockResolvedValue({
      smtp_host: '',
      smtp_port: null,
      smtp_secure: false,
      smtp_user: '',
      smtp_password: '',
      smtp_from_email: '',
      smtp_to_email: '',
    })
  })

  it('returns success for honeypot submissions without writing to cms', async () => {
    const response = await POST(
      buildRequest({ ...validBody(), website: 'spam' }, '10.0.0.10'),
    )
    const data = (await response.json()) as { success?: boolean }

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(mockRequest).not.toHaveBeenCalled()
    expect(mockSendContactEmail).not.toHaveBeenCalled()
  })

  it('returns validation errors for invalid payload', async () => {
    const response = await POST(
      buildRequest(
        { name: '', email: 'invalid', subject: '', message: 'short' },
        '10.0.0.11',
      ),
    )
    const data = (await response.json()) as {
      error?: string
      errors?: Record<string, string>
    }

    expect(response.status).toBe(400)
    expect(data.error).toBe('Validation failed')
    expect(data.errors).toMatchObject({
      name: 'Name is required',
      email: 'Invalid email address',
      subject: 'Subject is required',
      message: 'Message must be at least 10 characters',
    })
    expect(mockRequest).not.toHaveBeenCalled()
    expect(mockSendContactEmail).not.toHaveBeenCalled()
  })

  it('persists valid submissions', async () => {
    mockRequest.mockResolvedValueOnce({})

    const response = await POST(
      buildRequest(validBody(), '10.0.0.12'),
    )
    const data = (await response.json()) as { success?: boolean }

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(mockCreateItem).toHaveBeenCalledWith(
      'hb_contact_submissions',
      expect.objectContaining({
        name: 'Dr. Test User',
        email: 'test.user@example.com',
      }),
    )
    expect(mockRequest).toHaveBeenCalledTimes(1)
    expect(mockSendContactEmail).not.toHaveBeenCalled()
  })

  it('sends contact email with SMTP settings from Directus', async () => {
    mockRequest.mockResolvedValueOnce({})
    mockGetSiteConfig.mockResolvedValueOnce({
      smtp_host: 'smtp.example.com',
      smtp_port: 587,
      smtp_secure: false,
      smtp_user: 'doctor@example.com',
      smtp_password: 'app-password',
      smtp_from_email: 'doctor@example.com',
      smtp_to_email: 'assistant@example.com',
    })

    const response = await POST(
      buildRequest(validBody(), '10.0.0.15'),
    )

    expect(response.status).toBe(200)
    expect(mockSendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Dr. Test User',
        email: 'test.user@example.com',
        subject: 'Academic Collaboration',
      }),
      expect.objectContaining({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        user: 'doctor@example.com',
        password: 'app-password',
        fromEmail: 'doctor@example.com',
        toEmail: 'assistant@example.com',
      }),
    )
  })

  it('enforces ip-based rate limits', async () => {
    mockRequest.mockResolvedValue({})
    const ip = '10.0.0.13'

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(buildRequest(validBody(), ip))
      expect(response.status).toBe(200)
    }

    const limited = await POST(buildRequest(validBody(), ip))
    const data = (await limited.json()) as { error?: string }

    expect(limited.status).toBe(429)
    expect(data.error).toMatch(/Too many submissions/i)
    expect(mockRequest).toHaveBeenCalledTimes(5)
  })

  it('returns 500 when cms write fails', async () => {
    mockRequest.mockRejectedValueOnce(new Error('Directus unavailable'))

    const response = await POST(
      buildRequest(validBody(), '10.0.0.14'),
    )
    const data = (await response.json()) as { error?: string }

    expect(response.status).toBe(500)
    expect(data.error).toMatch(/Failed to save your message/i)
  })
})
