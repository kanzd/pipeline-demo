import { render, screen } from '@testing-library/react'

import Welcome from './Welcome'

describe('<Welcome/>', () => {
  it('renders logo', () => {
    render(<Welcome />)
    expect(screen.getByTitle('Praxis logo')).toBeInTheDocument()
  })

  it('renders all card links', () => {
    render(<Welcome />)
    let header = screen.getAllByRole('heading', {
      level: 3,
    })
    expect(header[0]).toHaveTextContent('Join #praxis-community')
    expect(
      screen.getByRole('link', { name: /Join #praxis-community/ }),
    ).toHaveAttribute('href', 'http://go/praxis-community')

    expect(header[1]).toHaveTextContent('Explore our documentation')
    expect(
      screen.getByRole('link', { name: /Explore our documentation/ }),
    ).toHaveAttribute('href', 'https://praxis.prod.target.com')

    expect(header[2]).toHaveTextContent('Review Praxis technologies')
    expect(
      screen.getByRole('link', { name: /Review Praxis technologies/ }),
    ).toHaveAttribute(
      'href',
      'https://praxis.prod.target.com/get-help/training-resources',
    )

    expect(header[3]).toHaveTextContent('Style your content')
    expect(
      screen.getByRole('link', { name: /Style your content/ }),
    ).toHaveAttribute(
      'href',
      'https://praxis.prod.target.com/getting-started/styling',
    )
  })
})
