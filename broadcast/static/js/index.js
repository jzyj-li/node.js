/*
*
* 首页
* */


var socket = io.connect('http://localhost:2000');


var app = new Vue({
    el: '#chat',
    data: {
        userList: '',
        activeIndex: 0,
        content: 'hello, 骚年',
        newsList: []
    },
    created: function () {
        /*
        * 发送已登录信息
        * */
        socket.emit('add user', sessionStorage.getItem('account'))

        /*
        * 获取所有已经注册的联系人
        * */
        socket.on('all user', (data) => {
            app.userList = data;
            app.newsList = new Array(data.length);
        })

        /*
        * 新消息到来
        * */
        socket.on('new message', (data) => {
            let send = data.send;


        })
    },
    methods: {
        currentUser (index) {
           this.activeIndex = index;
        },
        sendMes () {
            let accept = this.userList[this.activeIndex];
            let send = sessionStorage.getItem('account');
            let con = this.content;
            alert('正在发送消息')
            socket.emit('new message', {send, accept, con})

        }
    }
})




