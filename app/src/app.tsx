import React, { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import { UserContext } from './context/user-context'
import { Router } from './router'
import { BrowserRouter } from 'react-router-dom'
import theme from './components/theme'
import { Layout } from './components/layout'

export const App = () => {
  const [userData, setUserData] = useState<any>()

  return (
    <ChakraProvider theme={theme} resetCSS>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            userData,
            setUserData,
          }}
        >
          <Layout>
            <Router />
          </Layout>
        </UserContext.Provider>
      </BrowserRouter>
    </ChakraProvider>
  )
}
