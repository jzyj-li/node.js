/*
*
* 分发所有请求
* */
const fs = require('fs');
const jade = require('jade');

let Until = {
    init (url, req) {
        "use strict";
        this.url = url;
        this.req = req;
        return this.getRes(url);

    },
    getRes(url) {
        "use strict";
        url = url.toString();
        if (url.includes('.html') || (!url.includes('.') && !url.includes('/api/'))) { // 页面
            return this.renderHtml();
        } else if (url.includes('/api/')) { // api
            return this.renderApi();
        } else if (url.includes('.')){
            return this.renderRrsource(); // 静态资源
        }
    },
    substrUrl(url) {
        "use strict";
        let return_str = '';
        if (url == '/') {
            return_str = '/';
        } else {
            return_str = url.substr(1)
        }

        return return_str;
    },
    renderHtml () {
        "use strict";
        let url = this.url;
        if (this.substrUrl(url) == '/' || this.substrUrl(url) == 'login') {
            return this.renderFile('login', 0)
        }
    },
    renderRrsource () {
        "use strict";
        let url = this.url;
        if (url.includes('ico')) return Promise.resolve(null);

        return this.renderFile(url, 1)

    },

    // 接口
    renderApi () {
        console.log(this.url)
        console.log(this.req)
    },
    // 检测文件是否存在 存在则返回文件
    renderFile (filename, num){
        "use strict";
        let path_arr = [global.VIEW + filename + '.jade', global.BASE_DIR + filename]
        return new Promise((reslove, reject) => {
            let path = path_arr[num], type;
            fs.access(path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    if (num == 0) {
                        reslove({type: 'text/html', response: jade.renderFile(path)})
                    } else {
                        fs.readFile(path, (err, data)=> {
                            if (err) {
                                reject(err)
                            } else {
                                if (path.includes('.css')) {
                                    type = 'text/css'
                                } else if (path.includes('.js')) {
                                    type = 'application/x-javascript'
                                }
                                reslove({type: type, response: data})
                            }
                        })
                    }

                }
            })
        })
    },
    renderErr (err) { // 错误处理
        "use strict";
        console.log(err)
    }

}

module.exports = Until;