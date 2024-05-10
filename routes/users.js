//const express = require('express')
import express from "express"
import connectionPool from "../database.js"
import { getUserId } from "../authenticationtools.js"

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

      //const currentUserId = getUserId(req.header('authorization'));        
      //console.log("User=" + currentUserId);
      
      const values = [10000000, // pageSize
                      1] // pageNumber

      const query = "CALL cfforum.sp_Get_Users(?, ?)"
      connection.query(query, values, (error, data) => {
          console.log("Get users query returned")

          if (error) console.log(error)    
          if (error) return res.json(error)

          // Strip RawDataPacket
          const result = JSON.parse(JSON.stringify(data[0]));
          //console.log(result);                  
          return res.json(result);
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

      const query = "CALL cfforum.sp_Get_User(?)"
      connection.query(query, values, (error, data) => {
          console.log("Get user query returned")

          if (error) console.log(error)    
          if (error) return res.json(error)

          // Strip RawDataPacket
          const result = JSON.parse(JSON.stringify(data[0]));
          console.log(result);                  
          return res.json(result);          
      })

      connection.release()        
    })
})

//module.exports = router
export default routesUsers
