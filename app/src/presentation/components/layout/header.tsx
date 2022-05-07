import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Flex, Link, Icon, useToast } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'
import { useMutation, useQueryClient } from 'react-query'

import { HeaderBar } from './header-bar'
import { useAuth } from '../../../context/auth-context'

type HeaderProps = {}

export const Header: Component<HeaderProps> = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const toast = useToast({
    position: 'top',
    isClosable: true,
    description: 'You logged out',
    status: 'info',
  })
  const queryClient = useQueryClient()

  const { mutate: onLogout } = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries()
      toast()
      navigate('/')
    },
  })

  return (
    <HeaderBar>
      <Flex alignItems='center' gap={2}>
        {user ? (
          <>
            <Box>Hi {user.name}!</Box>
            <Icon as={FaUserCircle} />
            <Box>
              <Link onClick={() => onLogout()}>logout</Link>
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
