/** @jest-environment node */

import { POST } from '@/app/api/contact/route'

const mockRequest = jest.fn()
const mockCreateItem = jest.fn((collection: string, payload: Record<string, unknown>) => ({
  collection,
  payload,
}))

jest.mock('@/lib/cms/directus-client', () => ({
  directusClient: {
    request: (...args: unknown[]) => mockRequest(...args),
  },
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
    mockCreateItem.mockImplementation((collection: string, payload: Record<string, unknown>) => ({
      collection,
      payload,
    }))
  })

  it('returns success for honeypot submissions without writing to cms', async () => {
    const response = await POST(
      buildRequest({ ...validBody(), website: 'spam' }, '10.0.0.10'),
    )
    const data = (await response.json()) as { success?: boolean }

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(mockRequest).not.toHaveBeenCalled()
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
