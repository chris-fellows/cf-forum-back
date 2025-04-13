//const express = require('express')
import { authenticateToken, authoriseRole } from "../authenticationtools.js"
import express from "express"
import connectionPool from "../database.js"
//import { getUserId } from "../authenticationtools.js"

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
routesGroups.post("/", authenticateToken, (req, res) => {
    console.log("Received get groups request")

    connectionPool.getConnection((error, connection) => {            
        //const currentUserId = getUserId(req.header('authorization'));                

        console.log("Getting groups from DB")       

        const values = [req.body.find]            

        const query = "CALL cfforum.sp_Get_Groups(?)"
        connection.query(query, values, (error, data) => {
            console.log("Get groups query returned")

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

// Handle get group by id request
routesGroups.get("/:id", authenticateToken, (req, res) => {
    console.log("Received get group by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting group by id from DB")       
        const values = [req.params.id]

        const query = "CALL cfforum.sp_Get_Group(?)"
        connection.query(query, values, (error, data) => {
            console.log("Get groups query returned")

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

// Handle get all group tags
routesGroups.get("/tags/all", authenticateToken, (req, res) => {
    console.log("Received get group tags request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting group tags from DB")       
        const values = []

        const query = "CALL cfforum.sp_Get_Group_Tags()"
        connection.query(query, values, (error, data) => {
            console.log("Get group tags query returned")

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

// Handle get group tags by group request
routesGroups.get("/tags/:id", authenticateToken, (req, res) => {
    console.log("Received get group tags by group id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting group tags by group id from DB")       
        const values = [req.params.id]

        const query = "CALL cfforum.sp_Get_Group_Tags_By_Group(?)"
        connection.query(query, values, (error, data) => {
            console.log("Get group tags by group query returned")

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
export default routesGroups
