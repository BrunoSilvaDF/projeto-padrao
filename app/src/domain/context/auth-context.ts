import { createContext, useContext } from 'react'
import { User, LoginUserDto } from '../types'

export interface IAuthContext {
  user?: User
  login: (values: LoginUserDto) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<IAuthContext>({
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
})

export const useAuth = () => useContext(AuthContext)
