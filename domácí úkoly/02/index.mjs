// 4IT573 Základy Node.js
// 2. úkol

import fs from 'fs'


const instructions = "instrukce.txt"

// read instructions and get file names
fs.readFile(instructions, (errInstr, dataInstr) => {
  if (errInstr) {
    console.error("Nastal problém, více informací:\n" + errInstr.message)
  } else {
    let fileNames = dataInstr.toString().split(" ");
    copyTextFileToFile(fileNames[0], fileNames[1])
  }
})

const copyTextFileToFile = (input, output) => {
  fs.readFile(input, (errIn, dataIn) => {
    if (errIn) {
      console.error("Nastal problém, více informací:\n" + errIn.message)
    } else {
      fs.writeFile(output, dataIn.toString(), (err) => {
        if (err) {
          console.error("Nastal problém, více informací:\n" + err.message)
        }
      })
    }
  })
}