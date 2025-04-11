import express from "express"
import cors from "cors"
import routesAdverts from "./routes/adverts.js"
import routesAudit from "./routes/audit.js"
import routesContents from "./routes/contents.js"
import routesDebug from "./routes/debug.js"
import routesGroups from "./routes/groups.js"
import routesLanguages from "./routes/languages.js"
import routesPages from "./routes/pages.js"
import routesPosts from "./routes/posts.js"
import routesRootPosts from "./routes/rootposts.js"
import routesSecurity from "./routes/security.js"
import routesTags from "./routes/tags.js"
import routesUsers from "./routes/users.js"

const app = express()

// Enable cors
app.use(cors())

// Handle body
app.use(express.json())   

// Register routes
app.use('/adverts', routesAdverts)
app.use('/audit', routesAudit)
app.use('/contents', routesContents)
app.use('/debug', routesDebug)
app.use('/groups', routesGroups)
app.use('/languages', routesLanguages)
app.use('/pages', routesPages)
app.use('/security', routesSecurity)
app.use('/posts', routesPosts)
app.use('/rootposts', routesRootPosts)
app.use('/tags', routesTags)
app.use('/users', routesUsers)

//console.log(require('crypto').randomBytes(64).toString('hex'))

//const test = new Uint8Array(64);
//test[10] = 65;
//console.log(test.toString('hex'));
//const secret = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

app.listen(8800, () => {
    console.log("Connected to backend")
})