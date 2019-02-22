console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'title of note',
  demand: true,
  alias: 't'
};
const argv = yargs
  .command('add','Add a new note',{
    title: titleOptions,
    body: {
      describe: 'body of note',
      demand: true,
      alias: 'b'
    }
  })
  .command('list','list all notes')
  .command('read','read a note',{
    title: titleOptions
  })
  .command('remove','remove a note',{
    titleOptions
  })
  .help()
  .argv;
var command = argv._[0];
console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if(note){
    console.log('Note has been created');
    notes.logNote(note);
  } else{
    console.log('error : same notes title already exists');
  }
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note){
    console.log('Note Found');
    notes.logNote(note);
  } else{
    console.log('Note not Found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found'
  console.log(message);
} else {
  console.log('Command not recognized');
}
debugger;
