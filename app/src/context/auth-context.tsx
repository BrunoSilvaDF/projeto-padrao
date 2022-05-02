import { createContext, useContext, useState } from 'react'
import { User } from '../types/user'

const AuthContext = createContext<{
  user?: User
  setUser: (user: User | undefined) => void
}>({ setUser: () => {} })

export const AuthContextProvider: Component = ({ children }) => {
  const [user, setUser] = useState<User | undefined>()

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
