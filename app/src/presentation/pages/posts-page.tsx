import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { PostBox } from '../components'
import { Wrapper } from '../components/layout/wrapper'
import { useApi } from '../../context/api-context'
import { useAuth } from '../../context/auth-context'

export const PostsPage: React.FC = () => {
  const { user } = useAuth()
  const { fetchPosts } = useApi().PostApi

  const { data: posts, isLoading, isError, error } = useQuery('posts', fetchPosts)

  return (
    <Wrapper>
      <Flex px={10} justify='space-between' alignItems='center'>
        <Heading size='md'>Posts</Heading>
        {user && (
          <Button as={Link} to='/post' data-testid='btn-new-post'>
            new Post
          </Button>
        )}
      </Flex>
      {isLoading && (
        <Box p={10} data-testid='loading'>
          Loading...
        </Box>
      )}
      {posts?.map(post => (
        <PostBox key={post.id} post={post} />
      ))}
      {posts?.length === 0 && (
        <Box mt={10} p={10} data-testid='empty'>
          So empty...
        </Box>
      )}
      {isError && (
        <Box mt={10} p={10} data-testid='error'>
          Error! {(error as Error).message}
        </Box>
      )}
    </Wrapper>
  )
}
