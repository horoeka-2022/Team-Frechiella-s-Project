const express = require('express')
// const { getAnimalData } = require('./utils')
const { getElementData } = require('./utils')
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

router.get('/:elements', async (req, res) => {
  const elementID = JSON.parse(await fs.readFile('intext.json'))

  try {
    res.render('2images', elementID)
  } catch (error) {
    console.log('Whoops, there was an error')
  }
})

//to result page

router.get('/:elements/:id/data/:id', async (req, res) => {
  console.log(req.body)
  const id = JSON.parse(await fs.readFile('data.json')).animals.find(
    (animals) => animals.id === Number(req.params.id)
  )
  // console.log(id)
  try {
    res.render('result', id)
  } catch (error) {
    console.log('Whoops, there was an error')
  }
})
