// Requiring router
const router = require('express').Router();

// Require model
let Exercise = require('../models/exercise.model');

// If a GET request, we run this command and execute the find method which lists the exercises
router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// If we have '/add' and is a POST http request, execute the following
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    // Here we create a new exercise using the variables above
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });
    
    // Then we save the exercise to the database
    newExercise.save()
    .then(() => res.json('Exercise added!')) // Once saved
    .catch(err => res.status(400).json('Error: ' + err)); // If there's an error
});

// Object id created by MongoDB - put object id after '/' followed by a GET request, we will get the info from this exercise
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise)) // returns as JSON
    .catch(err => res.status(400).json('Error: ' + err)); 
});

// If the object ID is passed in and there is a DELETE request, it will find the exercise by the ID and delete it from the db.
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// If the route is '/update' and says POST we update the exercise by finding the correct ID associated to it
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        // We save the updates made to the exercise
        exercise.save()
        .then(() => res.json('Exercise updated!')) 
        .catch(err => res.status(400).json('Error: ' + err)); 
    });
})

module.exports = router;