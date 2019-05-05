const elasticsearch = require('elasticsearch')
const { elasticUrl } = require('../../config')

exports.init = () => {
  const client = new elasticsearch.Client({
     hosts: [ elasticUrl ]
  })

  return client
}