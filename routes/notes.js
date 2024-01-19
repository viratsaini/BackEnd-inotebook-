//defining the process of how the notes are taken
const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

//route 1: fatch all notes of user .using GET: /api/notes/fetchallnotes.login requried
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ userid: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error accurs");
  }
});

//route 2: add new notes .using POST: /api/notes/addnotes.login requried
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //check that the given userid password and email are correct according to defined rule and give error if not
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        userid: req.user.id,
      });
      const savenote = await note.save();
      res.send(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error accurs");
    }
  }
);

//route 3: update  notes .using Put: /api/notes/updatenote.login requried

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //create newnote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //find the note to be updated and update

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).sent("Not found")
  }
  // let noteid=awaitzz
  if(note.userid.toString() !== req.user.id){
    return res.status(404).send("not allowed")
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set:newNote },
    { new: true }
  );
  res.send({ note });
});
//exporting the notes module to notes routes
module.exports = router;


// Note=Notes
//user=userid