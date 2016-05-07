'use strict'

let db_host = 'ec2-54-228-219-2.eu-west-1.compute.amazonaws.com'
let db_user = 'ixoffqgydmoaqu'
let db_password = '47P01rIDSSJo1W6BmZe9c_UZFM'
let db_name = 'd25e1jaeqc1d62'

const DATABASE_URL = `postgres://${db_user}:${db_password}@${db_host}:5432/${db_name}?ssl=true`

module.exports = {
  client: 'postgresql',
  connection: DATABASE_URL,
  pool: {
    min: 1,
    max: 7
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}