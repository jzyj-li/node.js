/*
*
* app
* */
const http = require('http');
const start = require('./cookie.js');

console.log(start)

http.createServer((req, res) => {
    "use strict";
    global.sessionLib = lib.session.start(res, req)
}).listen(2000)




