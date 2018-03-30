/*
*
* createServer
* */
const http = require('http');
const dns = require('dns');
const fs = require('fs');
const url = require('url');
const queryString = require('querystring');

http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname; // 获取当前请求资源的url路径 可以理解为api
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.writeHead(200);
    router(res, req, pathname)
}).listen(3000);

function router(res, req, pathname) {
    switch (pathname) {
        case '/parse':
            parseDns(res,req)
            break;
        default:
            getIndex(res, req)
    }
}

/*
*  @desc 定义响应html页面的函数
*  @params res http 响应对象
*  @params req http 请求对象
*
* */
function getIndex(res, req) {
    let path = __dirname + '/' + url.parse('index.html').pathname;
    let home = fs.readFileSync(path);

    res.end(home);
}

/*
* @desc 解析dns 返回ip
*
* */
function parseDns(res, req) {
    let postData = '';
    req.on('data', function (postData1) {
        postData += postData1;
    });
    
    req.on('end', function () {
        var retData = getDns(postData, function (domain, addresses) {
            console.log(domain, addresses)
        })
    })
}

function getDns(postData, callback) {
    console.log(postData)
    let domain = queryString.parse(postData).dns;
    console.log(domain)
    //console.log(domain)
    dns.resolve(domain + '', function (err, addresses) {
        if (!addresses) {
            addresses = ['不存在域名']
        }
        callback(domain, addresses)
    })
}

// dns.resolve('1111', function (err, records) {
//     console.log(records)
// })



