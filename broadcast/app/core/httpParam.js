/*
*
* 获取请求参数
* */

const qs = require('querystring');

let obj = {type: 'application/json'};

class HttpParam{
    getParam(req) {
        let ret;
        ret = req.method == 'POST'? this.getPostParam(req): this.getGetParam(req);
        return ret;
    }

    // 获取post请求参数
    getPostParam(req){

        let body = '';

        return new Promise((reslove, reject) => {
            try {
                req.on('data', (data) => {
                    body += data;
                });

                req.on('end', () => {
                    obj.response = qs.parse(body);
                    reslove(obj);
                })
            } catch (err) {
                reject(err)
            }

        })
    }

    // 获取get请求参数
    getGetParam () {

    }
}

module.exports = new HttpParam();