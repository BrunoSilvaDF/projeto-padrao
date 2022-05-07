import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Router } from './presentation/router'
import { theme } from './presentation/components/layout'
import { ApiProvider } from './context/api-context'
import { AuthContextProvider } from './context/auth-context'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <AuthContextProvider>
          <ApiProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ApiProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
