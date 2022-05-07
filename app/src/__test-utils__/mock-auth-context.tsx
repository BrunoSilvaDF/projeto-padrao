import React from 'react'
import { AuthContext } from '../context/auth-context'
import { User, LoginUserDto } from '../domain/types'

type MockAuthContextProps = {
  user?: User
  login?: (values: LoginUserDto) => Promise<void>
  logout?: () => Promise<void>
}

export const MockAuthContext: Component<MockAuthContextProps> = ({
  children,
  user,
  login = jest.fn(),
  logout = jest.fn(),
}) => <AuthContext.Provider value={{ login, logout, user }}>{children}</AuthContext.Provider>
