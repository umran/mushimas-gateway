module.exports = {
  port: process.env.PORT || 3016,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017,localhost:27018,localhost:27019/mushimas?replicaSet=rs',
  elasticUrl: process.env.ELASTIC_URL || 'https://qd0otql8jb:5u1r5528b6@ahmed-umrans-first-7042353740.us-west-2.bonsaisearch.net'
}