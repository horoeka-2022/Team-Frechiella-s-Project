const path = require('path')
const fs = require('node:fs/promises')

async function getPuppyData() {
  try {
    const filepath = path.join(__dirname, 'data.json')
    return fs.readFile(filepath).then((data) => JSON.parse(data))
  } catch (err) {
    console.log('Whoops! Something went wrong')
  }
}

module.exports = {
  getPuppyData,
}