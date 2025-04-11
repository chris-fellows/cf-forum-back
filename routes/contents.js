//const express = require('express')
import { authenticateToken, authoriseRole } from "../authenticationtools.js"
import express from "express"
import connectionPool from "../database.js"
import { getUserId } from "../authenticationtools.js"

const routesContents = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesContents.use(timeLog)  

// Handle test request
routesContents.get("/test", (req, res) =>{    
    console.log("Received contents test")

    res.json("Response from contents test")
})

// Handle get contents request
routesContents.post("/", authenticateToken, authoriseRole(["ADMIN"]), (req, res) => {
  console.log("Received get contents request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting contents from DB")      
      
      const values = []

      const query = "CALL cfforum.sp_Get_Contents()"
      connection.query(query, values, (error, data) => {
          console.log("Get contents query returned")

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

// Handle get content by id request
routesContents.get("/:id", authenticateToken, (req, res) => {
  console.log("Received get contents by id request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting contents by id from DB")       
      const values = [req.params.id]

      const query = "CALL cfforum.sp_Get_Content(?)"
      connection.query(query, values, (error, data) => {
          console.log("Get contents query returned")

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

// Handle get content by name request
routesContents.post("/byname", authenticateToken, (req, res) => {
    console.log("Received get content by name request")
    
    connectionPool.getConnection((error, connection) => {            
        console.log("Getting content by name from DB")       
        const values = [req.body.name]
        
        const query = "CALL cfforum.sp_Get_Content_By_Name(?)"
        connection.query(query, values, (error, data) => {
            console.log("Get content query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            
            // Strip RawDataPacket
            const result = JSON.parse(JSON.stringify(data[0]));
            console.log(result);        
            return res.json(result)   
        })

        connection.release()        
      })
})

//module.exports = router
export default routesContents
