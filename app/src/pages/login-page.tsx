import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import { Formik, Form } from 'formik'

import { InputField } from '../components/input-field'
import { useAuth } from '../context/auth-context'
import { LoginUserDto } from '../types/user'

type LoginPageProps = {}

export const LoginPage: Component<LoginPageProps> = () => {
  const { login } = useAuth()
  const toast = useToast({ position: 'top', isClosable: true })
  const navigate = useNavigate()

  const initialValues: LoginUserDto = {
    username: '',
    password: '',
  }

  const onSubmit = async (values: LoginUserDto) => {
    try {
      await login(values)
      navigate('/')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong on login',
        status: 'error',
      })
    }
  }

  return (
    <Flex h='100%' minH='80vh' alignContent='center' alignItems='center'>
      <Box mx='auto' w='100%' maxW='20rem'>
        <Box p='10' borderRadius='lg' bg='gray.500'>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <InputField name='username' label='Login' />
                <Box mt={4} />
                <InputField name='password' label='Password' type='password' />
                <Box mt={4} />
                <Box textAlign='right'>
                  <Button type='submit' isLoading={isSubmitting} variant='solid'>
                    login
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  )
}
