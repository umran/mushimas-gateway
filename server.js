// this is where the main express app lives
const express = require('express')
const Routes = require('./src/Routes')
const Buckets = require('./src/Buckets')
const mongodb = require('./src/connections/mongodb')
const { port } = require('./config')

const app = express()
const routes = new Routes()
const buckets = new Buckets()

// define the bucket endpoint
app.use('/bucket/:bucket', async (req, res, next) => {
  const { bucket } = req.params
  let route = routes.get(bucket)

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
buckets.forEachActive(({bucket, collections, schemas}) => {
  routes.set(bucket, collections, schemas)
}).then(() => {
  app.listen(port)
}).catch(err => {
  console.error(err)
})