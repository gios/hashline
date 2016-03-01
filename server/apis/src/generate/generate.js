'use strict';

const logger = require('tracer').colorConsole()
const Promise = require('bluebird')

logger.trace('START DATABASE GENERATION...')
Promise.all([
  require('./userGenerate.js').init(),
  require('./discussionGenerate.js').initTypes(),
  require('./discussionGenerate.js').initTags(),
  require('./discussionGenerate.js').initDiscussions()
])
.then(() => logger.trace('DATABASE HAS BEEN GENERATED'))
.then(() => process.exit())
.catch((error) => logger.error(error))
