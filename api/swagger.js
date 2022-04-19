const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./endpoints.js']

const doc = {
  host: 'localhost:5000',
}

swaggerAutogen(outputFile, endpointsFiles, doc)
