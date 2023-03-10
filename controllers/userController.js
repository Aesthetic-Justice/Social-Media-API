const { User, Thought } = require(`../models/index`);

module.exports = {
    getUsers(req, res) {
        User.find((err, users) =>{
            if(err) res.status(500).json(err);
            res.json(users)
        });
    },
    getUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with matching ID found.` })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with matching ID found.` })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId },)
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with matching ID found.` })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } }))
            .then(() => res.json({ message: `User and associated thoughts deleted successfully` }))
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with matching ID found.` })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with matching ID found.` })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    }
};