// 여기에는 sql 쿼리문이 들어간다.
module.exports = {
    usersList : `select * from users`,
    userInsert : `insert into users set ?`,
    userUpdate : `update users set ? where id = ?`, // 배열로 쏴주면 자동으로 첫번째게 첫번째 물음표에 , 이런식으로 드어감.
    userDelete: `delete from users where id = ?`,

    userLogin : `SELECT * FROM users WHERE userid = ?`,
    checkIdDupli : 'SELECT COUNT(*) AS count FROM users WHERE userid = ?',
};