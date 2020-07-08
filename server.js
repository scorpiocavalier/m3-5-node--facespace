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
  const user = users.find(user => user._id === id)
  let friends = []
  user.friends.forEach(friendId => {
    let friend = users.find(user => friendId === user._id)
    friends.push(friend)
  })
  res.render('pages/profile', { user, friends })
}

const handleSignin = (req, res) => {
  res.render('pages/signin')
}

const handleName = (req, res) => {
  const { firstName } = req.body
  const user = users.find(user => user.name === firstName)
  if(user !== undefined)
    res.status(200).redirect(`/users/${user._id}`)
  else
    res.status(404).render('pages/signin')
}

// --------------------------------------------------------------
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

  .listen(8000, () => console.log('Listening on port 8000'));
// --------------------------------------------------------------