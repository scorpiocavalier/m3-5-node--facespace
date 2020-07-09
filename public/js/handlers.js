const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.")
}

const handleHomepage = (req, res) => {
  res.status(200).render('pages/homepage', { users, currentUser })
}

const handleProfilePage = (req, res) => {
  const { id } = req.params
  const profileUser = users.find(user => user._id === id)
  const friends = users.filter(user => profileUser.friends.includes(friend._id))
  res.status(200).render('pages/profile', { profileUser, friends, currentUser })
}

const handleSignin = (req, res) => {
  if(Object.entries(currentUser).length === 0)
    res.status(200).render('pages/signin', { currentUser })
  else
    res.status(404).redirect('/')
}

const handleName = (req, res) => {
  const { firstName } = req.body
  const user = users.find(user => user.name.toLowerCase() === firstName.toLowerCase())
  if(user !== undefined) {
    currentUser = user
    res.status(200).redirect(`/users/${user._id}`)
  } else
    res.status(404).render('pages/signin', { currentUser })
}

module.exports = { 
  handleFourOhFour, handleHomepage, handleProfilePage, handleSignin, handleName 
}