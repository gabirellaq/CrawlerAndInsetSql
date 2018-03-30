const http = require('http');
var rp = require('request-promise');
const sql = require('../mssql/sql');
const basePath = 'http://lanyrd.com';
const delay = 0;

class Common {
    constructor() {}
    //从数据库中获取entities数据
    getEntitiesSelect() {
        return new Promise((resolve, reject) => {
            sql.sqlserver.sqlEntitiesSelect()
                .then(data => {
                    sql.sqlserver.sqlClose(); //close server
                    console.log('entities select data success');
                    resolve(data.recordset)
                }).catch(err => {
                   reject('entities select data err:' + err);
                })
        })
    }

    //insert
    BookDataInsert(name,img,price) {
        return new Promise((resolve, reject) => {
            sql.sqlserver.sqlBookDataInsert(name,img,price)
                .then(data => { 
                    sql.sqlserver.sqlClose(); //close server                   
                    resolve('insert success');
                }).catch(err => {
                    reject('insert err ' + err);
                })
        })
    }


    //save speakers test to database
    async saveBookDataToDatabase(arr){
        for (let i=0;i<arr.length;i++){
            let name = arr[i].name,
                img = arr[i].img,
                price = arr[i].price;
            
            await this.BookDataInsert(name,img,price)
                .then(data => {
                    console.log(data);
                }).catch(err => {
                    console.log('insert method err:' + err);
                })  
        }
    }


    //http request
    httpRequest(url) {
        return new Promise(async (resolve, reject) => {
            await rp(url).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    }



}
var common=new Common();
exports.common=common;