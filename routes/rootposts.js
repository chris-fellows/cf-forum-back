//const express = require('express')
import express from "express"
import connectionPool from "../database.js"

const routesRootPosts = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesRootPosts.use(timeLog)  

// Handle test request
routesRootPosts.get("/test", (req, res) =>{    
    console.log("Received posts test")

    res.json("Response from posts test")
})

// TODO: Remove this. Don't need to ever get all posts
// Handle get posts request
routesRootPosts.get("/", (req, res) => {
    console.log("Received get posts request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting root posts from DB")       

        const query = "SELECT * FROM cfforum.posts WHERE ID=RootPostID ORDER BY CreatedDateTime"
        connection.query(query, (error, data) => {
            console.log("Get posts query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

// Handle get root post by group id request
routesRootPosts.get("/bygroup/:id", (req, res) => {
    console.log("Received get root posts by group id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting root posts by group id from DB")       
        const values = [req.params.id]

        const query = "SELECT * FROM cfforum.posts WHERE ID=? AND ID=RootPostID ORDER BY CreatedDateTime"
        connection.query(query, values, (error, data) => {
            console.log("Get posts query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

//module.exports = router
export default routesRootPosts
