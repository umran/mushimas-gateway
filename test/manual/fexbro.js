module.exports = {
  a: {
    class: 'collection',
    fields: {
      name: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      },
      pointers: {
        type: 'array',
        required: false,
        item: {
          type: 'reference',
          ref: 'c',
          required: false,
          es_indexed: true
        }
      },
      beeper: {
        type: 'reference',
        ref: 'b',
        required: false,
        es_indexed: true
      },
      ceeper: {
        type: 'reference',
        ref: 'c',
        required: true,
        es_indexed: true
      },
      registered: {
        type: 'date',
        required: true,
        es_indexed: true
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
        es_keyword: true
      },
      pointer: {
        type: 'reference',
        ref: 'c',
        required: true,
        es_indexed: true
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
        es_keyword: true
      },
      alias: {
        type: 'string',
        required: true,
        es_indexed: true,
        es_keyword: true
      }
    }
  }
}