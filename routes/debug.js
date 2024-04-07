//const express = require('express')
import express from "express"
const routesDebug = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesDebug.use(timeLog)  

// Handle test request
routesDebug.get("/test", (req, res) =>{    
    console.log("Received debug test")

    res.json("Response from debug test")
})

//module.exports = router
export default routesDebug
