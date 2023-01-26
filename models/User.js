const { Schema, model } = require(`mongoose`);

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, `Please enter a valid email`]
        },
        thoughts:{
            type:Schema.Types.ObjectId,
            ref: `thought`
        },
        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual(`friendCount`).get(function(){
    if(this.friends==undefined) return 0;
    return this.friends.length;
});

const User = model(`user`, userSchema);

module.exports = User;