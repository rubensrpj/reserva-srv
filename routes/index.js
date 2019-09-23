const produto = require('./produto')

module.exports = app => {
  app.use('/produto', produto)
}