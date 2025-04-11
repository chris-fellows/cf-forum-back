//const express = require('express')
import { authenticateToken, authoriseRole } from "../authenticationtools.js"
import express from "express"
import connectionPool from "../database.js"
import { getUserId } from "../authenticationtools.js"

const routesPages = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesPages.use(timeLog)  

// Handle test request
routesPages.get("/test", (req, res) =>{    
    console.log("Received pages test")

    res.json("Response from pages test")
})

// Handle get pages request
routesPages.post("/", authenticateToken, authoriseRole(["ADMIN"]), (req, res) => {
  console.log("Received get pages request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting pages from DB")      
      
      const values = []

      const query = "CALL cfforum.sp_Get_Pages()"
      connection.query(query, values, (error, data) => {
          console.log("Get pages query returned")

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

// Handle get page by id request
routesPages.get("/:id", authenticateToken, (req, res) => {
  console.log("Received get page by id request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting page by id from DB")       
      const values = [req.params.id]

      const query = "CALL cfforum.sp_Get_Page(?)"
      connection.query(query, values, (error, data) => {
          console.log("Get page query returned")

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
export default routesPages
