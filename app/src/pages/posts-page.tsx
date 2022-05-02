import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'

import { api } from '../data/api'
import { PostBox } from '../components/post-box'
import { Wrapper } from '../components/wrapper'
import { useAuth } from '../context/auth-context'
import { Post } from '../types/post'

type PostsPageProps = {}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await api.get<Post[]>('/posts')
  return data
}

export const PostsPage: React.FC<PostsPageProps> = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetchPosts().then(setPosts)
  }, [])

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
