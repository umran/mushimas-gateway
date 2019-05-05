const graphqlHTTP = require('express-graphql')
const { buildGraphql } = require('mushimas')
const createResolver = require('./createResolver')

class Routes {
  constructor() {
    this._routes = {}
  }

  _buildRoute(bucket, collections, schemas) {
    const { graphqlSchema, backend } = buildGraphql(
      schemas,
      createResolver({ bucket, collections, schemas }),
      false
    )

    return graphqlHTTP({
      schema: graphqlSchema,
      graphiql: true
    })
  }

  set(bucket, collections, schemas) {
    let route = this._buildRoute(bucket, collections, schemas)

    this._routes = {
      ...this._routes,
      [bucket.id]: route
    }
  }

  get(bucketId) {
    return this._routes[bucketId]
  }

}

module.exports = Routes