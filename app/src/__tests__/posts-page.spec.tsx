import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { waitForElementToBeRemoved } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { render, MockAuthContext, MockApiContext, mockPosts, mockUser } from '../__test-utils__'
import { User, Post } from '../domain/types'
import { PostsPage } from '../presentation/pages'
import { QueryClient, QueryClientProvider } from 'react-query'

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
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              // turns retries off
              retry: false,
            },
          },
        })
      }
    >
      <MockAuthContext user={user}>
        <MockApiContext PostApi={{ fetchPosts, createPost: jest.fn() }}>
          <Router location={history.location} navigator={history}>
            <PostsPage />
          </Router>
        </MockApiContext>
      </MockAuthContext>
    </QueryClientProvider>
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

  it('Should render loading message if posts are not fetched', async () => {
    const { getByTestId } = makeSut()
    expect(getByTestId('loading')).toBeInTheDocument()
  })

  it('Should render empty message on empty Posts', async () => {
    const fetchPosts = jest.fn().mockResolvedValue([])
    const { getByTestId, queryByTestId } = makeSut({ fetchPosts })

    await waitForElementToBeRemoved(() => queryByTestId('loading'))

    expect(getByTestId('empty')).toBeInTheDocument()
  })

  it('Should render erro message', async () => {
    const fetchPosts = jest.fn().mockRejectedValue(new Error('error'))
    const { getByTestId, queryByTestId } = makeSut({ fetchPosts })

    await waitForElementToBeRemoved(() => queryByTestId('loading'))

    const err = getByTestId('error')
    expect(err).toBeInTheDocument()
    expect(err).toHaveTextContent('Error! error')
  })

  it('Should render Posts', async () => {
    const { getByText, queryByTestId } = makeSut()

    await waitForElementToBeRemoved(() => queryByTestId('loading'))

    expect(getByText(mockPosts()[0].title)).toBeInTheDocument()
  })
})
