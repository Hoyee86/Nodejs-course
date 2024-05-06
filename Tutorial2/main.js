const fs = require('fs');
const path = require('path')

// fs.readFile('./files/open.txt',  'utf8', (err, data) =>{
//     if (err) throw err;
//     console.log(data)
// })

// fs.readFile(path.join(__dirname, "files", "open.txt"),  'utf8', (err, data) =>{
//     if (err) throw err;
//     console.log(data)
// })

fs.writeFile(path.join(__dirname, "files", "late.txt"), 'Omo we always late during Team lead class the guy get problem', (err, data) =>{
    if (err) throw err;
    console.log('data')
})

fs.appendFile(path.join(__dirname, "files", "late.txt"), '\n\nGuys remain async put your mind together', (err, data) =>{
    if (err) throw err;
    console.log('follow follow')
})

// fs.appendFile(path.join(__dirname, "files", "open.txt"), '\n\n\nClosing period please', (err, data) =>{
//     if (err) throw err;
//     console.log('append text')
// })

// fs.rename(path.join(__dirname, "files", "open.txt"), path.join(__dirname, "files", "gig.txt"), (err, data) =>{
//     if (err) throw err;
//     console.log('name change')
// })

console.log('Zainab')

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error :${err}`)
    process.exit(1)
})