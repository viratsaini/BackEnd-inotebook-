const mongoose = require('mongoose')
const mongoURL="mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=5000&appName=mongosh+7.0.2"

// connecting mongo db server or dtat base with url of data base with server.
const connectToMongo = ()=>{
    mongoose.connect(mongoURL);
} 
// export it to index.js
module.exports=connectToMongo;