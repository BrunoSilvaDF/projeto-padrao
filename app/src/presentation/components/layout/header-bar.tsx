import React from 'react'
import { Flex, Heading, Spacer, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { ColorModeSwitcher } from './color-mode-switcher'

export const HeaderBar: Component = ({ children }) => (
  <Flex bg='gray.500' alignItems='center' h={12} px={4}>
    <Heading size='md'>
      <Link as={RouterLink} to='/'>
        The Blog
      </Link>
    </Heading>
    <Spacer />
    {children}
    <ColorModeSwitcher />
  </Flex>
)
