//const express = require('express')
import express from "express"
import connectionPool from "../database.js"

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
routesPosts.get("/", (req, res) => {
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

// Handle delete posyt by id request
// TODO: Change to just hide post
routesPosts.delete("/:postid", (req, res) => {
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
routesPosts.get("/byroot/:postid", (req, res) => {
    console.log("Received get posts by root post id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting posts by group id from DB")       

        // Calculate offset
        //const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);

        const values = [req.params.postid,
                        Number(req.query.pageSize),
                        Number(req.query.pageNumber)]

        /*                        
        const query = "SELECT p.*, u.Name AS UserName, u.Logo AS UserLogo " +
            "FROM cfforum.posts p " +
            "INNER JOIN cfforum.users u on u.ID = p.UserID " +
            "WHERE RootPostID=? " +
            "ORDER BY p.CreatedDateTime LIMIT ? OFFSET ?"
        */
        const query = "CALL cfforum.sp_Get_Posts_By_Root_Post(?, ?, ?)"
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
routesPosts.get("/byuser/:userid", (req, res) => {
    console.log("Received get posts by root post id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Getting posts by group id from DB")       

        // Calculate offset
        //const offset = (Number(req.query.pageNumber) - 1) * Number(req.query.pageSize);

        const values = [req.params.userid,
                        Number(req.query.pageSize),
                        Number(req.query.pageNumber)]
        
        /*                                
        const query = "SELECT p.*, u.Name AS UserName, u.Logo AS UserLogo " +
            "FROM cfforum.posts p " +
            "INNER JOIN cfforum.users u on u.ID = p.UserID " +
            "WHERE p.UserID=? " +
            "ORDER BY p.CreatedDateTime LIMIT ? OFFSET ?"
        */
        const query = "CALL cfforum.sp_Get_Posts_By_User(?, ?, ?)"

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

// Handle update post by id request
routesPosts.put("/:postid", (req, res) => {
    console.log("Received update post by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Updating post by id")       

        const values = [req.params.postid,
                        req.body.text]

        //const query = "UPDATE cfforum.posts SET Text=? WHERE ID=?"
        const query = "CALL cfforum.sp_Update_Post(?, ?)"
        connection.query(query, values, (error, data) => {
            console.log("Updated post")

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

// Handle vote post by id request
// 0: No vote, 1=Upvoted, 2=Voted
routesPosts.put("/:postid/vote", (req, res) => {
    console.log("Received unvote post by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Updating post by id")       

        const values = [req.body.vote,
                        req.params.postid,
                        req.body.userid]

        const query = "UPDATE cfforum.user_post_info SET Vote=? PostID=? AND UserID=?"
        connection.query(query, values, (error, data) => {
            console.log("Updated post")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

// Handle track by id request
// 0=Untracked, 1=Tracked
routesPosts.put("/:postid/track", (req, res) => {
    console.log("Received track post by id request")

    connectionPool.getConnection((error, connection) => {            
        console.log("Updating post by id")       

        const values = [req.body.track,
                        req.params.postid,
                        req.body.userid]

        const query = "UPDATE cfforum.user_post_info SET Track=? WHERE PostID=? AND UserID=?"
        connection.query(query, values, (error, data) => {
            console.log("Updated post")

            if (error) console.log(error)    
            if (error) return res.json(error)
            return res.json(data)
        })

        connection.release()        
      })
})

//module.exports = router
export default routesPosts
