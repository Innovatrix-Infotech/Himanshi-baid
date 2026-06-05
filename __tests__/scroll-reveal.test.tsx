import { render } from '@testing-library/react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const observe = jest.fn()
const unobserve = jest.fn()
const disconnect = jest.fn()
let observerOptions: IntersectionObserverInit | undefined

class MockIntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(
    _callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    observerOptions = options
  }

  observe = observe
  unobserve = unobserve
  disconnect = disconnect
  takeRecords = () => []
}

describe('ScrollReveal', () => {
  beforeEach(() => {
    observe.mockClear()
    unobserve.mockClear()
    disconnect.mockClear()
    observerOptions = undefined
    window.matchMedia = jest.fn().mockReturnValue({ matches: false })
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: MockIntersectionObserver,
    })
  })

  it('uses a positive bottom root margin so reveals trigger as content approaches the viewport', () => {
    render(
      <ScrollReveal>
        <p>Reveal me</p>
      </ScrollReveal>,
    )

    expect(observerOptions).toMatchObject({
      rootMargin: '0px 0px 20% 0px',
      threshold: 0,
    })
  })
})
