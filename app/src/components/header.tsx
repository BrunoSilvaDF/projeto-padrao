import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Flex, Link, Icon, useToast } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'

import { api } from '../data/api'
import { HeaderBar } from './header-bar'
import { useAuth } from '../context/auth-context'
import { User } from '../types/user'

type HeaderProps = {}

const logout = async (user: User): Promise<void> => {
  await api.get('/logout', {
    headers: {
      'x-access-token': user!.accessToken,
    },
  })
}

export const Header: Component<HeaderProps> = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const toast = useToast({ position: 'top', isClosable: true })

  const onLogout = async () => {
    logout(user!)
    setUser(undefined)
    toast({
      description: 'You logged out',
      status: 'info',
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
              <Link onClick={onLogout}>logout</Link>
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
