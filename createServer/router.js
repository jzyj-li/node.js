/*
*
* 静态资源管理
* */
const http = require('http');
const url = require('url');
const fs = require('fs');
const BASE_DIR = __dirname;

http.createServer((req, res) => {
    "use strict";
   let path = url.parse(req.url).pathname;
   new renderStaticResourcesPath(path, res);
}).listen(2000);

class renderStaticResourcesPath {
    constructor (pathname, res){
        this.pathname = pathname;
        this.res = res;
        this.init();
    }
    init () {
        if (this.pathname == '/index' || this.pathname == '/') {
            this.renderRes(this.isFile('/index.html'), '/index.html')
        } else {
            this.renderRes(this.isFile(this.pathname))
        }
    }

    isFile (pathname) {
        let path = BASE_DIR + '/static' + pathname;
        var page = null;
        console.log(path);
        try {
            fs.accessSync(path);
            page = fs.readFileSync(path)
        } catch (err) {
            page = null;
        }
        return page;
    }

    renderRes (isFile,  pathname = this.pathname) {
        let mmieType = null;
        let res = this.res;
        if (isFile) { // 文件存在
            pathname = pathname.substr(pathname.lastIndexOf('.') + 1); // 得到文件后缀名
            switch (pathname) {
                case 'html': mmieType = 'text/html';
                break;
                case 'css': mmieType = 'text/css';
                break;
                case 'png': mmieType = 'image/png';
                break;
                default:
                    mmieType = 'text/plain';
            }

            res.writeHeader(200, {'Content-Type': mmieType});
            res.end(isFile);
        } else { // 文件不存在
            console.log('文件不存在')
        }
    }
}


