const fs = require('fs');

/*
*
* @des 操作文件
* */
const ProcessFile = {

    /*
    * @des 文件是否存在，不存在创建文件
    * @param path 文件路径
    * @return 文件内容和文件标记
    * */
    isExist (path) {
        return new Promise((reslove, reject) => {
            fs.access(path, 'w', (err) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        throw err
                    }
                    reslove({data: data, fd: path}) // 文件内容和文件标志
                })
            })
        })

    },

    writeFile (fd, content) {
        console.log(content)
        return new Promise((reslove, reject) => {
            fs.writeFile(fd, content, (err, bs, buff) => {
                if (err) {
                    reject(err)
                }
                reslove(buff)
            })
        })
    }
}

module.exports = ProcessFile;

