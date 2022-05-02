import React from 'react'
import { AuthContextProvider } from './auth-context'
import { PostsContextProvider } from './posts-context'

export const Providers: Component = ({ children }) => {
  return (
    <AuthContextProvider>
      <PostsContextProvider>{children}</PostsContextProvider>
    </AuthContextProvider>
  )
}
