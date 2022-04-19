import { createContext } from 'react'

interface UserData {
  name: string
  accessToken: string
}

interface IUserContext {
  userData?: UserData
  setUserData: (userData?: UserData) => void
}

export const UserContext = createContext<IUserContext>({
  setUserData: () => {},
})
