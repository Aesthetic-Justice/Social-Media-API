const { Schema, model } = require(`mongoose`);
const Reaction = require(`./Reaction`);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return date.toISOString().split("T")[0]
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

thoughtSchema.virtual(`reactionCount`).get(() => {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;