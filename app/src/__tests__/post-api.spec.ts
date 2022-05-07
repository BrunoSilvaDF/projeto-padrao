import MockAdapter from 'axios-mock-adapter'

import api from '../data/api'
import { PostApi } from '../data'
import { mockPosts } from '../__test-utils__/mock-types'

const mock = new MockAdapter(api)

describe('PostApi', () => {
  describe('fetchPosts', () => {
    it('Should return error on Api Error', async () => {
      const postApi = new PostApi()
      mock.onGet('/posts').replyOnce(500, 'Api Error')

      const promise = postApi.fetchPosts()
      await expect(promise).rejects.toThrow('Api Error')
    })

    it('Should return empty array', async () => {
      const postApi = new PostApi()
      mock.onGet('/posts').replyOnce(204, [])

      const result = await postApi.fetchPosts()
      expect(result).toEqual([])
    })

    it('Should return posts on success', async () => {
      const postApi = new PostApi()
      const posts = mockPosts()
      mock.onGet('/posts').replyOnce(200, posts)

      const result = await postApi.fetchPosts()
      expect(result.length).toEqual(posts.length)
      expect(result[0]).toEqual(posts[0])
    })
  })

  describe('createPost', () => {
    it('Should return error on Api Error', async () => {
      const postApi = new PostApi()
      mock.onPost('/posts').replyOnce(500, 'Api Error')

      const promise = postApi.createPost({ content: 'any_content', title: 'any_title' })
      await expect(promise).rejects.toThrow('Api Error')
    })

    it('Should not throw on success', async () => {
      const postApi = new PostApi()
      mock.onPost('/posts').replyOnce(201)

      const promise = postApi.createPost({ content: 'any_content', title: 'any_title' })
      await expect(promise).resolves.toBeUndefined()
    })
  })
})
