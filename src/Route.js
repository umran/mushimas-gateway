const graphqlHTTP = require('express-graphql')
const { buildGraphql } = require('mushimas')
const createResolver = require('./createResolver')

class Route {
  constructor() {
    this._routes = {}
  }

  _buildRoute(bucketId, collectionMapping, schemas) {
    const { graphqlSchema, backend } = buildGraphql(
      schemas,
      createResolver({ bucketId, collectionMapping, schemas }),
      false
    )

    return graphqlHTTP({
      schema: graphqlSchema,
      graphiql: true
    })
  }

  set(bucketId, collectionMapping, schemas) {
    let route = this._buildRoute(bucketId, colelctionMapping, schemas)

    this._routes = {
      ...this._routes,
      [bucket.id]: route
    }
  }

  get(bucketId) {
    return this._routes[bucketId]
  }

}

module.exports = Route