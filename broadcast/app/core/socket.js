/*
*
* socket
* */
const io = require('socket.io').listen(global.PORT);

class Socket {
    init () {
        io.sockets.on('connection', (socket) => {

            // 新消息
            socket.on('new message ', (data) => {

                socket.broadcast.emit('new message', {
                    userName: socket.userName,
                    message: data
                })

            })

            // 新增联系人
            socket.on('add user', (username) => {

                socket.userName = username;

                socket.emit('login', {userName})

                socket.broadcast.emit(' user joined ', {
                    userName: socket.userName
                })

            })



        })
    }

}
