/*
*
* 文件读取
*  外部资源添加版本号
* */

const fs = require('fs');

// 删除文件
// fs.unlink('index.html', (err)=> {
//     if(err) throw err;
//     console.log('删除成功')
// })

// 新增文件



// 写入文件
// fs.writeFile('tow.html', 'i am html', (err)=> {
//     if(err) throw err;
//     console.log('已写入')
// })

/*
*
* 读取文件 匹配外部链接将其替换为有版本号的文件
* */

// 不指定编码 读取到的是buffer
function readFile (file_name) {
    fs.readFile(file_name,'utf8' ,(err, data) => {
        addVersion(data, file_name)
    })
}

//  添加版本号
function addVersion(str, file_name) {
    let reg = /<script[^>]*>(.|\n)*?(?=<\/script>)<\/script>/gi;
    let content = str;
    console.log(str)
    str = str.replace(reg, function (word) {
        let src = word.replace( /src=[\'\"]?([^\'\"]*)[\'\"]?/i, function (s) {
            let path = s.slice(s.indexOf('\"')+1, s.lastIndexOf('\"'));

            return 'src=\"'+ path +'?v='+ new Date().getTime() + '\"'
        });
       return src
    })

    writeContent(str, file_name)
}

// 替换文件内容
function writeContent(con, file_name) {
    fs.writeFile(file_name, con, (err) => {
        if (err) throw err;
        console.log('替换完成')
    })
}


// 打开文件夹读取所有的文件
fs.readdir('html', (err, files)=> {
    files.forEach((v)=> {
        if (v.endsWith('.html')) {
            readFile('html/' + v)
        }
    })
});
