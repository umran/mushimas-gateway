const { findOne } = require('mushimas-io').database

module.exports = async ({ environment, args }) => {
  return await findOne({ environment, args })
}