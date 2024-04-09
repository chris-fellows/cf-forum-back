//const express = require('express')
import express from "express"
import connectionPool from "../database.js"

const routesUsers = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesUsers.use(timeLog)  

// Handle test request
routesUsers.get("/test", (req, res) =>{    
    console.log("Received users test")

    res.json("Response from users test")
})

// Handle get users request
routesUsers.get("/", (req, res) => {
  console.log("Received get users request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting users from DB")       

      const query = "SELECT * FROM cfforum.users"
      connection.query(query, (error, data) => {
          console.log("Get users query returned")

          if (error) console.log(error)    
          if (error) return res.json(error)
          return res.json(data)
      })

      connection.release()        
    })
})

// Handle get user by id request
routesUsers.get("/:id", (req, res) => {
  console.log("Received get user by id request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting user by id from DB")       
      const values = [req.params.id]

      const query = "SELECT * FROM cfforum.users WHERE ID=?"
      connection.query(query, values, (error, data) => {
          console.log("Get user query returned")

          if (error) console.log(error)    
          if (error) return res.json(error)
          return res.json(data)
      })

      connection.release()        
    })
})

//module.exports = router
export default routesUsers
