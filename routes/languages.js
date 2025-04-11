//const express = require('express')
import { authenticateToken, authoriseRole } from "../authenticationtools.js"
import express from "express"
import connectionPool from "../database.js"
import { getUserId } from "../authenticationtools.js"

const routesLanguages = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesLanguages.use(timeLog)  

// Handle test request
routesLanguages.get("/test", (req, res) =>{    
    console.log("Received languages test")

    res.json("Response from languages test")
})

// Handle get languages request
routesLanguages.post("/", authenticateToken, authoriseRole(["ADMIN"]), (req, res) => {
  console.log("Received get languages request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting languages from DB")      
      
      const values = []

      const query = "CALL cfforum.sp_Get_Languages()"
      connection.query(query, values, (error, data) => {
          console.log("Get languages query returned")

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
routesLanguages.get("/:id", authenticateToken, (req, res) => {
  console.log("Received get languages by id request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting languages by id from DB")       
      const values = [req.params.id]

      const query = "CALL cfforum.sp_Get_Language(?)"
      connection.query(query, values, (error, data) => {
          console.log("Get languages query returned")

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
export default routesLanguages
