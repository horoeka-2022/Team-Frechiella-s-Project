const express = require('express')
const { getAnimalData } = require('./utils')
const path = require('path')
const fs = require('node:fs/promises')

const router = express.Router()

module.exports = router

// root route
router.get('/', async (req, res) => {
  const elementData = await fs.readFile('elements.json')
  const element = JSON.parse(elementData)

  const viewData = {
    elements: element.elements,
  }
  try {
    res.render('home', viewData)
  } catch (err) {
    alert('Sorry, I can/t find an element')
  }
})

router.get('/elements/:id', async (req, res) => {
  const elementID = JSON.parse(await fs.readFile('intext.json')).vibes.find(
    (vibe) => vibe.id === Number(req.params.id)
  )
  try {
    // await getElementData().then((element) => {
    //   const id = elements.element.find(
    //     (element) => element.id === +req.params.id
    //   )
    res.render('2images', elementID)
  } catch (error) {
    console.log('Whoops, there was an error')
  }
})

// // Get animal data
// router.get('/:id', async (req, res) => {
//   try {
//     await getAnimalData().then((data) => {
//       const id = data.animals.find((animal) => animal.id === +req.params.id)
//       res.render('details', id)
//     })
//   } catch (error) {
//     console.log('Whoops, there was an error')
//   }
// })

// //edit animal data
// router.get('/:id/edit', async (req, res) => {
//   try {
//     await getAnimalData().then((data) => {
//       let id = data.animals.find((animal) => animal.id === +req.params.id)
//       res.render('edit', id)
//     })
//   } catch (error) {
//     console.log('Whoops, there was an error')
//   }
// })

// // Submit changes
// router.post('/:id/edit', async (req, res) => {
//   try {
//     const postedData = req.body

//     await getAnimalData().then(async (data) => {
//       const index = data.animals.findIndex(
//         (animal) => animal.id === +req.params.id
//       )

//       data.animals[index] = {
//         id: +req.params.id,
//         ...postedData,
//       }

//       const filepath = path.join(__dirname, 'data.json')
//       await fs.writeFile(filepath, JSON.stringify(data))
//       res.redirect(`/animals/${req.params.id}`)
//     })
//   } catch (error) {
//     console.log('Whoops, there was an error')
//   }
// })
