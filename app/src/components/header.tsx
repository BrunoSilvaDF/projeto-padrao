import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Flex, Link, Icon, useToast } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'

import { api } from '../data/api'
import { HeaderBar } from './header-bar'

type HeaderProps = {
  user: any
  setUser: (user?: any) => void
}

export const Header: Component<HeaderProps> = ({ user, setUser }) => {
  const navigate = useNavigate()
  const toast = useToast()

  const logout = async () => {
    await api.get('/logout', {
      headers: {
        'x-access-token': user.accessToken,
      },
    })
    setUser(undefined)
    toast({
      position: 'top',
      description: 'You logged out',
      status: 'info',
      isClosable: true,
    })
    navigate('/')
  }

  return (
    <HeaderBar>
      <Flex alignItems='center' gap={2}>
        {user ? (
          <>
            <Box>Hi {user.name}!</Box>
            <Icon as={FaUserCircle} />
            <Box>
              <Link onClick={logout}>logout</Link>
            </Box>
          </>
        ) : (
          <Link as={RouterLink} to='/login'>
            Login
          </Link>
        )}
      </Flex>
    </HeaderBar>
  )
}
