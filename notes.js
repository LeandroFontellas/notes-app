const fs = require('fs');
const chalk = require('chalk')
const { notStrictEqual } = require('assert');

const getNotes = () => {
    return 'um textinho';
}

const addNote = (title, body) => {
    const notes = loadNotes();//forma compacta sem usar o return
    const duplicata = notes.find((note)=> title===note.title)
    if (!duplicata) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen.black('Notas adicionadas'))
    }else{
        console.log(chalk.bgRed.black('Titulo ja em uso, favor escolher outro'))
    }
}
const removeNotes = (title) => {
    try {
        const data = loadNotes()

        const search = data.filter((data)=> title !== data.title)//forma compacta sem usar o return
        
        if(search.length==data.length){
            console.log(chalk.bgRed.black('Titulo não encontrado'))
        }else{
            console.log(chalk.bgGreen.black('Titulo encontrado! Apagando...'))
            saveNotes(search)
        }
    } catch (e) {
        console.log(chalk.bgRed('Erro!Arquivo inexistente ou vazio!'))
    }
}

const listNotes = () => {
    const list = loadNotes()
    console.log(chalk.inverse('Suas notas'))
    list.forEach((note) => {
        console.log(chalk.bgBlue(note.title))
    });
    }

const readNotes = (title) => {
    const lista = loadNotes()
    
    lista.find((nota)=>{
        if(nota.title == title){
            console.log(chalk.bgBlue(nota.title))
            console.log(nota.body)
        }else{
            console.log(chalk.bgRed('Não foi possivel encontar esse titulo'))
        }
    })
}
const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)    
    } catch (e) {
        return []
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}