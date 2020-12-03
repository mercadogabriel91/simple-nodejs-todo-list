const yargs = require('yargs')
const chalk = require('chalk');
const notes = require('./notes');
const { string } = require('yargs');

//Customize yargs version 
yargs.version('1.1.0')

//Create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create a remove command 
yargs.command({
    command: 'rm',
    describe: 'Remove a note!',
    builder:{
        title:{
            describe: 'Note to be removed',
            demandOption: true,
            type: string,
        },
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Create a list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
       notes.listNotes()
    }
})

//Create a read command
yargs.command({
    command:'read',
    describe:'Read a specific note',
    builder: {
        title: {
            describe:'Open the note with the given title.',
            demandOption: true,
            type: string,
        },
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()