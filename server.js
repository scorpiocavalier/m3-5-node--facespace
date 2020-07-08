'use strict';

const express = require('express');
const morgan = require('morgan');

const { users } = require('./data/users');

let currentUser = {};

// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

// --------------------------------------------------------------
express()
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  .get('/', (req, res) => {
    res.render('pages/homepage')
  })

  .get('*', handleFourOhFour)

  .listen(8000, () => console.log('Listening on port 8000'));
// --------------------------------------------------------------