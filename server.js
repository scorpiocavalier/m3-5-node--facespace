'use strict'

const express = require('express')
const morgan = require('morgan')

const { users } = require('./data/users')
const { 
  handleName, handleProfilePage,
  handleSignin, handleHomepage,
  handleFourOhFour
} = require('./public/js/handlers')

let currentUser = {}

express()
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  .post('/getname', handleName)

  .get('/users/:id', handleProfilePage)

  .get('/signin', handleSignin)

  .get('/', handleHomepage)

  .get('*', handleFourOhFour)

  .listen(8000, () => console.log('Listening on port 8000'))