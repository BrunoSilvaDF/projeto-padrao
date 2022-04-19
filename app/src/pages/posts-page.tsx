import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'

import { UserContext } from '../context/user-context'
import { PostBox } from '../components/post-box'
import { api } from '../data/api'
import { Wrapper } from '../components/wrapper'

interface PostsPageProps {}

export const PostsPage: React.FC<PostsPageProps> = () => {
  const [posts, setPosts] = useState<any[]>([])
  const { userData } = useContext(UserContext)

  const fetchPosts = async () => {
    const { data } = await api.get('/posts')
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts().then()
  }, [])

  return (
    <Wrapper>
      <Flex px={10} justify='space-between' alignItems='center'>
        <Heading size='md'>Posts</Heading>
        {userData && (
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
