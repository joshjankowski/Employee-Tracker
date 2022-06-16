module.exports = function() {

const mysql = require('mysql2');
const ds = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_db'
    },);

    return ds;
}