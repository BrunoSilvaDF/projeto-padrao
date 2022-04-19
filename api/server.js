const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const endpoints = require('./endpoints')
const swaggerFile = require('./swagger_output.json')

const app = express()

const port = process.env.PORT ? process.env.PORT : 5000

process.env.JWT_SECRET = 'jslfalejflasjeflajself'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: '*',
  })
)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

endpoints(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
