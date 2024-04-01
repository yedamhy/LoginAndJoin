// 조회 기능
const mysql = require("mysql");
const sql = require("./sql");

require('dotenv').config({
    path : ".env",
})

// query 처리 용
const pool = mysql.createPool(
    {
        connectionsLimit : process.env.MYSQL_LIMIT,
        host : process.env.MYSQL_HOST,
        port : process.env.MYSQL_PORT,
        user : process.env.MYSQL_USERID,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DB,
    }
);

// 쿼리를 날리고 받아서 resolve 시켜서 return
const query = async(alias, values) => {
    return new Promise((resolve, reject) =>
        pool.query(sql[alias], values, (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    error,
                });
            } else resolve(results);
        })
    );
};

// 쿼리 실어서 호출 보내는 용도
module.exports = {
    query,
};