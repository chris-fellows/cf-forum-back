//const express = require('express')
import { authenticateToken, authoriseRole } from "../authenticationtools.js"
import express from "express"
import connectionPool from "../database.js"

const routesRootPosts = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesRootPosts.use(timeLog)  

// Handle test request
routesRootPosts.get("/test", (req, res) =>{    
    console.log("Received posts test")

    res.json("Response from posts test")
})

// TODO: Remove this. Don't need to ever get all posts
// Handle get posts request
routesRootPosts.get("/", authenticateToken, (req, res) => {
    console.log("Received get posts request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting root posts from DB")       

        const query = "SELECT * FROM cfforum.posts WHERE ID=RootPostID ORDER BY CreatedDateTime"
        connection.query(query, (error, data) => {
            console.log("Get posts query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

// Handle get root posts by group id request
routesRootPosts.post("/bygroup/:id", authenticateToken, (req, res) => {
    console.log("Received get root posts by group id request")
    
    connectionPool.getConnection((error, connection) => {            
        console.log("Getting root posts by group id from DB")       
        const values = [req.params.id,
                        req.body.find,
                        Number(req.query.pageSize),
                        Number(req.query.pageNumber)]
        
        const query = "CALL cfforum.sp_Get_Root_Posts_By_Group(?, ?, ?, ?)"
        connection.query(query, values, (error, data) => {
            console.log("Get posts query returned")

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

// Handle get root posts by popularity request
// Request is typically for N items from page 1 (Most popularn)
routesRootPosts.post("/bypopularity", authenticateToken, (req, res) => {
    console.log("Received get root posts by popularity request")
    
    connectionPool.getConnection((error, connection) => {            
        console.log("Getting root posts by popularity from DB")       
        const values = [req.body.find,
                        Number(req.query.pageSize),
                        Number(req.query.pageNumber)]
        
        const query = "CALL cfforum.sp_Get_Root_Posts_By_Popularity(?, ?, ?)"
        connection.query(query, values, (error, data) => {
            console.log("Get posts query returned")

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

// Handle create root post request
routesRootPosts.post("/", authenticateToken, (req, res) => {
    console.log("Received create post request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Creating root post")       

        const values = [req.body.groupId,
                        req.body.text,
                        req.body.userId ]
        
        const query = "CALL cfforum.sp_Add_Root_Post(?, ?, ?)"
        connection.query(query, values, (error, data) => {
            console.log("Created post")

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

//module.exports = router
export default routesRootPosts
