//this is the model how the data is taken by the user .in which form data will needed we make a data model in which we place all the things needed to get .

const mongoose = require('mongoose');
//mongose is a model used for creating schema for display and read data for user. 

// defining the schema for notes
const NotesSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true,
        
    },
    tag:{
        type: String,
        default:"general"
    },
    date:{
        type: Date,
        default:Date.now
    }
  });

//exporting the notesModule as notes
module.exports=mongoose.model("notes",NotesSchema);