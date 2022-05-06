import React from 'react'
import { ApiContext } from '../context'
import { IPostAPi } from '../data'

type MockApiContextProps = {
  PostApi?: IPostAPi
}

const mockPostApi = (): IPostAPi => ({
  createPost: jest.fn(),
  fetchPosts: jest.fn(),
})

export const MockApiContext: Component<MockApiContextProps> = ({
  children,
  PostApi = mockPostApi(),
}) => (
  <ApiContext.Provider
    value={{
      PostApi,
    }}
  >
    {children}
  </ApiContext.Provider>
)
