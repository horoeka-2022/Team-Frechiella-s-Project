const path = require('path')
const fs = require('node:fs/promises')

async function getElementData() {
  try {
    const filepath = path.join(__dirname, 'intext.json')
    return fs.readFile(filepath).then((intext) => JSON.parse(intext))
  } catch (err) {
    console.log('Whoops! Something went wrong')
  }
}

// async function getAnimalData() {
//   try {
//     const filepath = path.join(__dirname, 'data.json')
//     return fs.readFile(filepath).then((data) => JSON.parse(data))
//   } catch (err) {
//     console.log('Whoops! Something went wrong')
//   }
// }

module.exports = {
  getElementData,
}
