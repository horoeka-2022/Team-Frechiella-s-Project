const express = require('express')
// // const { getAnimalData } = require('./utils')
// const { getElementData } = require('./utils')
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

// to choose introvert or extravert

router.get('/:element', async (req, res) => {
  const dataVibes = JSON.parse(await fs.readFile('vibes.json'))
  const vibes = dataVibes.vibes.filter(
    (vibe) => vibe.element === req.params.element
  )
  console.log({ vibes })
  try {
    res.render('2images', { vibes })
  } catch (error) {
    console.log('Whoops, there was an error')
  }
})

//to result page

// router should ideally say '/:elements/:name' where name is the name of animal

router.get('/:element/:vibes', async (req, res) => {
  const id = JSON.parse(await fs.readFile('data.json')).animals.filter(
    (animal) =>
      animal.type == req.params.element &&
      animal.personality == req.params.vibes
  )

  console.log('current vibe ID: ', req.params)
  try {
    res.render('result', id[0])
  } catch (error) {
    console.log('Whoops, there was an error')
  }
})
