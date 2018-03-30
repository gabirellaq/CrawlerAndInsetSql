const cheerio = require('cheerio');
const basePath = 'http://lanyrd.com';
const common = require('./common');
const c = common.common;

class Getdata {
    constructor() { }

    //获取 从topicid获取speaker的 profile
    getBookData(data) {
        let $ = cheerio.load(data.toString());
        let bookJson = [];
        let obj = $('.gl-item');
        if(obj.length > 0){
            obj.each(function() {
                let book_data = {},
                    _this = $(this);
                book_data.name = _this.find('.p-name em').text();
                book_data.img =  _this.find('.p-img img').attr('src') || _this.find('.p-img img').attr('data-lazy-img');
                book_data.price = _this.find('.p-price i').text();
                bookJson.push(book_data);
            })
        }
        return bookJson;
    }

}
var getdata = new Getdata();
exports.getdata = getdata;