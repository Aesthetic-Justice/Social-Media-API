const { User, Thought } = require(`../models`);

module.exports = {
    getUsersAll(req, res){
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getUsersSingle(req, res){
        User.findOne({ _id: req.params.userId})
            .select(`-__v`)
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with matching ID found.`})
                    : res.json(user)
                    )
                    .catch((err) => res.status(500).json(err));
    },
    createUser(req,res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req,res){
        User.findOneAndUpdate({ _id: req.params.userId},req.body)
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with matching ID found.`})
                    : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res){
        User.findOneAndDelete({ _id: req.params.userId})
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with matching ID found.`})
                    : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: `User and associated thoughts deleted`}))
            .catch((err) => res.status(500).json(err));
    }
};