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
routesSecurity.post("/login", (req, res) =>{    
    console.log("Received login request")

    // User session details
    let newToken = "1234567"; // TODO: Set this properly
    
    connectionPool.getConnection((error, connection) => {                
      const values2 = [req.body.username, req.body.password]
      const query2 = "SELECT * FROM cfforum.users WHERE Email=? AND Password=?"
      connection.query(query2, values2, (error, data) => {                    
          if (error) console.log(error)    
          if (error) return res.json(error) 
          
          if (data.length > 0) {      // Valid credentials             
            const newUserId = Number(data[0].ID);
            const newUserName = data[0].Name;
            const newEmail = data[0].Email;

            const values = [newUserId, newToken];            
            const query = "INSERT INTO cfforum.user_sessions(CreatedDateTime, UserID, Token) VALUES (NOW(), ?, ?)"
            connection.query(query, values, (error, data) => {
                //console.log("Added user session returned");                  
                if (error) console.log(error)    
                if (error) return res.json(error)

                console.log("Sending response (Success)");
                res.send({
                    email: newEmail,
                    userName: newUserName,
                    userId: newUserId,
                    token: newToken
                  });
            })
          }
          else {    // Invalid credentials
            console.log("Sending response (Failed)");
            res.send({
                email: "",
                userName: "",
                userId: 0,
                token: ""
              });
          }                     
      })

      console.log("Releasing pool connection");
      connection.release()        
    })  
})

// Handle logout request
routesSecurity.post("/logout", (req, res) =>{        
  connectionPool.getConnection((error, connection) => {                
    const values2 = [req.body.token]
    const query2 = "SELECT ID FROM cfforum.user_sessions WHERE Token=?"
    connection.query(query2, values2, (error, data) => {                    
        if (error) console.log(error)    
        if (error) return res.json(error) 
        
        if (data.length > 0) {      // Valid token                       
          const query = "DELETE FROM cfforum.user_sessions WHERE Token=?"
          connection.query(query, values2, (error, data) => {              
              if (error) console.log(error)    
              if (error) return res.json(error)

              console.log("Sending response (Success)");
              res.send({
                  loggedOut: true                  
                });
          })
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
