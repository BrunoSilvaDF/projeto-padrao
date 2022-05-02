import { createContext, useContext } from 'react'
import { api } from '../data/api'
import { CreatePostDto, Post } from '../types/post'
import { User } from '../types/user'

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await api.get<Post[]>('/posts')
  return data
}

const createPost = async (values: CreatePostDto, user: User): Promise<void> => {
  await api.post('/posts', values, {
    headers: {
      'x-access-token': user!.accessToken,
    },
  })
}

interface IPostsContext {
  fetchPosts: () => Promise<Post[]>
  createPost: (values: CreatePostDto, user: User) => Promise<void>
}

const PostsContext = createContext<IPostsContext>({
  fetchPosts: () => Promise.resolve([]),
  createPost: () => Promise.resolve(),
})

export const PostsContextProvider: Component = ({ children }) => {
  return (
    <PostsContext.Provider
      value={{
        fetchPosts,
        createPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext)
