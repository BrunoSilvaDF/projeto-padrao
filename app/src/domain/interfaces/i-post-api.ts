import { CreatePostDto, Post } from '../types'

export interface IPostApi {
  createPost: (values: CreatePostDto) => Promise<void>
  fetchPosts: () => Promise<Post[]>
}
