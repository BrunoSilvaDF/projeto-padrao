import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'

import { PostBox } from '../components/post-box'
import { Wrapper } from '../components/wrapper'
import { useAuth } from '../context/auth-context'
import { usePosts } from '../context/posts-context'

type PostsPageProps = {}

export const PostsPage: React.FC<PostsPageProps> = () => {
  const { user } = useAuth()
  const { fetchPosts } = usePosts()
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetchPosts().then(setPosts)
  }, [fetchPosts])

  return (
    <Wrapper>
      <Flex px={10} justify='space-between' alignItems='center'>
        <Heading size='md'>Posts</Heading>
        {user && (
          <Button as={Link} to='/post'>
            new Post
          </Button>
        )}
      </Flex>
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
