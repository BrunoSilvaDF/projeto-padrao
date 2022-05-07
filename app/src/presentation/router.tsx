import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout'

import { LoginPage, PostPage, PostsPage } from './pages'

export const Router: Component = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<PostsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/post' element={<PostPage />} />
      </Routes>
    </Layout>
  )
}
