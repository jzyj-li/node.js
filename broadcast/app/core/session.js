/*
*
* session 管理
* */

const Session = {
    add (data) {
        global.SESSION.concat(data)
    },
    has(userName){
        global.SESSION.find(v => {
            return v.userName == userName;
        })
    }
}

module.exports = Session;










