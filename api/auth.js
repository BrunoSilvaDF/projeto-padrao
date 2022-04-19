const jwt = require('jsonwebtoken')
const { user } = require('./data')

let loggedUser = null

function createToken(user) {
  const userObj = {
    username: user.username,
    name: user.name,
    loggedIn: new Date(),
  }

  return jwt.sign(userObj, process.env.JWT_SECRET)
}

function login({ username, password }) {
  if (username !== user.username || password !== user.password) {
    return null
  }

  console.log('user logged in', new Date())

  const accessToken = createToken(user)

  loggedUser = {
    ...user,
    accessToken,
  }

  return accessToken
}

function logout() {
  loggedUser = null
}

function isAuth(req, res, next) {
  try {
    const token = req.headers['x-access-token']
    jwt.verify(token, process.env.JWT_SECRET)

    if (!loggedUser) throw new Error()
    if (loggedUser.accessToken !== token) throw new Error()

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json('you have not logged in')
  }
}

module.exports = {
  login,
  logout,
  isAuth,
}
