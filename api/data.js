class Post {
  constructor(title, content) {
    this.id = new Date().getTime()
    this.title = title
    this.content = content
    this.createdAt = new Date()
  }
}

const posts = []

const user = {
  username: process.env.API_USERNAME ? process.env.API_USERNAME : 'admin',
  name: process.env.API_NAME ? process.env.API_NAME : 'Admin',
  password: process.env.API_PASSWORD ? process.env.API_PASSWORD : 'admin',
}

module.exports = {
  posts,
  Post,
  user,
}
