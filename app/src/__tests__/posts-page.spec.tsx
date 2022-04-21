import { PostsPage } from '../pages/posts-page'
import { render } from '../test-utils'

describe('<PostsPage />', () => {
  it('Should render and not crash', () => {
    const { container } = render(<PostsPage />)
    expect(container).toBeInTheDocument()
  })

  it('Should not render new post button if not logged in', async () => {
    const { queryByRole } = render(<PostsPage />)
    const btn = queryByRole('button', { name: 'new Post' })
    expect(btn).not.toBeInTheDocument()
  })
})
