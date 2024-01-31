const connectToMongo = require("./db");
//connecting the server with express and db
const express = require('express')
connectToMongo();

const app = express()
const port = 5000
app.use(express.json());

//avalible routes and defining the api for routes.
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})