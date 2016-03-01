const path = require('path')
const DBName = path.join(__dirname, 'base.db')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: DBName
    }
  }
}