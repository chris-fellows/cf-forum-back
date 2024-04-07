import mysql from "mysql"

console.log("Creating database pool")
const connectionPool  = mysql.createPool({
    connectionLimit : 5,
    host     : 'localhost',
    user     : 'root',
    password : 'kAn68sq9B218s',
    database : 'cfforum',
  });

export default connectionPool