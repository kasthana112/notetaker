const router = require('express').Router();
const fs = require('fs');


router.get('/notes', (req, res) =>{
    console.log("get notes route");
    
fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
    
}
)
})
    router.post('/notes', (req, res) => {
        console.log("post notes route");
        let newNoteToSave = {
            ...req.body,}
    //    // notes.push(newNote);
    //     updateDb();

    //     db.push(newNoteToSave);
    //     fs.writeFileSync('./db/db.json', JSON.stringify(db),function(err){
    //         if(err) throw err;
    //     // });//
    });

    function updateDb() {
        fs.writeFile('./db/db.json', JSON.parse(notes), (err) => {
            if (err) throw err;
        });

        //res.json(notes);/
        console.log(notes);
    }
//comments//


router.delete('/notes/:id', (req, res) => {
    let id = req.params.id;
    notes.splice(id, 1);
    updateDb();
})



module.exports = router;
