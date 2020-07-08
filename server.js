'use strict';

const express = require('express');
const morgan = require('morgan');

const { users } = require('./data/users');

let currentUser = {};

// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

const handleHomepage = (req, res) => {
  res.status(200).render('pages/homepage', { users })
}

const handleProfilePage = (req, res) => {
  const { id } = req.params
  const user = users.filter(user => user._id === id)[0]
  let friends = []
  user.friends.forEach(friendId => {
    let friend = users.filter(user => friendId === user._id)[0]
    friends.push(friend)
  })
  res.render('pages/profile', { user, friends })
}

// --------------------------------------------------------------
express()
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  .get('/users/:id', handleProfilePage)

  .get('/', handleHomepage)

  .get('*', handleFourOhFour)

  .listen(8000, () => console.log('Listening on port 8000'));
// --------------------------------------------------------------