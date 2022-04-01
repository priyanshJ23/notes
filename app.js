
const express = require("express")
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/notedb')

const notesschema = new mongoose.Schema(
    {
        email : String,
        password : String,
        title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
    }
)
const Note = mongoose.model('Note' , notesschema)
app.get("/",function(req,res)
{
  res.render("index")
})
app.get('/home', async (req, res) => {
    const notes = await Note.find().sort('-createdAt');
    res.render('home', { notes: notes });
  });
app.post('/new', async (req, res) => {
    let note = await new Note({
      title: req.body.title,
      description: req.body.description,
    });
    try {
        note = await note.save();
        res.redirect('/home');
      } catch (e) {
        console.log(e);
        res.render('new');
      }
  });
app.post("/login",function(req,res)
{
    res.redirect('/home');
})
app.get('/home',function(req , res)
{
    res.render('home');
})
app.post("/home",function(req,res)
{
    res.render('new');
})
app.get('/new',function(req,res)
{
    res.render('new');
})
app.post("/delete",function(req,res)
{
  console.log(req.body.note.title) 
})
app.listen('3000', function(req,res) {
    console.log("hel")
})