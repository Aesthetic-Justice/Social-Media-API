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
// GET to get all thoughts
router.route(`/`).get(getThought);

//GET to get a single thought by its _id
router.route(`/:thoughtId`).get(getThoughts);

//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route(`/`).post(createThought);

//PUT to update a thought by its _id
router.route(`/:thoughtId`).put(updateThought);

//DELETE to remove a thought by its _id
router.route(`/:thoughtId`).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
//POST to create a reaction stored in a single thought's reactions array field
router.route(`/:thoughtId/reactions/:reactionId`).post(createReaction);

//DELETE to pull and remove a reaction by the reaction's reactionId value
router.route(`/:thoughtId/reactions/:reactionId`).delete(deleteReaction);

module.exports = router;