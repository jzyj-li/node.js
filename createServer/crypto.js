/*
* 加密实现
*
* */
const crypto = require('crypto');

var hash = crypto.createHash('md5'); // 设置加密方式sha1, md5, sha256, sha512

hash.update(new Buffer('huangdanhua', 'binary'));

var encode = hash.digest('hex');// hex 十六进制 binary 二进制默认为binary

console.log(encode)

// HMAC 是秘银相关的哈希运算消息认证码，以一个秘银和消息作为输入，生成一个消息作为输出
// crypto.createHmac('算法名', '密钥') 算法和createHash支持的算法一样，密钥是任意的字符串
var hmac  = crypto.createHmac('md5', 'hello');
hmac.update(new Buffer('huangdanhua', 'binary')); // 输入加密的数据
var encode1 = hmac.digest('hex')
console.log(encode1)

// Cipher Decipher
var cipher = crypto.createCipher('aes-256-cbc', 'hello'); // 第一个参数是算法，第二个为私要
var decipher = crypto.createDecipher('aes-256-cbc', 'hello'); // 解密对象 参数同上

cipher.update('123', 'utf8', 'hex');
var encycipher = cipher.final('hex'); // 输出加密后的结果
decipher.update(encycipher, 'hex', 'utf8'); // 解密
var decrpyte = decipher.final('utf8'); // 解密结果

console.log(encycipher, decrpyte)




