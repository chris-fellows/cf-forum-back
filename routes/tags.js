//const express = require('express')
import { authenticateToken, authoriseRole } from "../authenticationtools.js"
import express from "express"
import connectionPool from "../database.js"
import { getUserId } from "../authenticationtools.js"

const routesTags = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesTags.use(timeLog)  

// Handle test request
routesTags.get("/test", (req, res) =>{    
    console.log("Received tags test")

    res.json("Response from tags test")
})

// Handle get tags request
routesTags.post("/", authenticateToken, authoriseRole(["ADMIN"]), (req, res) => {
  console.log("Received get tags request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting tags from DB")      
      
      const values = []

      const query = "CALL cfforum.sp_Get_Tags()"
      connection.query(query, values, (error, data) => {
          console.log("Get tags query returned")

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

// Handle get tag by id request
routesTags.get("/:id", authenticateToken, (req, res) => {
  console.log("Received get user by id request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting tag by id from DB")       
      const values = [req.params.id]

      const query = "CALL cfforum.sp_Get_Tag(?)"
      connection.query(query, values, (error, data) => {
          console.log("Get tag query returned")

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
export default routesTags
