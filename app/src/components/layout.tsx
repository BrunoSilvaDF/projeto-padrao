import React from 'react'
import { Flex, Box, Center, Text } from '@chakra-ui/react'
import { Header } from './header'

const Content: Component = ({ children }) => (
  <Box my={10} mx={10}>
    {children}
  </Box>
)

const Footer: React.FC = () => (
  <Flex bg='gray.600' mt='auto' h={8} justify='center'>
    <Center>
      <Text fontSize='sm' color='gray.100'>
        &copy; This is a regular blog.
      </Text>
    </Center>
  </Flex>
)

export const Layout: Component = ({ children }) => {
  return (
    <Flex flexDir='column' w='100vw' maxW='100%' minH='100vh'>
      <Header />
      <Content children={children} />
      <Footer />
    </Flex>
  )
}
