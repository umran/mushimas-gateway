const mongoose = require('mongoose')
const { mongoUrl } = require('../../config')

exports.init = () => {
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('useNewUrlParser', true)

  mongoose.connection.on('connecting', () => {
    console.log('mongodb connecting')
  })
  mongoose.connection.on('connected', () => {
    console.log('mongodb connected')
  })
  mongoose.connection.on('disconnected', () => {
    console.log('mongodb disconnected')
  })
  mongoose.connection.on('reconnected', () => {
    console.log('mongodb reconnected')
  })
  mongoose.connection.on('error', err => {
    console.log('mongodb error')
    console.error(err)

    setTimeout(() => {
      process.exit(1)
    }, 5000)
  })

  mongoose.connect(mongoUrl)
}

exports.disconnect = () => {
  mongoose.disconnect()
}