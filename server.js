const express = require('express')
const hbs = require('express-handlebars')
const { getAnimalData } = require('./utils')
const routes = require('./routes')

const server = express()

module.exports = server

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
// server.get('/', async (req, res) => {
//   const data = await getAnimalData()

//   res.render('home', data)
// })

server.use('/', routes)
