/*
*
* session 管理
* */

let SESSION = [];
const Session = {
    add (userName) {
        SESSION.push({userName: userName})
    },
    has(userName){
        SESSION.find(v => {
            return v.userName == userName;
        })
    }
}

module.exports = Session;










