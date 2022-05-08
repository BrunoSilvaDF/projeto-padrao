import { useObservableState } from 'observable-hooks'

import { user$ } from '../data/user-store'
import { IAuthApi } from '../domain/interfaces'
import { LoginUserDto } from '../domain/types'
import { AuthContext } from '../domain/context/auth-context'

type AuthContextProviderProps = {
  authApi: IAuthApi
}

export const AuthContextProvider: Component<AuthContextProviderProps> = ({ children, authApi }) => {
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
