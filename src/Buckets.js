const { Bucket, Definition } = require('mushimas-models')
const { asyncForEach } = require('./utils')

class Buckets {
  async forEachActive(lambda) {
    let buckets = await this._getAllActiveBuckets()

    await asyncForEach(buckets, async (bucket, index) => {
      let {collections, schemas} = await this._getConfig(bucket._id)

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

  async _getAllEnabledDefinitions(bucketId) {
    return await Definition.find({ '@state': 'ENABLED', '@bucketId': bucketId }, { _id: 1, '@definition': 1 }).lean()
  }

  _parseDefinition(definition) {
    const _class = definition.class
    const fields = definition.fields

    const parsedFields = fields.reduce((parsed, field) => {
      parsed[field.name] = field.options

      return parsed
    }, {})

    return {
      class: _class,
      fields: {
        ...parsedFields
      }
    }
  }

  async _getConfig(bucketId) {
    let definitions = await this._getAllEnabledDefinitions(bucketId)

    let namesToIds = {}
    let schemas = {}

    definitions.forEach(definition => {
      let schema = this._parseDefinition(definition['@definition'])
      schemas[definition['@definition'].name] = schema

      if (schema.class === 'collection') {
        namesToIds[definition['@definition'].name] = definition._id
      }
    })

    return {
      collections: namesToIds,
      schemas
    }
  }
}

module.exports = Buckets