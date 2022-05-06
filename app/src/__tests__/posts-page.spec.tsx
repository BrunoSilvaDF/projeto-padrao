import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { waitForElementToBeRemoved } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { render, MockAuthContext, MockApiContext, mockPosts, mockUser } from '../__test-utils__'
import { User, Post } from '../types'
import { PostsPage } from '../pages/posts-page'

type SutParams = {
  user?: User
  fetchPosts?: () => Promise<Post[]>
}

const makeSut = ({
  user,
  fetchPosts = jest.fn().mockResolvedValue(mockPosts()),
}: SutParams = {}) => {
  const history = createMemoryHistory()
  history.push('/')
  const renderReturn = render(
    <MockAuthContext user={user}>
      <MockApiContext PostApi={{ fetchPosts, createPost: jest.fn() }}>
        <Router location={history.location} navigator={history}>
          <PostsPage />
        </Router>
      </MockApiContext>
    </MockAuthContext>
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
    const { queryByTestId } = makeSut({ user: mockUser() })
    const btn = queryByTestId('btn-new-post')
    expect(btn).toBeInTheDocument()
  })

  it('Should redirect to /post on button click', async () => {
    const { getByTestId, user, history } = makeSut({
      user: mockUser(),
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

    expect(getByText(mockPosts()[0].title)).toBeInTheDocument()
  })
})
