import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home page', () => {
  it('renders project title', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', { name: 'Himanshi-baid' })
    ).toBeInTheDocument()
  })
})
