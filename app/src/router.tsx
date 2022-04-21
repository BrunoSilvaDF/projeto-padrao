import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { LoginPage } from './pages/login-page'
import { PostPage } from './pages/post-page'
import { PostsPage } from './pages/posts-page'

interface RouterProps {
  user?: any
  setUser: (user: any) => void
}

export const Router: Component<RouterProps> = ({ user, setUser }) => {
  return (
    <Routes>
      <Route path='/' element={<PostsPage user={user} />} />
      <Route path='/login' element={<LoginPage setUser={setUser} />} />
      <Route path='/post' element={<PostPage user={user} />} />
    </Routes>
  )
}
