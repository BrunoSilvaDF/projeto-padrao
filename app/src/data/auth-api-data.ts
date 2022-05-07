import { AxiosError } from 'axios'
import jwt from 'jwt-decode'

import { LoginUserDto, User } from '../domain/types'
import api from './api'

export class AuthApi {
  async login(values: LoginUserDto): Promise<User> {
    try {
      const { data } = await api.post<User>('/login', values)
      const tokenData = jwt(data.accessToken)
      return {
        name: (tokenData as any).username,
        accessToken: data.accessToken,
      }
    } catch (error) {
      const axiosError = error as AxiosError
      throw new Error(axiosError.response?.data)
    }
  }

  async logout(): Promise<void> {
    try {
      await api.get('/logout')
    } catch (error) {
      const axiosError = error as AxiosError
      throw new Error(axiosError.response?.data)
    }
  }
}
