// this is where the main express app lives
const express = require('express')
const Route = require('./src/Route')
const Configuration = require('./src/Configuration')
const mongodb = require('./src/connections/mongodb')
const { port } = require('./config')

const app = express()
const route = new Route()
const configuration = new Configuration()

// define the bucket endpoint
app.use('/bucket/:bucket', async (req, res, next) => {
  const { bucket } = req.params
  let route = route.get(bucket)

  if (route) {
    await route(req, res, next)
  } else {
    res.status(404).json({
      status: 404,
      message: 'bucket not found'
    })
  }
})

// initialize the database connection
mongodb.init()

// create routes for all active buckets
configuration.forEachEnabled(({bucketId, collectionMapping, configuration}) => {
  route.set(bucketId, collectionMapping, configuration)
}).then(() => {
  app.listen(port)
}).catch(err => {
  console.error(err)
})