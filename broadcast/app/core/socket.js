/*
*
* socket
* */
const io = require('socket.io')(global.APP);
let currentUserList = [];
let sockedIdToUserList = {};

class Socket {
    init () {
        /*
        *
        * on 是监听消息
        * emit 发送消息
        * 客户端发送服务端监听 或者服务端监听客户端发送不能同时监听一个接口
        * */
        io.sockets.on('connection', (socket) => {
            console.log(socket.id)
            // 发送当前存在的所有用户


            // 新消息
            socket.on('new message', (data) => {
                console.log(data)
                socket.broadcast.to(sockedIdToUserList[data.accept]).emit('new message', data);
            })

            // 新增联系人
            socket.on('add user', (username) => {

                currentUserList.indexOf(username) > -1? null: currentUserList.push(username);
                io.sockets.emit('all user', currentUserList)

                !(username in sockedIdToUserList) && (sockedIdToUserList[username] = socket.id);

                console.log(sockedIdToUserList)

            })



        })
    }

}

module.exports = Socket