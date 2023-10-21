const mongoose = require('mongoose');

const UserSchema = new Schema({
    neme:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    passeord:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
  });
module.exports=mongoose.model("user",UserSchema);