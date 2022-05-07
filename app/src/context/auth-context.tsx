import { createContext, useContext } from 'react'
import { useObservableState } from 'observable-hooks'

import { AuthApi } from '../data/auth-api-data'
import { user$ } from '../data/user-store'
import { IAuthContext } from '../domain/interfaces'
import { LoginUserDto } from '../domain/types'

export const AuthContext = createContext<IAuthContext>({
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
})

const authApi = new AuthApi()

export const AuthContextProvider: Component = ({ children }) => {
  const user = useObservableState(user$, undefined)

  const login = async (values: LoginUserDto) => {
    const user = await authApi.login(values)
    user$.next(user)
  }

  const logout = async () => {
    await authApi.logout()
    user$.next(undefined)
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
