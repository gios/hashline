'use strict'

const crypto = require('crypto')
const tracer = require('tracer').colorConsole()

exports.cryptoPassword = function(password) {
  const cipher = crypto.createCipher('aes-256-cbc', 'salt')
  cipher.update(password)
  try {
    return cipher.final('hex')
  } catch (error) {
    tracer.error(error)
    return
  }
}

exports.encryptoPassword = function(hash) {
  const decipher = crypto.createDecipher('aes-256-cbc', 'salt')
  decipher.update(hash, 'hex')
  try {
    return decipher.final('utf8')
  } catch (error) {
    tracer.error(error)
    return
  }
}
