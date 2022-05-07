import { AxiosError } from 'axios'
import api from '../data/api'
import { IPostApi } from '../domain/interfaces'
import { CreatePostDto, Post } from '../domain/types'

export class PostApi implements IPostApi {
  async createPost(values: CreatePostDto): Promise<void> {
    try {
      await api.post('/posts', values)
    } catch (error) {
      const axiosError = error as AxiosError
      throw new Error(axiosError.response?.data)
    }
  }

  async fetchPosts(): Promise<Post[]> {
    try {
      const { data } = await api.get<Post[]>('/posts')
      return data
    } catch (error) {
      const axiosError = error as AxiosError
      throw new Error(axiosError.response?.data)
    }
  }
}
