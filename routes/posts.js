//const express = require('express')
import express from "express"
import connectionPool from "../database.js"

const routesPosts = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesPosts.use(timeLog)  

// Handle test request
routesPosts.get("/test", (req, res) =>{    
    console.log("Received posts test")

    res.json("Response from posts test")
})

// TODO: Remove this. Don't need to ever get all posts
// Handle get posts request
routesPosts.get("/", (req, res) => {
    console.log("Received get posts request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting posts from DB")       

        const query = "SELECT * FROM cfforum.posts"
        connection.query(query, (error, data) => {
            console.log("Get posts query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

// Handle get post by id request
routesPosts.get("/byroot/:postid", (req, res) => {
    console.log("Received get posts by root post id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting posts by group id from DB")       

        // Calculate offset
        const offset = (req.query.pageNumber - 1) * req.query.pageSize;

        const values = [req.params.postid,
                        req.query.pageSize,
                        offset]

        const query = "SELECT * FROM cfforum.posts WHERE RootPostID=? ORDER BY CreatedDateTime LIMIT ? OFFSET ?"
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
export default routesPosts
