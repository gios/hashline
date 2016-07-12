module.exports = function(type, word) {
  'use strict'

  const crypto = require('crypto')
  const tracer = require('tracer').colorConsole()

  let cryptoPassword = function(password) {
    const cipher = crypto.createCipher(type, word)
    cipher.update(password)
    try {
      return cipher.final('hex')
    } catch (error) {
      tracer.error(error)
      return
    }
  }

  let encryptoPassword = function(hash) {
    const decipher = crypto.createDecipher(type, word)
    decipher.update(hash, 'hex')
    try {
      return decipher.final('utf8')
    } catch (error) {
      tracer.error(error)
      return
    }
  }

  return {
    cryptoPassword,
    encryptoPassword
  }
}

