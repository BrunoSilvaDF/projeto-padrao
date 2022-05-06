import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Box, Button, Heading, useToast } from '@chakra-ui/react'

import { InputField } from '../components/input-field'
import { Wrapper } from '../components/wrapper'
import { CreatePostDto } from '../types/post'
import { useApi } from '../context/api-context'
import { useMutation, useQueryClient } from 'react-query'

type PostPageProps = {}

export const PostPage: Component<PostPageProps> = () => {
  const { createPost } = useApi().PostApi
  const toast = useToast({ position: 'top', isClosable: true })
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: onSubmit } = useMutation(createPost, {
    onSuccess: () => {
      toast({
        description: 'Post created!!',
        status: 'success',
      })
      queryClient.invalidateQueries('posts')
      navigate('/')
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
      })
    },
  })

  const initialValues: CreatePostDto = {
    title: '',
    content: '',
  }

  return (
    <Wrapper>
      <Heading px='10' mb='4' size='md'>
        Create a new Post
      </Heading>
      <Box p='10' borderRadius='lg' bg='gray.100'>
        <Formik initialValues={initialValues} onSubmit={values => onSubmit(values)}>
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
