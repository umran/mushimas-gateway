const { find, findOne, search, queueCreate, queueUpdate, queueDelete } = require('./methods')

// initialize client connections here
const elasticClient = require('./connections/elasticsearch').init()

module.exports = ({ bucket, collections, schemas }) =>
  ({ signature, elastic_projections }) =>
    async ({ method, collection, root, args, context }) => {
      
      const ackTime = new Date()
      const projection = elastic_projections[collection]
      const environment = {
        bucket,
        collection: {
          name: collection,
          id: collections[collection]
        }
      }

      // begin access control block
        // access control code goes in here
      // end access control block

      // validation happens implicitly
      switch (method) {
        case 'findOne':
          return await findOne({ environment, args })
        case 'find':
          return await find({ environment, args, schemas })
        case 'search':
          return await search(elasticClient)({ environment, args, schemas })
        case 'create':
          return await queueCreate({ environment, args, ackTime, projection })
        case 'update':
          return await queueUpdate({ environment, args, ackTime, projection })
        case 'delete':
          return await queueDelete({ environment, args, ackTime })
      }
    }