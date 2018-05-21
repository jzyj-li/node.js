/*
*
* 爬虫
* */

const cheerio = require('cheerio');
const https = require('https');


const options = {
    hostname: 'www.jianshu.com',
    path: '/',
    method: 'GET',
    headers: {
        'User-Agent' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
    }
}

request()


function request() {
    let req = https.request(options, (res) => {
        "use strict";
        const {statusCode} = res;
        let body = '';

        if (statusCode === 200) {
            res.on('data', (chunk) => {
                body += chunk;
            })
            res.on('end', (data) => {
                renderData(body)
            })
        }
    })

    req.end()
}

// 必要信息
function renderData(html, fn) {
    let $ = cheerio.load(html);
    let dom = $('#collection-recommended');
    dom.find('a').each( (item, v) => {
        v.children[0].data
    })

}


