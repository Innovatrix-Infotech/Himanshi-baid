import { createDirectus, rest, staticToken } from '@directus/sdk'
import type { HBDirectusSchema } from './types'

const DEFAULT_DIRECTUS_URL = 'https://cms.innovatrixinfotech.in'
const DEFAULT_TIMEOUT_MS = 5000

export const DIRECTUS_URL = process.env.DIRECTUS_URL ?? DEFAULT_DIRECTUS_URL
const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN ?? ''

function parseTimeout(value: string | undefined): number {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_TIMEOUT_MS
  }
  return parsed
}

export const DIRECTUS_TIMEOUT_MS = parseTimeout(process.env.DIRECTUS_TIMEOUT_MS)

const directusBaseClient = createDirectus<HBDirectusSchema>(DIRECTUS_URL).with(rest())

export const directusClient = DIRECTUS_STATIC_TOKEN
  ? directusBaseClient.with(staticToken(DIRECTUS_STATIC_TOKEN))
  : directusBaseClient

export async function directusRequest<T>(operation: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Directus request timed out after ${DIRECTUS_TIMEOUT_MS}ms`))
    }, DIRECTUS_TIMEOUT_MS)

    operation()
      .then((result) => {
        clearTimeout(timeout)
        resolve(result)
      })
      .catch((error) => {
        clearTimeout(timeout)
        reject(error)
      })
  })
}

export function getAssetUrl(fileId: string | null | undefined): string | null {
  if (!fileId) return null
  if (fileId.startsWith('/') || fileId.startsWith('http://') || fileId.startsWith('https://')) {
    return fileId
  }
  return `/api/assets/${encodeURIComponent(fileId)}`
}

export function getDirectAssetUrl(fileId: string | null | undefined): string | null {
  if (!fileId) return null
  if (fileId.startsWith('/') || fileId.startsWith('http://') || fileId.startsWith('https://')) {
    return fileId
  }
  return `${DIRECTUS_URL}/assets/${encodeURIComponent(fileId)}`
}
