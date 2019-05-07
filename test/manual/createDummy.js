const { Bucket, Definition } = require('mushimas-models')
const mongodb = require('../../src/connections/mongodb')
const { asyncForEach } = require('../../src/utils')
const serializeDefinition = require('./serializeDefinition')

const fexbro = require('./fexbro')

mongodb.init()

let range = []
for (let i=0; i<1; i++) {
  range.push(i)
}

const populate = async () => {
  await asyncForEach(range, async i => {
    const organizationId = `ECO1998`
    const bucketName = `BCK${i.toString()}`

    const ts = new Date()

    let bucket = await Bucket.create({ '@state': 'ACTIVE', '@lastModified': ts, '@lastCommitted': ts, '@version': 0, '@organizationId': organizationId, '@bucket': { name: bucketName } })

    let a = await Definition.create({ '@state': 'ENABLED', '@lastModified': ts, '@lastCommitted': ts, '@version': 0, '@bucketId': bucket._id, '@definition': serializeDefinition('a', fexbro.a) })

    let b = await Definition.create({ '@state': 'ENABLED', '@lastModified': ts, '@lastCommitted': ts, '@version': 0, '@bucketId': bucket._id, '@definition': serializeDefinition('b', fexbro.b) })

    let c = await Definition.create({ '@state': 'ENABLED', '@lastModified': ts, '@lastCommitted': ts, '@version': 0, '@bucketId': bucket._id, '@definition': serializeDefinition('c', fexbro.c) })

    console.log('index', i)
    console.log('bucket', bucket._id)
    console.log('bucket_a', a._id)
    console.log('bucket_b', b._id)
    console.log('bucket_c', c._id)
  })

  console.log('done')
}

populate()