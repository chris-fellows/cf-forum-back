import mysql from "mysql"

//console.log("Connecting to database")
//const db = mysql.createConnection({
//    host: "localhost",
//    //port: 3306,
//    user: "root",
//    password: "kAn68sq9B218s",    
//    database: "cfforum"
//})
//export default db
//console.log("Connected to database")

// TODO: Move to config
console.log("Creating database pool")
const connectionPool  = mysql.createPool({
    connectionLimit : 5,
    host     : 'localhost',
    user     : 'root',
    password : 'kAn68sq9B218s',
    database : 'cfforum',
  });

export default connectionPool