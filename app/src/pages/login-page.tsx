import React from 'react'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import { Formik, Form } from 'formik'

import { InputField } from '../components/input-field'
import { api } from '../data/api'
import { useAuth } from '../context/auth-context'

type LoginPageProps = {}

export const LoginPage: Component<LoginPageProps> = () => {
  const { setUser } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const login = async (values: any) => {
    try {
      const { data } = await api.post('/login', values)
      const tokenData = jwt(data.accessToken)
      setUser({
        name: (tokenData as any).username,
        accessToken: data.accessToken,
      })
      navigate('/')
    } catch (error) {
      toast({
        position: 'top',
        title: 'Error',
        description: 'Something went wrong on login',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Flex h='100%' minH='80vh' alignContent='center' alignItems='center'>
      <Box mx='auto' w='100%' maxW='20rem'>
        <Box p='10' borderRadius='lg' bg='gray.500'>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={login}
          >
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
