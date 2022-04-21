import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Box, Button, Heading, useToast } from '@chakra-ui/react'

import { InputField } from '../components/input-field'
import { Wrapper } from '../components/wrapper'
import { api } from '../data/api'

type PostPageProps = {
  user?: any
}

export const PostPage: Component<PostPageProps> = ({ user }) => {
  const toast = useToast()

  const navigate = useNavigate()

  const createPost = async (values: any) => {
    try {
      await api.post('/posts', values, {
        headers: {
          'x-access-token': user.accessToken,
        },
      })
      toast({
        position: 'top',
        description: 'Post created!!',
        status: 'success',
        isClosable: true,
      })
      navigate('/')
    } catch (error) {
      toast({
        position: 'top',
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Wrapper>
      <Heading px='10' mb='4' size='md'>
        Create a new Post
      </Heading>
      <Box p='10' borderRadius='lg' bg='gray.100'>
        <Formik
          initialValues={{
            title: '',
            content: '',
          }}
          onSubmit={createPost}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name='title' label='Title' />
              <Box mt={4} />
              <InputField name='content' label='Content' textarea />
              <Box mt={4} />
              <Box textAlign='right'>
                <Button
                  type='submit'
                  isLoading={isSubmitting}
                  variant='solid'
                  colorScheme='facebook'
                >
                  post
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  )
}
