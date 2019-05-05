const { search } = require('mushimas-io').search
const { validateOptions } = require('mushimas').validator

module.exports = client => 
  async ({ environment, args, schemas }) => {
    const { collection } = environment

    validateOptions(args, collection.name, schemas)
    return await search({ environment, args, client })
  }