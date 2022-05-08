import { fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react'

import { AuthContext } from '../domain/context/auth-context'
import { LoginUserDto } from '../domain/types'
import { AuthContextProvider } from '../providers'

const makeSut = (userData?: LoginUserDto) => {
  const login = jest.fn()
  const logout = jest.fn()
  const renderResult = render(
    <AuthContextProvider
      authApi={{
        login,
        logout,
      }}
    >
      <AuthContext.Consumer>
        {value => (
          <div>
            {value.user ? <div data-testid='logged-in' /> : <div data-testid='not-logged-in' />}
            <button data-testid='login' onClick={() => userData && value.login(userData)}>
              login
            </button>
            <button data-testid='logout' onClick={() => value.logout()}>
              logout
            </button>
          </div>
        )}
      </AuthContext.Consumer>
    </AuthContextProvider>
  )

  return {
    ...renderResult,
    login,
    logout,
  }
}

describe('AuthContextProvider', () => {
  it('Should present undefined user', () => {
    const { getByTestId } = makeSut()
    expect(getByTestId('not-logged-in')).toBeInTheDocument()
  })

  it('Should login and logout', async () => {
    const { getByTestId, login, logout } = makeSut({ username: 'user', password: 'password' })

    login.mockResolvedValueOnce({ user: 'user', accessToken: 'token' })
    logout.mockResolvedValueOnce({})

    fireEvent.click(getByTestId('login'))

    await waitForElementToBeRemoved(() => getByTestId('not-logged-in'))

    expect(login).toHaveBeenCalled()
    expect(login).toHaveBeenCalledWith({ username: 'user', password: 'password' })
    expect(getByTestId('logged-in')).toBeInTheDocument()

    fireEvent.click(getByTestId('logout'))

    await waitForElementToBeRemoved(() => getByTestId('logged-in'))

    expect(logout).toHaveBeenCalled()
    expect(getByTestId('not-logged-in')).toBeInTheDocument()
  })
})
