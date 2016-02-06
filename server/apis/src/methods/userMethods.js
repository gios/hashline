'use strict';

const crypto = require('crypto')

exports.cryptoPassword = function(password) {
  const cipher = crypto.createCipher('aes-256-cbc', 'salt')
  cipher.update(password)
  return cipher.final('hex')
}

exports.encryptoPassword = function(hash) {
  const decipher = crypto.createDecipher('aes-256-cbc', 'salt')
  decipher.update(hash, 'hex')
  return decipher.final('utf8')
}
