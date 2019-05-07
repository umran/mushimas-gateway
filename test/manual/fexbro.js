module.exports = {
  a: {
    class: 'collection',
    fields: {
      name: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true,
        enabled: true
      },
      pointers: {
        type: 'array',
        required: false,
        item: {
          type: 'reference',
          ref: 'c',
          required: false,
          es_indexed: true,
          enabled: true
        }
      },
      beeper: {
        type: 'reference',
        ref: 'b',
        required: false,
        es_indexed: true,
        enabled: true
      },
      ceeper: {
        type: 'reference',
        ref: 'c',
        required: true,
        es_indexed: true,
        enabled: true
      },
      registered: {
        type: 'date',
        required: true,
        es_indexed: true,
        enabled: true
      }
    }
  },

  b: {
    class: 'collection',
    fields: {
      name: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true,
        enabled: true
      },
      pointer: {
        type: 'reference',
        ref: 'c',
        required: true,
        es_indexed: true,
        enabled: true
      }
    }
  },

  c: {
    class: 'embedded',
    fields: {
      name: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true,
        enabled: true
      },
      alias: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true,
        enabled: true
      }
    }
  }
}