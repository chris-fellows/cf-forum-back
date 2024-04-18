import express from "express"
import cors from "cors"
import routesAdverts from "./routes/adverts.js"
import routesDebug from "./routes/debug.js"
import routesGroups from "./routes/groups.js"
import routesPosts from "./routes/posts.js"
import routesRootPosts from "./routes/rootposts.js"
import routesSecurity from "./routes/security.js"
import routesUsers from "./routes/users.js"

const app = express()

// Enable cors
app.use(cors())

// Handle body
app.use(express.json())   

// Register routes
app.use('/adverts', routesAdverts)
app.use('/debug', routesDebug)
app.use('/groups', routesGroups)
app.use('/security', routesSecurity)
app.use('/posts', routesPosts)
app.use('/rootposts', routesRootPosts)
app.use('/users', routesUsers)

app.listen(8800, () => {
    console.log("Connected to backend")
})