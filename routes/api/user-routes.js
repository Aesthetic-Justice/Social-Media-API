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
router.route(`/`)
    .get(getUsers)//GET all users
    .post(createUser);//POST a new user:

router.route(`/:userId`)
    .get(getUser)//GET a single user by its _id and populated thought and friend data
    .put(updateUser)//PUT to update a user by its _id
    .delete(deleteUser);//DELETE to remove user by its _id

// /api/users/:userId/friends/:friendId
router.route(`/:userId/friends/:friendId`)
    .post(addFriend)//POST to add a new friend to a user's friend list
    .delete(deleteFriend);//DELETE to remove a friend from a user's friend list

module.exports = router;