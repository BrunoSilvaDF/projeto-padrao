import { createContext, useContext } from 'react'

import { PostApi } from '../data'
import { IPostApi } from '../domain/interfaces'

export const ApiContext = createContext<{ PostApi: IPostApi }>({
  PostApi: new PostApi(),
})

export const ApiProvider: Component = ({ children }) => (
  <ApiContext.Provider value={{ PostApi: new PostApi() }}>{children}</ApiContext.Provider>
)

export const useApi = () => useContext(ApiContext)
