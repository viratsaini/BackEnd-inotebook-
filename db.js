const mongoose = require('mongoose')
const mongoURI="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+7.0.2"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
} 
module.exports=connectToMongo;