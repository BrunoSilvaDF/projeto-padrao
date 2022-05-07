import { User, LoginUserDto } from '../types'

export interface IAuthContext {
  user?: User
  login: (values: LoginUserDto) => Promise<void>
  logout: () => Promise<void>
}
