// We grab the express router
const router = require('express').Router();

// We require the mongoose model
let User = require('../models/user.model');

// The first endpoint that handles HTTP GET requests on /users path
router.route('/').get((req, res) => {
    // Gets a list of all users from the db
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Second end point that handles HTTP POST requests
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    // We save the user to the db
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err)); 
});

module.exports = router;