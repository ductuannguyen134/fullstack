const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/noteDB', {useNewUrlParser: true, useUnifiedTopology: true});

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Note = mongoose.model('Notes',noteSchema);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/notes',function(req,res){
    Note.find({},function(err,foundNotes){
        if(!err){
            if(foundNotes){
                res.send(foundNotes);
            }else{
                res.send("No notes found");
            }
        }else{
            console.log(err);
        }
    })
})

app.delete('/notes',function(req,res){
    Note.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all notes");
        }else{
            res.send(err);
            console.log(err);
        }
    })
})

app.get('/notes/:thisNote',function(req,res){
    Note.findOne({title: req.params.thisNote}, function(err,foundNote){
        if(!err){
            if(foundNote){
                res.send(foundNote);
            }else{
                res.send("Note not found");
            }
        }else{
            console.log(err);
        }
    })
})

app.delete('/notes/:noteID',function(req,res){
    Note.deleteOne({_id: req.params.noteID},function(err){
        if(!err){
            res.send("Successfully deleted note!");
        }else{
            console.log(err);
        }
    })
})

app.post('/notes',function(req,res){
    const newNote = Note({
        title: req.body.title,
        content: req.body.content
    })
    console.log(req.body);
    newNote.save(function(err){
        if(!err){
            res.send("Successfully posted!");
        }else{
            res.send(err);
        }
    })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})