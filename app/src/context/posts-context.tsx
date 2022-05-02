import { createContext, useCallback, useContext } from 'react'
import { api } from '../data/api'
import { CreatePostDto, Post } from '../types/post'
import { useAuth } from './auth-context'

interface IPostsContext {
  fetchPosts: () => Promise<Post[]>
  createPost: (values: CreatePostDto) => Promise<void>
}

const PostsContext = createContext<IPostsContext>({
  fetchPosts: () => Promise.resolve([]),
  createPost: () => Promise.resolve(),
})

export const PostsContextProvider: Component = ({ children }) => {
  const { user } = useAuth()

  const createPost = useCallback(
    async (values: CreatePostDto): Promise<void> => {
      await api.post('/posts', values, {
        headers: {
          'x-access-token': user!.accessToken,
        },
      })
    },
    [user]
  )

  const fetchPosts = async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>('/posts')
    return data
  }

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
