/** @jest-environment node */

const mockRequest = jest.fn()
const mockReadItems = jest.fn((collection: string, options: Record<string, unknown>) => ({
  collection,
  options,
}))

jest.mock('next/cache', () => ({
  unstable_cache: (queryFn: () => unknown) => queryFn,
}))

jest.mock('@/lib/cms/directus-client', () => ({
  directusClient: {
    request: (...args: unknown[]) => mockRequest(...args),
  },
  directusRequest: (operation: () => unknown) => operation(),
}))

jest.mock('@directus/sdk', () => ({
  aggregate: jest.fn(),
  readItems: (...args: [string, Record<string, unknown>]) => mockReadItems(...args),
  readSingleton: jest.fn(),
}))

import { getThesis } from '@/lib/cms/queries'

describe('CMS queries', () => {
  beforeEach(() => {
    mockRequest.mockReset()
    mockReadItems.mockClear()
  })

  it('reads thesis supervision records from Directus', async () => {
    mockRequest.mockResolvedValueOnce([
      {
        id: 'thesis-1',
        sort: 1,
        student_name: 'Dr. A. Resident',
        title: 'Clinical profile and predictors of outcomes in acute abdomen',
        status: 'completed',
      },
    ])

    const thesis = await getThesis()

    expect(mockReadItems).toHaveBeenCalledWith('hb_thesis', {
      sort: ['sort'],
      limit: -1,
    })
    expect(thesis).toEqual([
      {
        id: 'thesis-1',
        sort: 1,
        student_name: 'Dr. A. Resident',
        title: 'Clinical profile and predictors of outcomes in acute abdomen',
        status: 'completed',
      },
    ])
  })
})
