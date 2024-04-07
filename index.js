import express from "express"
import mysql from "mysql"
import routesDebug from "./routes/debug.js"
import routesGroups from "./routes/groups.js"
import routesPosts from "./routes/posts.js"
import routesUsers from "./routes/users.js"
//import pool  from "./database.js"
import cors from "cors"

//const router = require("./routes/groups.js");

const app = express()

// Enable cors
app.use(cors())

console.log("Connecting to database")
const db = mysql.createConnection({
    host: "localhost",
    //port: 3306,
    user: "root",
    password: "kAn68sq9B218s",    
    database: "cfforum"
})
//export default db

//console.log("Creating pool")
//const pool1  = mysql.createPool({
//    connectionLimit : 5,
//    host: "localhost",
//    //port: 3306,
//    user: "root",
//    password: "kAn68sq9B218s",    
//    database: "cfforum"
//  })
//console.log(pool1)
//console.log("Getting pool connection")
//const connection = pool1.getConnection();
//console.log("Got pool connection")
//console.log(connection)

//console.log(pool)
//console.log("Getting pool connection")
//const connection = pool.getConnection()
//console.log(connection)

//console.log("Creating database pool")
//const pool  = mysql.createPool({
//    connectionLimit : 5,
//    host: "localhost",
//    //port: 3306,
//    user: "root",
//    password: "kAn68sq9B218s",    
//    database: "cfforum"
//  })
//export default pool

console.log("Connected to database")

//const groupsRoute = require('./routes/groups')

// Add middleware for external tools (E.g. Postmann)
//app.use(express.json)

app.get("/", (req, res) => {     
    console.log("Received get default request")

    res.json("Response from backend")
})

// Register routes
app.use('/debug', routesDebug)
app.use('/groups', routesGroups)
app.use('/posts', routesPosts)
app.use('/users', routesUsers)

// Handle test request
//app.get("/test", (req, res) =>{    
//    console.log("Received test")
//
//    res.json("Response from test")
//})

// Handle get groups request
//app.get("/groups", (req, res) => {
//    const query = "SELECT * FROM cfforum.groups"
//    console.log("Received get groups request")
//
//    //res.json("Response from group request")
//
//    db.query(query, (error, data) => {
//        if (error) console.log(error)    
//        if (error) return res.json(error)
//        return res.json(data)
//    })
//})

// Handle get group root posts request
//app.get("/grouprootposts", (req, res) => {
//    const query = "SELECT * FROM cfforum.posts WHERE Sequence=1 AND ..."   // TODO: Set this
//    console.log("Received get groups request")
//    //res.json("Response from group request")
//
//    db.query(query, (error, data) => {
//        if (error) console.log(error)    
//        if (error) return res.json(error)        
//        return res.json(data)
//    })
//})

// Handle get group posts request
app.get("/group/{id}/posts", (req, res) => {
    const query = "SELECT * FROM cfforum.posts WHERE GroupId=? AND ..."   // TODO: Set this
    console.log("Received get groups request")
    //res.json("Response from group request")

    db.query(query, (error, data) => {
        if (error) console.log(error)    
        if (error) return res.json(error)        
        return res.json(data)
    })
})

// Handle get random advert request
app.get("/adverts/random", (req, res) => {
    // TODO: Get random
    const query = "SELECT * FROM cfforum.adverts"
    console.log("Received get random advert request")

    db.query(query, (error, data) => {
        if (error) console.log(error)    
        if (error) return res.json(error)
        return res.json(data)
    })
})

// Handle create group
//app.post("/groups", (req, res) => {
//   const query = "INSERT INTO groups (`name`,`description`) VALUES (?)"
//    const values = [req.body.name, req.body.description]
//
//    db.query(query, [values], (error, data) => {
//        if (error) return res.json(error)
//        return res.json("Group created")
//    })
//})

app.listen(8800, () => {
    console.log("Connected to backend")
})