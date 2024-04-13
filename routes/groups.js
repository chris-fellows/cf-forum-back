//const express = require('express')
import express from "express"
import connectionPool from "../database.js"

const routesGroups = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesGroups.use(timeLog)  

// Handle test request
routesGroups.get("/test", (req, res) =>{    
    console.log("Received groups test")

    res.json("Response from groups test")
})

// Handle get groups request
routesGroups.get("/", (req, res) => {
    console.log("Received get groups request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting groups from DB")       

        const query = "SELECT * FROM cfforum.groups ORDER BY Name"
        connection.query(query, (error, data) => {
            console.log("Get groups query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

// Handle get group by id request
routesGroups.get("/:id", (req, res) => {
    console.log("Received get group by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting group by id from DB")       
        const values = [req.params.id]

        const query = "SELECT * FROM cfforum.groups WHERE ID=?"
        connection.query(query, values, (error, data) => {
            console.log("Get groups query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

//module.exports = router
export default routesGroups
