import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { LoginPage, PostPage, PostsPage } from './pages'

export const Router: Component = () => {
  return (
    <Routes>
      <Route path='/' element={<PostsPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/post' element={<PostPage />} />
    </Routes>
  )
}
