import { createContext, useContext, useState } from 'react'
import jwt from 'jwt-decode'

import api from '../data/api'
import { LoginUserDto, User } from '../domain/types'

interface IAuthContext {
  user?: User
  login: (values: LoginUserDto) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<IAuthContext>({
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
})

export const AuthContextProvider: Component = ({ children }) => {
  const [user, setUser] = useState<User | undefined>()

  const login = async (values: LoginUserDto) => {
    const { data } = await api.post<User>('/login', values)
    const tokenData = jwt(data.accessToken)
    setUser({
      name: (tokenData as any).username,
      accessToken: data.accessToken,
    })
    api.interceptors.request.use(req => {
      req.headers!['x-access-token'] = data.accessToken
      return req
    })
  }

  const logout = async () => {
    await api.get('/logout', {
      headers: {
        'x-access-token': user!.accessToken,
      },
    })
    setUser(undefined)
    api.interceptors.request.eject(0)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
