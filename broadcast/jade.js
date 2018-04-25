/*
* jade
* */
const jade = require('jade');

let options = {
    filename: '', // 在异常中可用
    doctype: '', // 指定 doctype
    pretty: '' , // 简单地说就是加换行
    self: '', // 使用单独的命名空间
    debug: '', // 输出编译后的函数体
    compileDebug: '', // 编译调试
    cache: '', // 缓存编译函数
    compiler: '', // 覆盖默认编译器
    parser: '', // 覆盖默认解析器
    globals: '', // 加全局变量，可以在模板中直接使用
}

var fn = jade.compile('h1 33')

console.log(fn()) // <h1>33</h1>

fn = jade.compileFile('test.jade')

console.log(fn()) // <h1>gg</h1>

fn = jade.compileClient('h4 44')
console.log(fn)

// function template(locals) {
//     var buf = [];
//     var jade_mixins = {};
//     var jade_interp;
//
//     buf.push("<h4>44</h4>");;return buf.join("");
// }

fn = jade.compileFileClient('test.jade')
console.log(fn)
//
// function template(locals) {
//     var buf = [];
//     var jade_mixins = {};
//     var jade_interp;
//
//     buf.push("<h1>gg</h1>");;return buf.join("");
// }

fn = jade.renderFile('test.jade')
console.log(fn) // <h1>gg</h1>
