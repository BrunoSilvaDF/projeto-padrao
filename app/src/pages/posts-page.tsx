import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'

import { PostBox } from '../components/post-box'
import { Wrapper } from '../components/wrapper'
import { useAuth } from '../context/auth-context'
import { useApi } from '../context/api-context'

type PostsPageProps = {}

export const PostsPage: React.FC<PostsPageProps> = () => {
  const { user } = useAuth()
  const { fetchPosts } = useApi().PostApi
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchPosts()
      .then(setPosts)
      .finally(() => setIsLoading(false))
  }, [fetchPosts])

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
      {posts.map(post => (
        <PostBox key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <Box mt={10} p={10}>
          So empty...
        </Box>
      )}
    </Wrapper>
  )
}
