const { Configuration } = require('mushimas-models')
const { asyncForEach } = require('./utils')

class Configuration {
  async forEachEnabled(lambda) {
    const configurations = await this._getAllEnabledConfigurations()

    configurations.forEach(configuration => {
      lambda(configuration)
    })
  }

  async _getAllEnabledConfigurations() {
    const configurations = await Configuration.find({ '@state': 'ENABLED' }, { _id: 1, '@configuration': 1, '@bucketId': 1 }).lean()

    return configurations.map(configuration => {
      return {
        bucketId: configuration['@bucketId'],
        collectionMapping: JSON.parse(configuration['@configuration'].collectionMapping),
        schemas: JSON.parse(configuration['@configuration'].schemas)
      }
    })
  }
}

module.exports = Configuration