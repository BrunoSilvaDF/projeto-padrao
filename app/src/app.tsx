import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './router'
import theme from './components/theme'
import { Layout } from './components/layout'
import { AuthContextProvider } from './context/auth-context'
import { PostsContextProvider } from './context/posts-context'

export const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthContextProvider>
        <PostsContextProvider>
          <BrowserRouter>
            <Layout>
              <Router />
            </Layout>
          </BrowserRouter>
        </PostsContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}
