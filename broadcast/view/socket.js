/*
*
* socket.io
*
* */

let io = require('socket.io').listen(80)

io.sockets.on('connection', (socket)=>{
    socket.emit('news', {hello: 'world'}); // 发送消息函数
    socket.on('my other event', (data) => { // 接受消息函数
       console.log(data)
    })

})