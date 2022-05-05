import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ApiContext } from '../context/api-context'
import { AuthContext } from '../context/auth-context'
import { PostsPage } from '../pages/posts-page'
import { render } from '../test-utils'
import { User } from '../types/user'
import { Post } from '../../../api/data'
import { waitForElementToBeRemoved } from '@testing-library/react'

type SutParams = {
  user?: User
  fetchPosts?: () => Promise<Post[]>
}

const mockPosts = [
  {
    id: 1,
    title: 'any_title',
    content: 'any_content',
    createdAt: new Date(),
  },
]

const makeSut = ({ user, fetchPosts = jest.fn().mockResolvedValue(mockPosts) }: SutParams = {}) => {
  const history = createMemoryHistory()
  history.push('/')
  const renderReturn = render(
    <AuthContext.Provider value={{ login: jest.fn(), logout: jest.fn(), user }}>
      <ApiContext.Provider
        value={{
          PostApi: {
            createPost: jest.fn(),
            fetchPosts,
          },
        }}
      >
        <Router location={history.location} navigator={history}>
          <PostsPage />
        </Router>
      </ApiContext.Provider>
    </AuthContext.Provider>
  )
  return {
    user: userEvent.setup(),
    history,
    ...renderReturn,
  }
}

describe('<PostsPage />', () => {
  it('Should render and not crash', () => {
    const { container } = makeSut()
    expect(container).toBeInTheDocument()
  })

  it('Should not render new post button if not logged in', () => {
    const { queryByTestId } = makeSut()
    const btn = queryByTestId('btn-new-post')
    expect(btn).not.toBeInTheDocument()
  })

  it('Should render new post button if logged in', () => {
    const { queryByTestId } = makeSut({ user: { name: 'any_name', accessToken: 'any_token' } })
    const btn = queryByTestId('btn-new-post')
    expect(btn).toBeInTheDocument()
  })

  it('Should redirect to /post on button click', async () => {
    const { getByTestId, user, history } = makeSut({
      user: { name: 'any_name', accessToken: 'any_token' },
    })
    const btn = getByTestId('btn-new-post')
    await user.click(btn)
    expect(history.location.pathname).toBe('/post')
  })

  it('Should render empty message on empty Posts', async () => {
    const fetchPosts = jest.fn().mockResolvedValue([])
    const { getByText } = makeSut({ fetchPosts })
    expect(getByText('So empty...')).toBeInTheDocument()
  })

  it('Should render Posts', async () => {
    const { getByText, queryByTestId } = makeSut()

    await waitForElementToBeRemoved(() => queryByTestId('loading'))

    expect(getByText(mockPosts[0].title)).toBeInTheDocument()
  })
})
