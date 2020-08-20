const fs = require('fs');
const chalk = require('chalk');
const getNotes = (() =>{
    return "Your Notes...."
})

const addNotes = ((title,body) =>{
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note)=>{
        return note.title === title
    })
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        
        saveNote(notes)
        //console.log(notes,"new note added")
        console.log(chalk.bgGreen.yellow.bold('  New Note Added ! '));
    }
    else{
        //console.log('Note title taken !');
        console.log(chalk.bgRed.yellow.bold('  Note title taken ! '));
    }
   
})

const removeNotes = (function(title){
    const notes = loadNotes();
    // notes.forEach(function(element,index,arr){
    //     if(element.title === title){
    //         notes.splice(index,1)
    //         console.log('Item removed')
    //     }
    // });
    const notesToKeep = notes.filter((note) =>{
        return note.title !== title
    })
    if(notesToKeep.length < notes.length){
        console.log(chalk.bgGreen.yellow.bold('  Successfully note removed ! '));
        saveNote(notesToKeep)
    }
    else{
        console.log(chalk.bgRed.yellow.bold('  Note not found ! '));
    }
    
    //console.log(notes,"Successfully note removed !")
})

const listNotes = (() =>{
    const notes = loadNotes();
    notes.forEach((note) =>{
        console.log(chalk.bgGreen.yellow.bold(note.title," : ",note.body));
        console.log()
    })
 
})

const readNotes = (title) =>{
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.bgGreen.yellow.bold(note.title," : ",note.body));
        
    }
    else{
        console.log(chalk.bgRed.yellow.bold('  Note not found ! '));
    }
 
}

const saveNote = ((notes) =>{
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson);
})

const loadNotes = (() =>{
    try{
        const jsonfile = fs.readFileSync('notes.json').toString();
        return JSON.parse(jsonfile);
    }
    catch(err){
        return [];
    }
    
})
module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}
