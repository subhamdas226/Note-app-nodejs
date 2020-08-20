const notes = require('./notes.js')
const validator = require('validator')
const chalk  = require('chalk')
const yargs = require('yargs')
const { argv } = require('yargs')
// const fs = require('fs');
// const ut = require('./utils')
// const add =ut.sum(15,89);
// console.log(add);
// fs.writeFileSync('notes.txt',"Hey dude, My name is Subham Das.");//fs node inbuilt
// fs.appendFileSync('notes.txt'," I live in New Delhi")
//const msg = getNotes();
//console.log(msg)
console.log('Email id is : ',validator.isEmail('das@gmail.com')) //validator
console.log(chalk.bgGreen.yellow.bold('  Success ! ')); //chalk

// Customize yargs version
yargs.version('1.1.0')

// //create add command
// yargs.command({
//     command: 'add',
//     describe: 'Add a new note',
//     handler: function () {
//         console.log('Adding a new note!')
//     }
// })
yargs.command({
    command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
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
        handler: function (argv) {         
            console.log('Title: ' + argv.title)         
            console.log('Body: ' + argv.body) 
            notes.addNotes(argv.title,argv.body);

        } 
    }) 

// //create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'         
            },         
        // body: {             
        //     describe: 'Note body',             
        //     demandOption: true,             
        //     type: 'string'         
        // }     
    },
    // handler: function () {
    //     console.log('Removing a new note!')
    // }
    handler: function (argv) {    //ordinary function
        console.log('Removing a new note!')     
        console.log('Title: ' + argv.title)         
        //console.log('Body: ' + argv.body) 
        notes.removeNotes(argv.title);

    } 
})

// //create Read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {         //function as in ES6
        console.log('Reading a new note!')
        notes.readNotes(argv.title);
    }
})

// //create List command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: function () {
        console.log('Listing a notes!')
        notes.listNotes();
    }
})
//console.log(process.argv) // printing index element in console
//console.log(yargs.argv) //  do same thing but in customize manner by objects and array
yargs.parse() // parse or run the command