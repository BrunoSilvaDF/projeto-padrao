import React from 'react'
import { Box } from '@chakra-ui/react'

interface WrapperProps {
  variant?: 'small' | 'regular'
}

export const Wrapper: Component<WrapperProps> = ({ children, variant = 'regular' }) => {
  return (
    <Box mx='auto' w='100%' maxW={variant === 'regular' ? '50rem' : '20rem'}>
      {children}
    </Box>
  )
}
