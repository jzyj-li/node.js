/*
*
*cookie 和 session
* */

/*cookie 和 session 都是基于web服务器的，不同的是cookie存储在客户端，Session存储在服务器。
当用户浏览网站时，web服务器会在浏览器上存储一些当前用户的相关信息，在本地Web客户端存储的就是cookie数据。服务器会根据cookie
给浏览器特殊的数据返回。
总之， cookie机制采用的是在客户端保持状态的方案，而session机制采用的是在服务端保存状态的方案。
cookie的内容主要包括：名字，值，过期时间， 路径， 域。路径和域一起构成Cookie的作用范围。若不设置过期时间，浏览器关闭之后便会消失
这种cookie为会话cookie。会话cookie不存在硬盘上，直接存在内存里，设置过期时间cookie才会存在硬盘上。*/

// seesion机制是一种服务期端的机制，服务器使用一种散列表的结构来保存信息。当程序需要为某个客户端请求创建一个session时，
// 服务器首先检查客户端的请求里是否包含了一个session的标识，已经有了就查询，没有就创建。
// 标识会在响应中返回到客户端保存在cookie里。
// session 模块实现
var start = function (res, req) {
    var conn = {res: res, req: req};
    var cookies = {};

    if (typeof conn.req.headers.cookie != 'undefined') {
        conn.req.headers.cookie.split(';').forEach((cookie) => {
            "use strict";
            let parts = cookie.split('=');
            cookies[parts[0].trim()] = (parts[1] || '').trim();
        })
    } else {
        cookies.SESSID = 0;
    }
    var SESSID = cookies.SESSID;
    if (typeof sessions[SESSID] != 'undefined') { // 存在
        session = sessions[SESSID];
        if (session.expires < Date()) {
            delete sessions[SESSID];
            return newSession(conn.res)
        } else {
            var dt = new Date();
            dt.setMinutes(dt.getMinutes() + 30);
            session.expires = dt;
            return sessions[SESSID];
        }
    } else {
        return newSession(conn.res);
    }
}
function newSession(res) {
    var chars = '0123456789ABCDEFGHJKLHKJLYIUVUIqwertyuioplkjhsbsinkcnbj';
    var SESSID = '';
    for (var i = 0;i<40;i++) {
        var num = Math.floor(Math.random() * chars.length);
        SESSID += chars.substring(num, num+1)
    }

    if (typeof sessions[SESSID] !== 'undefined') {
        return newSession(res);
    }

    var dt = new Date();
    dt.setMinutes(dt.getMinutes() + 30);
    var session = {
        SESSID: SESSID,
        expires: dt
    }

    sessions[SESSID] = session;
    res.setHeader('Set-Cookie', 'SESSID=' + SESSID);
    return session;
}

function cleanSessions() {
    for (sess in sessions) {
        if (sess.expires < Date()) {
            delete sessions[sess.SESSID]
        }
    }
}

exports.start = start;