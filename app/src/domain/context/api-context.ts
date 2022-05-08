import { createContext, useContext } from 'react'
import { PostApi } from '../../data'
import { IPostApi } from '../interfaces'

export const ApiContext = createContext<{ PostApi: IPostApi }>({
  PostApi: new PostApi(),
})

export const useApi = () => useContext(ApiContext)
