import React from 'react'

import { ApiContext } from '../context/api-context'
import { IPostApi } from '../domain/interfaces'

type MockApiContextProps = {
  PostApi?: IPostApi
}

const mockPostApi = (): IPostApi => ({
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
