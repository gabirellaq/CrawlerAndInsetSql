const cheerio = require('cheerio');
const common = require('./public/common');
const getdata = require('./public/getdata');
const c = common.common;
const g = getdata.getdata;

let idx = 1,
    keyword = "图书",
    page = 1,
    bookdataArr = [];


let run = async (keyword, page) => {
    console.log(page);
    if(page > 10) {
        console.log("well done~~~");
        return false;
    }
    let options = {
        uri: 'https://search.jd.com/Search',
        qs: {
            keyword: `${keyword}`,
            enc: 'utf-8',
            page: `${page}`
        },
        headers: {
            'User-Agent': 'Request-Promise'
        }
    };
    await c.httpRequest(options).then((data) => {
        //获取图书列表
        bookdataArr = data;
    });
    let bookdata = await g.getBookData(bookdataArr);
    console.log(bookdata);
    //插入数据库
    await c.saveBookDataToDatabase(bookdata);

    page += 1;
    await run(keyword, page);
}

run(keyword, page);