const fs = require('fs')
const chalk = require('chalk');
const { title } = require('process');

const getNotes = function(){
    return loadNotes()
};

const addNote =  (title, body) => {
    const notes = loadNotes()
    //console.log(notes)
    /*const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })*/
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNotes = notes.find((note) => note.title === title)
    debugger
    if (!duplicateNotes) {
        notes.push({
            'title': title,
            'body': body
        })
        return saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const listNotes = () => {
    const notes = loadNotes()
    //console.log(notes)
    notes.forEach( (note) => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note)=> note.title===title)
    if(note){
        console.log(note)
    }else{
        console.log('not found')
    }
}

const removeNotes = (title) =>{
    const notes = loadNotes()
    /*const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })*/
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length){
        console.log(chalk.white('notes remove'))
    }else{
        console.log(chalk.white('not Found'))
    }
    return saveNotes(notesToKeep)
}
const saveNotes = (notes)=>{
    let notesData = JSON.stringify(notes)
    let writeData = fs.writeFileSync('./notes.json',notesData)
    return writeData
}

const loadNotes = () =>{
    try{
        let dataBuffer = fs.readFileSync('./notes.json')
        let dataJSON = dataBuffer.toString()
        let dataParse = JSON.parse(dataJSON)
        return dataParse
    }catch(err){
        return []
    }
}



module.exports = {
    getNotes,
    addNote,
    removeNotes,
    listNotes,
    readNotes
}
 