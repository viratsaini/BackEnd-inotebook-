//this is the model how the data is taken by the user .in which form data will needed we make a data model in which we place all the things needed to get .

const mongoose = require('mongoose');
//mongose is a model used for creating schema for display and read data for user. 

const { Schema } = mongoose;
// defining the schema for notes
const NotesSchema = new Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true   
    },
   
    tag:{
        type: String,
        default:"general"
    },
   
    date:{
        type: Date,
        default:Date.now
    },
    
  });

//exporting the notesModule as notes

const Notes=mongoose.model("notes",NotesSchema);
module.exports=Notes;