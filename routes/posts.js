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

// TODO: Remove this
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
routesPosts.get("/:id", (req, res) => {
    console.log("Received get posts by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting posts by id from DB")       
        const values = [req.params.id]

        const query = "SELECT * FROM cfforum.posts WHERE ID=?"
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
