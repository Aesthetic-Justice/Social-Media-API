const router = require('express').Router();
const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require(`../../controllers/userController`);

// /api/users
//GET all users
router.route(`/`).get(getUsers);

//GET a single user by its _id and populated thought and friend data
router.route(`/:userId`).get(getUser);

//POST a new user:
router.route(`/`).post(createUser);

//PUT to update a user by its _id
router.route(`/:userId`).put(updateUser);

//DELETE to remove user by its _id
router.route(`/:userId`).delete(deleteUser);

// /api/users/:userId/friends/:friendId
//POST to add a new friend to a user's friend list
router.route(`/:userId/friends/:friendId`).post(addFriend);

//DELETE to remove a friend from a user's friend list
router.route(`/:userId/friends/:friendId`).delete(deleteFriend);

module.exports = router;