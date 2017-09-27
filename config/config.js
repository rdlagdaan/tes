// Asynchronous
const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

module.exports = {
    secret: crypto, // Cryto-created secret
    db: 'dbtriune', // Database name
    dbhost: 'localhost', //DB Host name
    dbuser: 'root' //DB User name
    
}