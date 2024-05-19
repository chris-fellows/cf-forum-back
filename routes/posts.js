//const express = require('express')
import { authenticateToken, authoriseRole } from "../authenticationtools.js"
import express from "express"
import connectionPool from "../database.js"
import { getUserId } from "../authenticationtools.js"

const routesPosts = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
routesPosts.use(timeLog)  

// Handle test request
routesPosts.get("/test", (req, res) =>{    
    console.log("Received posts test")

    res.json("Response from posts test")
})

// TODO: Remove this. Don't need to ever get all posts
// Handle get posts request
/*
routesPosts.get("/", authenticateToken, (req, res) => {
    console.log("Received get posts request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting posts from DB")       
        
        const query = "SELECT p.*, u.Name AS UserName, u.Logo AS UserLogo " +
            "FROM cfforum.posts p " +
            "INNER JOIN cfforum.users u on u.ID = p.UserID " +        
            "ORDER BY p.CreatedDateTime"

        connection.query(query, (error, data) => {
            console.log("Get posts query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})
*/

// Handle delete posyt by id request
// TODO: Change to just hide post
routesPosts.delete("/:postid", authenticateToken, (req, res) => {
    console.log("Received delete post by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting posts by group id from DB")       

        const values = [req.params.postid]

        const query = "DELETE * FROM cfforum.posts WHERE PostID=?"
        connection.query(query, values, (error, data) => {
            console.log("Delete posts query returned")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

// Handle get posts by id request
routesPosts.get("/byroot/:postid", authenticateToken, (req, res) => {
    console.log("Received get posts by root post id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting posts by group id from DB")       

        // Calculate offset
        //const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);

        // Get current user
        const currentUserId = getUserId(req.header('authorization'));        
        //console.log("User=" + currentUserId);

        const values = [req.params.postid,
                        Number(req.query.pageSize),
                        Number(req.query.pageNumber),
                        Number(currentUserId)]
       
        const query = "CALL cfforum.sp_Get_Posts_By_Root_Post(?, ?, ?, ?)"
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

// Handle get posts by user id request
routesPosts.get("/byuser/:userid", authenticateToken, (req, res) => {
    console.log("Received get posts by root post id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting posts by group id from DB")       

        // Calculate offset
        //const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);

        const currentUserId = getUserId(req.header('authorization'));        
        //console.log("User=" + currentUserId);

        const values = [req.params.userid,
                        Number(req.query.pageSize),
                        Number(req.query.pageNumber),
                        Number(currentUserId)]
               
        const query = "CALL cfforum.sp_Get_Posts_By_User(?, ?, ?, ?)"
        connection.query(query, values, (error, data) => {
            console.log("Get posts query returned")

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

// Handle update post by id request
routesPosts.put("/:postid", authenticateToken, (req, res) => {
    console.log("Received update post by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Updating post by id")       

        const currentUserId = getUserId(req.header('authorization')); 

        const values = [req.params.postId,
                        req.body.text,
                        Number(currentUserId)]
        
        const query = "CALL cfforum.sp_Update_Post(?, ?)"
        connection.query(query, values, (error, data) => {
            console.log("Updated post")

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

// Handle vote post by id request
// 0: No vote, 1=Upvoted, 2=Voted
routesPosts.put("/:postid/vote", authenticateToken, (req, res) => {
    console.log("Received unvote post by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Updating user post info by id")       

        const values = [req.body.userid,                        
                        req.params.postid,
                        req.body.vote]                        

        const query = "CALL cfforum.sp_Update_User_Post_Info(?, ?, ?, null)"
        connection.query(query, values, (error, data) => {
            console.log("Updated user post info")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

// Handle track by id request
// 0=Untracked, 1=Tracked
routesPosts.put("/:postid/track", authenticateToken, (req, res) => {
    console.log("Received track post by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Updating post by id")       

        const values = [req.body.userid,
                        req.params.postid,
                        req.body.track]                        

        const query = "CALL cfforum.sp_Update_User_Post_Info(?, ?, null, ?)"
        connection.query(query, values, (error, data) => {
            console.log("Updated post")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})


// Handle add post request
routesPosts.post("/", authenticateToken, (req, res) => {
    console.log("Received add post request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Add post")       

        // GroupID, Text, UserID, RootPostID, ParentPostID
        const values = [req.body.groupId,                        
                        req.body.text,
                        req.body.userId,
                        req.body.rootPostId,
                        req.body.parentPostId]
        
        const query = "CALL cfforum.sp_Add_Post(?, ?, ?, ?, ?)"
        connection.query(query, values, (error, data) => {
            console.log("Added post")

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
export default routesPosts
