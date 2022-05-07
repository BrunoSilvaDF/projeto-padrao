import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

type PostBoxProps = {
  post: any
}

export const PostBox: Component<PostBoxProps> = ({ post }) => {
  return (
    <Box mt={10} p={10} borderRadius='lg' bg='gray.50' shadow='lg' data-testid='post-box'>
      <Heading>{post.title}</Heading>
      <Text>{post.content}</Text>
      <Box pos='relative' top={30} textAlign='right'>
        <Text as='i' color='gray.400'>
          Created at {new Date(post.createdAt).toLocaleString()}
        </Text>
      </Box>
    </Box>
  )
}
