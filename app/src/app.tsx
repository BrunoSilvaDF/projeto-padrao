import React, { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { Router } from './router'
import theme from './components/theme'
import { Layout } from './components/layout'

type User = {
  name: string
  accessToken: string
}

export const App = () => {
  const [user, setUser] = useState<User | undefined>()

  return (
    <ChakraProvider theme={theme} resetCSS>
      <BrowserRouter>
        <Layout user={user} setUser={setUser}>
          <Router user={user} setUser={setUser} />
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  )
}
