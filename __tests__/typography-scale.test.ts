import { readFileSync } from 'fs'
import { join } from 'path'

describe('global typography scale', () => {
  it('increases the base font size on laptop and desktop viewports', () => {
    const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')

    expect(css).toContain('@media (min-width: 1024px)')
    expect(css).toContain('font-size: 18px')
    expect(css).toContain('@media (min-width: 1536px)')
    expect(css).toContain('font-size: 19px')
  })
})
