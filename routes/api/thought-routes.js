const router = require('express').Router();
const {
    getThought,
    getThoughts,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require(`../../controllers/thoughtController`);


// /api/thoughts
router.route(`/`)
    .get(getThoughts)// GET to get all thoughts

router.route(`/:thoughtId`)
    .get(getThought)//GET to get a single thought by its _id
    .post(createThought)//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    .put(updateThought)//PUT to update a thought by its _id
    .delete(deleteThought);//DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
router.route(`/:thoughtId/reactions`)
    .post(createReaction)//POST to create a reaction stored in a single thought's reactions array field
    .delete(deleteReaction);//DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;