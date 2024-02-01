const router = require('express').Router();
const exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    exercise.find()
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date(req.body.date);

    const newExercise = new exercise({
        username,
        description,
        duration,
        date,
    })

    newExercise.save()
                .then(() => res.json('Exercise Succesfully Added!'))
                .catch(err => res.status(400).json("Error: " + err))
})


router.route('/:id').get((req, res) => {
    exercise.findById(req.params.id)
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json("Error : " + err))
});

router.route('/:id').delete((req, res) => {

})

module.exports = router