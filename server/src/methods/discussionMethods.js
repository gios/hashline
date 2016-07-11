'use strict'

const crypto = require('crypto')

exports.cryptoPassword = function(password) {
  const cipher = crypto.createCipher('aes192', 'salt')
  cipher.update(password)
  return cipher.final('hex')
}

exports.encryptoPassword = function(hash) {
  const decipher = crypto.createDecipher('aes192', 'salt')
  decipher.update(hash, 'hex')
  return decipher.final('utf8')
}
