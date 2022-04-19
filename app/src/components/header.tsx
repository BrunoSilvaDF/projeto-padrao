import React, { useContext } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Flex, Link, Icon, useToast } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'

import { UserContext } from '../context/user-context'
import { api } from '../data/api'
import { HeaderBar } from './header-bar'

export const Header: Component = () => {
  const { userData, setUserData } = useContext(UserContext)
  const navigate = useNavigate()
  const toast = useToast()

  const logout = async () => {
    await api.get('/logout', {
      headers: {
        'x-access-token': userData!.accessToken,
      },
    })
    setUserData(undefined)
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
        {userData ? (
          <>
            <Box>Hi {userData.name}!</Box>
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
