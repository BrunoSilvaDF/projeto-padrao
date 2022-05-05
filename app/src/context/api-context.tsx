import { createContext, useContext } from 'react'
import { PostApi, IPostAPi } from '../data/posts-data'

export const ApiContext = createContext<{ PostApi: IPostAPi }>({
  PostApi,
})

export const ApiProvider: Component = ({ children }) => (
  <ApiContext.Provider value={{ PostApi }}>{children}</ApiContext.Provider>
)

export const useApi = () => useContext(ApiContext)
