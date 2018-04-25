/*
*
* 加密解密
* */
const crypto = require('crypto');

const Crypto = {
    encrypt (key, str, alg = 'aes-256-cbc') {
        let cipher = crypto.createCipher(alg, key);
        cipher.update(str, 'utf8', 'hex');

        return cipher.final('hex');
    },
    decrypt (key, str, alg = 'aes-256-cbc') {
        let decipher = crypto.createDecipher(alg, key);

        decipher.update(str, 'hex', 'utf8');
        return decipher.final('utf8');
    }
}

module.exports = Crypto;