import { Post, User } from '../types'

export const mockPosts = (): Post[] => [
  {
    id: 1,
    title: 'any_title',
    content: 'any_content',
    createdAt: new Date(),
  },
]

export const mockUser = (): User => ({ name: 'any_name', accessToken: 'any_token' })
