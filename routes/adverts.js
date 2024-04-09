//const express = require('express')
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

// Handle get random advert request
routesAdverts.get("/random", (req, res) => {
    console.log("Received get random advert request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting random advert from DB")       
        
        const query = "SELECT * FROM cfforum.adverts WHERE NOW() >= FromDateTime AND NOW() < EndDateTime ORDER BY RAND() LIMIT 1"
        connection.query(query, (error, data) => {
            console.log("Get random adver query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

//module.exports = router
export default routesAdverts
