export type Post = {
  id: number
  title: string
  content: string
  createdAt: Date
}

export type CreatePostDto = {
  title: string
  content: string
}
