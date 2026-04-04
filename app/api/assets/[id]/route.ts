import { NextResponse } from 'next/server'

function getDirectusUrl(): string {
  return process.env.DIRECTUS_URL ?? 'https://cms.innovatrixinfotech.in'
}

function getDirectusStaticToken(): string {
  return process.env.DIRECTUS_STATIC_TOKEN ?? ''
}

type RouteContext = {
  params: Promise<{ id: string }>
}

function buildAssetHeaders(): HeadersInit {
  const directusToken = getDirectusStaticToken()

  if (!directusToken) {
    return {}
  }

  return {
    Authorization: `Bearer ${directusToken}`,
  }
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params

  if (!id?.trim()) {
    return NextResponse.json({ error: 'Asset ID is required' }, { status: 400 })
  }

  const incomingUrl = new URL(request.url)
  const upstreamUrl = `${getDirectusUrl()}/assets/${encodeURIComponent(id)}${incomingUrl.search}`

  const upstream = await fetch(upstreamUrl, {
    method: 'GET',
    headers: buildAssetHeaders(),
    cache: 'force-cache',
  })

  if (!upstream.ok) {
    return NextResponse.json(
      { error: 'Unable to fetch asset from Directus' },
      { status: upstream.status },
    )
  }

  const headers = new Headers()

  const contentType = upstream.headers.get('content-type')
  const cacheControl = upstream.headers.get('cache-control')
  const contentLength = upstream.headers.get('content-length')

  if (contentType) headers.set('content-type', contentType)
  if (cacheControl) headers.set('cache-control', cacheControl)
  if (contentLength) headers.set('content-length', contentLength)

  return new NextResponse(upstream.body, {
    status: 200,
    headers,
  })
}
