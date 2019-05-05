const { find } = require('mushimas-io').database
const { validateOptions } = require('mushimas').validator

module.exports = async ({ environment, args, schemas }) => {
  const { collection } = environment

  validateOptions(args, collection.name, schemas)
  return await find({ environment, args })
}