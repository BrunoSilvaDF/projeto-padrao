import { LoginUserDto, User } from '../types'

export type IAuthApi = {
  login: (user: LoginUserDto) => Promise<User>
  logout: () => Promise<void>
}
