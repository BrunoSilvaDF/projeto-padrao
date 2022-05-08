import { useObservableState } from 'observable-hooks'

import { user$ } from '../data/user-store'
import { IAuthApi } from '../domain/interfaces'
import { LoginUserDto } from '../domain/types'
import { AuthApi } from '../data'
import { AuthContext } from '../domain/context/auth-context'

type AuthContextContainerProps = {
  authApi: IAuthApi
}

const AuthContextContainer: Component<AuthContextContainerProps> = ({ children, authApi }) => {
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

export const AuthContextProvider: Component = ({ children }) => (
  <AuthContextContainer authApi={new AuthApi()}>{children}</AuthContextContainer>
)
