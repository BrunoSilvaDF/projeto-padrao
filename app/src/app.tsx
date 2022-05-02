import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './router'
import theme from './components/theme'
import { Layout } from './components/layout'
import { Providers } from './context/providers'

export const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Providers>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </Providers>
    </ChakraProvider>
  )
}
