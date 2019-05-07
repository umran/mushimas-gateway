module.exports = (name, schema) => {
  const _class = schema.class
  const fields = schema.fields
  
  console.log(_class)

  const serializedFields = Object.keys(fields).map(fieldKey => {
    return {
      name: fieldKey,
      options: fields[fieldKey]
    }
  })

  return {
    name,
    class: _class,
    fields: serializedFields
  }
}