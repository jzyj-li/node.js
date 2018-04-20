/*
*
* 获取请求参数
* */

const qs = require('querystring');

let obj = {type: 'application/json', response: };

class HttpParam{
    getParam(req) {
        console.log(21)
        console.log(req.method)
        console.log(req.body)

        // req.method == 'POST'? this.getPostParam(req): this.getGetParam(req);
    }

    // 获取post请求参数
    getPostParam(req){

        let body = '';

        return new Promise((reslove, reject) => {
            req.on('data', (data) => {
                body += data;
            });

            req.on('end', () => {
                obj.response = parse(body);
                reslove(obj)
            })
        })
    }

    // 获取get请求参数
    getGetParam () {

    }
}

module.exports = new HttpParam();