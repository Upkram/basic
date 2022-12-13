const mysql = require('mysql');


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"login",
    port:"3306"
})
db.connect(function(error){
if(error)
{
    throw error;
}
else
{
    console.log("DB connect successfully");
}
})
// RgOOx9WLd3YhlQaS
// 6c6cf1e5
module.exports = db;