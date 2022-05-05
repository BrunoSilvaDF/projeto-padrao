import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './router'
import theme from './components/theme'
import { Layout } from './components/layout'
import { AuthContextProvider } from './context/auth-context'
import { ApiProvider } from './context/api-context'

export const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthContextProvider>
        <ApiProvider>
          <BrowserRouter>
            <Layout>
              <Router />
            </Layout>
          </BrowserRouter>
        </ApiProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}
