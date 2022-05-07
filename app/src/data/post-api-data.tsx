import api from '../data/api'
import { IPostApi } from '../domain/interfaces'
import { CreatePostDto, Post } from '../domain/types'

export class PostApi implements IPostApi {
  async createPost(values: CreatePostDto): Promise<void> {
    await api.post('/posts', values)
  }

  async fetchPosts(): Promise<Post[]> {
    const { data } = await api.get<Post[]>('/posts')
    return data
  }
}
