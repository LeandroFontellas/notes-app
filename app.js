const chalk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')
const { describe, argv } = require('yargs')
const { removeNotes } = require('./notes.js')

yargs.command({
    command : 'add',
    describe : 'Adiciona uma nova nota',
    builder: {
        title: {
            describe:'Titulo da nota',
            demandOption: true,
            type:'string'
        },
        body:{
            describe:'Corpo da nota',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
}
)
yargs.command({
    command: 'remove',
    describe: 'Remove uma nota',
    builder: {
        title: {
            describe:'Titulo da nota',
            demandOption: true,
            type:'string'
        }
    },
    handler(){
        notes.removeNotes(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'Lista todos as notas',
    handler(){
        notes.listNotes()
    }
})
yargs.command({
    command:'read',
    describe:'Lê uma nota',
    builder:{
        title:{
            describe:'titulo da nota',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){//colocar argumento no handler se as funções embaixo forem usar argumentos
        notes.readNotes(argv.title)
    }
})
yargs.parse()