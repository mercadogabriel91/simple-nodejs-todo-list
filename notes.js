const fs = require('fs')
const chalk = require('chalk');

// ADD NOTES HANDLER
const addNote = (title, body) => {
    const notes = loadNotes()    
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

// REMOVE NOTES HANDLER
const removeNote = (title) => {
    const notes = loadNotes()

    const noteExists = notes.find(
        note => note.title === title
    )


    if (noteExists !== undefined) {

        console.log(chalk.bgGreen(`Note titled: "${noteExists.title}" has been deleted`))

        const duplicateNotes = notes.filter(note => note.title !== noteExists.title)

        saveNotes(duplicateNotes)

    } else {
        console.log(chalk.bgRed(`that note doesn't exist my man`))
    }
}

// LIST NOTES HANDLER
const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => console.log(`Note title: ${chalk.bgGreen(note.title)}`))
}

// READ NOTES HANDLER
const readNote = (title) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (duplicateNote) {
        console.log(`Showing note: "${duplicateNote.title}". 
        - The note is : ${chalk.bgYellow(duplicateNote.body)}`)
    } else {
        console.log(chalk.bgRed(`sorry, couldn't find that note!`))
    }
}

// FILE MANAGER FUNCTIONS
const saveNotes= (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {   
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}