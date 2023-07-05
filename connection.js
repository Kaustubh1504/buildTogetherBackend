const mysql = require('mysql2');
  
// var mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '12345678',
//     database: 'employeedb'
// })

var mysqlConnection = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6630559',
    password: 'vkxf2lU5Jz',
    database: 'sql6630559'
})
 

var connection = mysqlConnection.connect((err) => {
    if(err){
        console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2));  // convert error to json format. It sayd that fill all blank spaces with 'undefined' and keep space btw each 2
    }else{
        console.log('DB connection succesfull')
    }
})

module.exports = mysqlConnection;