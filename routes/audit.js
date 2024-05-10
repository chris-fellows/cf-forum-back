//const express = require('express')
import express from "express"
import connectionPool from "../database.js"
import { getUserId } from "../authenticationtools.js"

const routesAudit = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesAudit.use(timeLog)  

// Handle test request
routesAudit.get("/test", (req, res) =>{    
    console.log("Received groups test")

    res.json("Response from groups test")
})

// Handle get audit by hours request
routesAudit.get("/byhours/:hours", (req, res) => {
    console.log("Received get audit by hours request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting audit by hours from DB")       
        
        const currentUserId = getUserId(req.header('authorization'));                
        //console.log("User=" + currentUserId);

        const values = [req.params.hours,
                        Number(req.query.pageSize),
                        Number(req.query.pageNumber),
                        Number(currentUserId)]

        const query = "CALL cfforum.sp_Get_Audit_By_Hours(?, ?, ?, ?)"
        connection.query(query, values, (error, data) => {
            console.log("Get audit query returned")

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
export default routesAudit
