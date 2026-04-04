/** @jest-environment node */

import { GET } from '@/app/api/assets/[id]/route'

function buildRequest(url: string): Request {
  return new Request(url, { method: 'GET' })
}

describe('GET /api/assets/[id]', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    delete process.env.DIRECTUS_STATIC_TOKEN
    delete process.env.DIRECTUS_URL
  })

  it('returns 400 when asset id is missing', async () => {
    const response = await GET(buildRequest('http://localhost/api/assets/'), {
      params: Promise.resolve({ id: '' }),
    })
    const data = (await response.json()) as { error?: string }

    expect(response.status).toBe(400)
    expect(data.error).toBe('Asset ID is required')
  })

  it('forwards non-ok upstream responses', async () => {
    const fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(new Response('not-found', { status: 404 }))

    const response = await GET(buildRequest('http://localhost/api/assets/file-1'), {
      params: Promise.resolve({ id: 'file-1' }),
    })
    const data = (await response.json()) as { error?: string }

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(404)
    expect(data.error).toBe('Unable to fetch asset from Directus')
  })

  it('streams upstream asset and forwards selected headers', async () => {
    process.env.DIRECTUS_STATIC_TOKEN = 'secret-token'
    process.env.DIRECTUS_URL = 'https://cms.example.com'

    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response('file-body', {
        status: 200,
        headers: {
          'content-type': 'image/png',
          'cache-control': 'public, max-age=120',
          'content-length': '9',
        },
      }),
    )

    const response = await GET(
      buildRequest('http://localhost/api/assets/file-1?download=1'),
      { params: Promise.resolve({ id: 'file 1' }) },
    )

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://cms.example.com/assets/file%201?download=1',
      expect.objectContaining({
        method: 'GET',
        cache: 'force-cache',
        headers: { Authorization: 'Bearer secret-token' },
      }),
    )
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('image/png')
    expect(response.headers.get('cache-control')).toBe('public, max-age=120')
    expect(response.headers.get('content-length')).toBe('9')
    expect(await response.text()).toBe('file-body')
  })
})
