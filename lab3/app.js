import express from 'express';
import methodOverride from 'method-override';
import Note from './notes.js';  //importing the class note

const app = express();  //app is an instance of express object

app.set('view engine', 'ejs');  //set the view engine to EJS

//method-override middleware for handling PUT and DELETE requests
app.use(methodOverride('_method'));

//making "public" folder a static folder
app.use( express.static( "public" ));

//array for storing all the notes
const notes = [];

//defining a route for the notes page that renders the notes.ejs view.
app.get('/notes', (req, res) => {
    res.render('notes', { notes });
});

//a middleware for parsing the request body for the notes page route
app.use(express.urlencoded({ extended: false }));

//create a new route for the creation form
app.get('/notes/new', (req, res) => {
    res.render('note-create');
});

//create a route to handle the form submission for creating a new note
app.post('/notes', (req, res) => {
    const { title, content, createdAt } = req.body;
    const note = new Note(title, content, createdAt);
    notes.push(note);
    res.redirect('/notes');
});

//create a route to render the note update form
app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    const note = notes[id];
    res.render('note-form', { note, noteIndex: id });
});


//create a route to handle updating an existing note
app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = notes[id];
    const updatedAt = new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    notes[id] = { ...note, title, content, updatedAt, createdAt: updatedAt }; //overwriting the object, using spread operator
    res.redirect('/notes');
});

//create a route to handle deleting a note
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    notes.splice(id, 1); //delete note by id in notes array
    res.redirect('/notes');
});

//Create a new route that takes a note id as a parameter
app.get('/notes/:id/view', (req, res) => {
    const { id } = req.params;
    const note = notes[id];
    res.render('note-view', {note});
});

//start the server
app.listen(3000, () => console.log('Server running on port 3000'));