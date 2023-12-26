//this is the model how the data is taken by the user .in which form data will needed we make a data model in which we place all the things needed to get .

const mongoose = require('mongoose');
//mongose is a model used for creating schema for display and read data for user. 

const { Schema } = mongoose;
//schema for user .
const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
  });

//exporting the userSchema model as user to auth routes
  const User=mongoose.model("user",UserSchema);
module.exports=User;