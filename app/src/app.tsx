import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Router } from './router'
import { Layout, theme } from './components/layout'
import { AuthContextProvider, ApiProvider } from './context'

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
