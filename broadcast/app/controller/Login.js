/*
* @des 用户登录 Session管理 用户登录后的socket运行
* */
const ProcessFile = require('../core/ProcessFile');
const ProcessCrypto = require('../core/ProcessCrypto');
const qs = require('querystring');

const conf = require('../../conf/api');
const Session = require('../core/session')

const LOGIN_STR = 'zxltxt';

module.exports = class Login {

    /*
    * @param user_mes 用户信息
    *
    * */
    init(user_mes, req) {
        return new Promise((reslove, reject) => {

            if (!user_mes.account) {
                this.autoLogin(this.getHeadr(req, 'token')).then(res => {
                    reslove(res)
                })
            } else {
                ProcessFile.isExist(global.DATABASE + 'user.txt').then(res => {
                    res.data = res.data.toString();
                    let data = res.data?JSON.parse(res.data):[];
                    let obj = this.isExist(user_mes, data);

                    if (!obj.type) { // 新注册的账号
                        user_mes.oldDate = new Date().getTime();
                        data.push(user_mes);
                    } else { // 已经注册的账号
                        data[obj.index].oldDate = new Date().getTime();
                    }

                    ProcessFile.writeFile(res.fd, JSON.stringify(data)).then(res => {
                        conf.RESPONSE.data = {'token': this.renderLoginStr(user_mes.account + '@' + (data.length-1))};
                        reslove(conf.RESPONSE);
                    })
                })
            }

        })
    };

    // 账号是已经否存在
    isExist(user_mes, data) {
        let type = false;
        let index;

        data.forEach((v, i) => {
            if ((v.account === user_mes.account) && (v.password === user_mes.password)) {
                type = true;
                index = i;
                console.log(i)
            }
        })

        return {type, index}
    }
    ;

    /*
    *
    * 获取登录账号后生成加密字符串返回前端 以实现自动登录
    * @param index 用户id
    * */
    renderLoginStr(account) {
        let str = ProcessCrypto.encrypt(LOGIN_STR, account);
        return str;
    };

    /*
    * 解析cookie获取token
    * */
    getHeadr (req, name) {
        let str = req.headers.cookie;
        let arr = str.split(';');
        let return_str = '';

        arr.forEach((v) => {
            let every = v.split('=');
            if (every[0] == name) {
               return_str = every[1];
            }
        })

        return return_str;
    };
    autoLogin (str) {

        let account = str?ProcessCrypto.decrypt(LOGIN_STR, str): '';
        let index = account.substr(account.indexOf('@') + 1);
        account = account.substr(0, account.indexOf('@'));

        return new Promise ((reslove, reject) => {

            account&& ProcessFile.isExist(global.DATABASE + 'user.txt').then(res => {
                res.data = res.data.toString();
                let data = res.data?JSON.parse(res.data):[];
                if (data[index].account === account) {
                    data[index].oldDate = new Date().getTime();
                    ProcessFile.writeFile(res.fd, JSON.stringify(data)).then(res => {
                        conf.RESPONSE.success = true;
                        conf.RESPONSE.data = {'token': this.renderLoginStr(account + '@' + (data.length-1))};
                        reslove(conf.RESPONSE);
                    })
                } else {
                    this.accountErrorHandle(reslove);
                }
            })

            !account && this.accountErrorHandle(reslove)
        })
    };

    // 账号错误 或没有
    accountErrorHandle (reslove) {
        conf.RESPONSE.success = false;
        conf.RESPONSE.data = '没有账号请注册';
        reslove(conf.RESPONSE)
    };

    // 登录成功
    loginSuccess (userName) {
        // 用户存入session socket建立
        Session.push(userName)
        
    }


}