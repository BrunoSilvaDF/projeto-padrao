import { api } from '../data/api'
import { CreatePostDto, Post } from '../types/post'

// const createPost = async (values: CreatePostDto): Promise<void> => {
//   await api.post('/posts', values)
// }

// const fetchPosts = async (): Promise<Post[]> => {
//   const { data } = await api.get<Post[]>('/posts')
//   return data
// }

export interface IPostAPi {
  createPost: (values: CreatePostDto) => Promise<void>
  fetchPosts: () => Promise<Post[]>
}

export class PostApi {
  public static async createPost(values: CreatePostDto): Promise<void> {
    await api.post('/posts', values)
  }

  public static async fetchPosts(): Promise<Post[]> {
    const { data } = await api.get<Post[]>('/posts')
    return data
  }
}
