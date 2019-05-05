const { Bucket, Collection } = require('mushimas-models')
const { asyncForEach } = require('./utils')

class Buckets {
  async forEachActive(lambda) {
    let buckets = await this._getAllActiveBuckets()

    await asyncForEach(buckets, async (bucket, index) => {
      let {collections, schemas} = await this._getConfig(bucket._id)

      // debugging
      console.log(index)

      lambda({
        bucket: {
          id: bucket._id.toString(),
          name: bucket['@bucket'].name
        },
        collections,
        schemas
      })
    })
  }

  async _getAllActiveBuckets() {
    return await Bucket.find({ '@state': 'ACTIVE' }, { _id: 1, '@bucket': 1 }).lean()
  }

  async _getAllEnabledCollections(bucketId) {
    return await Collection.find({ '@state': 'ENABLED', '@bucketId': bucketId }, { _id: 1, '@collection': 1 }).lean()
  }

  async _getConfig(bucketId) {
    let collections = await this._getAllEnabledCollections(bucketId)

    let namesToIds = {}
    let schemas = {}

    collections.forEach(collection => {
      namesToIds[collection['@collection'].name] = collection._id.toString()
      schemas[collection['@collection'].name] = JSON.parse(collection['@collection'].definition)
    })

    return {
      collections: namesToIds,
      schemas
    }
  }
}

module.exports = Buckets