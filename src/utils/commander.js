const { program } = require('commander')

program
    .option('--development <boolean>', 'Set the development config', 'false')
    .option('--fileSystem <boolean>', 'Change the persistence system to FS', 'false')

program.parse()

const options = program.opts()

console.log(options)

module.exports = {options}