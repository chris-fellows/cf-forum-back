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

// Handle authenticate request
// TODO: Validate credentials
routesSecurity.post("/login", (req, res) =>{    
    console.log("Received login request")

    const newToken = "1234567";
    const newUserId = 1;
    const newUserName = "Chris Fellows";
    const newEmail = "chrismfellows@hotmail.co.uk";

    connectionPool.getConnection((error, connection) => {            
      console.log("Getting user details");
      console.log(req.body) ;
      console.log("username=" + req.body.username);

      const values2 = [req.body.username, req.body.password]
      const query2 = "SELECT * FROM cfforum.users WHERE Email=? AND Password=?"
      connection.query(query, values2, (error, data) => {          
          if (error) console.log(error)    
          if (error) return res.json(error) 

          console.log(data);        
          const values = [newUserId, newToken];

          const query = "INSERT INTO cfforum.login_sessions(CreatedDateTime, UserID, Token) VALUES (NOW(), ?)"
          connection.query(query, values, (error, data) => {
              console.log("Delete posts query returned")
    
              if (error) console.log(error)    
              if (error) return res.json(error)
              //return res.json(data)
          })
      })

      connection.release()        
    })

    res.send({
        email: newEmail,
        userName: newUserName,
        userId: newUserId,
        token: newToken
      });
})

/*
routesSecurity.get("/logout", (req, res) =>{    
  console.log("Received logout request")

  connectionPool.getConnection((error, connection) => {            
    console.log("Getting posts by group id from DB")     

    const values2 = [req.body.token]
    const query2 = "DELETE FROM cfforum.login_sessions WHERE Token=?"
    connection.query(query, values2, (error, data) => {          
        if (error) console.log(error)    
        if (error) return res.json(error) 

        console.log(data);
        return 
    })

    res.json("Logged out");
})
*/

//module.exports = router
export default routesSecurity
