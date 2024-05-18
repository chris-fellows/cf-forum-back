import { authenticateToken, authoriseRole, createAccessToken } from "../authenticationtools.js"
import express from "express"
import connectionPool from "../database.js"

const routesSecurity = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesSecurity.use(timeLog)  

// Handle test request
routesSecurity.get("/test", (req, res) =>{    
    console.log("Received debug test")

    res.json("Response from debug test")
})

// Handle login request
// TODO: Change to use JWT
routesSecurity.post("/login", (req, res) =>{    
  console.log("Received login request")

  connectionPool.getConnection((error, connection) => {                
    const values2 = [req.body.username, req.body.password]
    const query2 = "CALL cfforum.sp_Login_User(?, ?)"
    connection.query(query2, values2, (error, data) => {                    
        if (error) console.log(error)    
        if (error) return res.json(error)         
        
        if (data[0].length > 0) {      // Valid credentials                       
          const row = data[0][0];                  
          console.log("UserName:" + row.Name);
          
          const token2 = createAccessToken({ 
                username: row.Name,            
                userid: Number(row.ID),
                role: row.UserRoleInternalName
          });
          console.log("Sending response (Success):" + token2);          
          res.json(token2);       
        }
        else {    // Invalid credentials
          console.log("Sending response (Failed)");
          res.status(401).send("Unauthorized")
          //res.json({success: false, errors: 'Failed to log in'})

          /*
          res.send({
              email: "",
              userName: "",
              userId: 0,
              token: ""
            });
          */
        }                     
    })

    console.log("Releasing pool connection");
    connection.release()        
  })  
})

// Handle logout request
routesSecurity.post("/logout", authenticateToken, (req, res) =>{        
  connectionPool.getConnection((error, connection) => {                
    const values2 = [req.body.token]
    const query2 = "CALL cfforum.sp_Logout_User(?)"
    connection.query(query2, values2, (error, data) => {                    
        if (error) console.log(error)    
        if (error) return res.json(error) 
        
        if (data[0].length > 0) {      // Valid token                       
          console.log("Sending response (Success)");
          res.send({
              loggedOut: true                  
            });
        }
        else {    // Invalid token
          console.log("Sending response (Failed)");
          res.send({
              loggedOut: false         
            });
        }                     
    })

    console.log("Releasing pool connection");
    connection.release()        
  })  
})


//module.exports = router
export default routesSecurity
