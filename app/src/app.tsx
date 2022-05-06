import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './router'
import theme from './components/theme'
import { Layout } from './components/layout'
import { AuthContextProvider } from './context/auth-context'
import { ApiProvider } from './context/api-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <AuthContextProvider>
          <ApiProvider>
            <BrowserRouter>
              <Layout>
                <Router />
              </Layout>
            </BrowserRouter>
          </ApiProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
