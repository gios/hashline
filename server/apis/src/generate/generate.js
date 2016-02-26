'use strict';

const logger = require('tracer').colorConsole()
const Promise = require('bluebird')

console.log(require('./userGenerate.js').init())
Promise.all(
  require('./userGenerate.js').init(),
  require('./typeGenerate.js').init()
)
.then(() => logger.info('GENERATE END'))
.catch((error) => logger.error(error))
