import { PostApi } from '../data'
import { ApiContext } from '../domain/context/api-context'

export const ApiProvider: Component = ({ children }) => (
  <ApiContext.Provider value={{ PostApi: new PostApi() }}>{children}</ApiContext.Provider>
)
