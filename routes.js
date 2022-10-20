const express = require('express')
const { getAnimalData } = require('./utils')
const path = require('path')
const fs = require('node:fs/promises')

const router = express.Router()

module.exports = router

// Get animal data
router.get('/:id', async (req, res) => {
  try {
    await getAnimalData().then((data) => {
      const id = data.animals.find((animal) => animal.id === +req.params.id)
      res.render('details', id)
    })
  } catch (error) {
    console.log('Whoops, there was an error')
  }
})

//edit animal data
router.get('/:id/edit', async (req, res) => {
  try {
    await getAnimalData().then((data) => {
      let id = data.animals.find((animal) => animal.id === +req.params.id)
      res.render('edit', id)
    })
  } catch (error) {
    console.log('Whoops, there was an error')
  }
})

// Submit changes
router.post('/:id/edit', async (req, res) => {
  try {
    const postedData = req.body

    await getAnimalData().then(async (data) => {
      const index = data.animals.findIndex(
        (animal) => animal.id === +req.params.id
      )

      data.animals[index] = {
        id: +req.params.id,
        ...postedData,
      }

      const filepath = path.join(__dirname, 'data.json')
      await fs.writeFile(filepath, JSON.stringify(data))
      res.redirect(`/animals/${req.params.id}`)
    })
  } catch (error) {
    console.log('Whoops, there was an error')
  }
})
