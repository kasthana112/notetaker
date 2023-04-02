const express = require('express');
const fs= require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// http://localhost:3001/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// http://localhost:3001/notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// http://localhost:3001/api/notes
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        console.log(notes);
        const newNotes = req.body;
        newNotes.id = uuidv4();
        console.log(newNotes);
        notes.push(newNotes);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(notes);
        });

    });

});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) =>
    {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });

});



app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`));
