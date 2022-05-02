import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { LoginPage } from './pages/login-page'
import { PostPage } from './pages/post-page'
import { PostsPage } from './pages/posts-page'

interface RouterProps {}

export const Router: Component<RouterProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<PostsPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/post' element={<PostPage />} />
    </Routes>
  )
}
