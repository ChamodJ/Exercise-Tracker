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
    const date = new Date(req.body.date);

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
    exercise.findByIdAndDelete(req.params.id)
            .then(() => res.json('Exersice Deleted!'))
            .catch(err => res.status(400).json("Error: " + err))
});

router.route('/update/:id').post((req, res) => {
    exercise.findById(req.params.id)
            .then(exercise => {
                exercise.username = req.body.username;
                exercise.description = req.body.description;
                exercise.duration = Number(req.body.duration);
                exercise.date = Date.parse(req.body.date);
            
            exercise.save()
                    .then(() => res.json("Exercise Updated!"))
                    .catch(err => res.status(400).json("Error: "  + err))
            })
            .catch(err => res.status(400).json("Error: "  + err))
});

module.exports = router