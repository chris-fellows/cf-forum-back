//const express = require('express')
import { authenticateToken, authoriseRole } from "../authenticationtools.js"
import express from "express"
import connectionPool from "../database.js"

const routesAdverts = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesAdverts.use(timeLog)  

// Handle test request
routesAdverts.get("/test", (req, res) =>{    
    console.log("Received adverts test")

    res.json("Response from adverts test")
})

// Handle get adverts request
routesAdverts.post("/", authenticateToken, authoriseRole(["ADMIN"]), (req, res) => {
  console.log("Received get adverts request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting adverts from DB")      
      
      const values = [ req.body.find,
                      Number(req.query.pageSize),
                      Number(req.query.pageNumber),]

      const query = "CALL cfforum.sp_Get_Adverts(?, ?, ?)"
      connection.query(query, values, (error, data) => {
          console.log("Get adverts query returned")

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

// Handle get random adverts request
routesAdverts.get("/random/:number", authenticateToken, (req, res) => {
    console.log("Received get random adverts request")

    //const authorization = req.header('authorization');

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting random adverts from DB")       

        const values = [Number(req.params.number)]
        
        const query = "CALL cfforum.sp_Get_Random_Adverts(?)"          
        connection.query(query, values, (error, data) => {
            console.log("Get random adverts query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)

            // Strip RawDataPacket
          const result = JSON.parse(JSON.stringify(data[0]));
          //console.log(result);        
          return res.json(result)            
        })

        connection.release()        
      })
})

// Handle get advert by id request
routesAdverts.get("/:id", authenticateToken, authoriseRole(["ADMIN"]), (req, res) => {
  console.log("Received get advert by id request")

  connectionPool.getConnection((error, connection) => {            
      console.log("Getting advert by id from DB")       
      const values = [req.params.id]

      const query = "CALL cfforum.sp_Get_Advert(?)"
      connection.query(query, values, (error, data) => {
          console.log("Get advert query returned")

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
export default routesAdverts
