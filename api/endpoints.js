const { isAuth, login, logout } = require('./auth')
const { posts, Post } = require('./data')

module.exports = function (app) {
  app.get('/', (_, res) => {
    // #swagger.summary = 'Hello World test code'

    res.json('hello world!')
  })

  app.post('/login', (req, res) => {
    // #swagger.summary = 'login'

    const { username, password } = req.body

    const accessToken = login({ username, password })
    if (accessToken) {
      res.json({
        accessToken,
      })
    } else {
      res.status(400).json('wrong username/password')
    }
  })

  app.get('/logout', isAuth, (_, res) => {
    // #swagger.summary = 'logout'

    logout()
    res.json('you logged out')
  })

  app.get('/posts', (_, res) => {
    // #swagger.summary = 'get all posts'

    return res.json(posts)
  })

  app.post('/posts', isAuth, (req, res) => {
    // #swagger.summary = 'create an post'

    const { title, content } = req.body
    const post = new Post(title, content)
    posts.push(post)
    console.log('Post created', post)
    res.status(201)
    res.json('post saved')
  })
}
