const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nick: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    modifiedAt: {
        type: Date,
        required: true
    },
    mustChangePass: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
    },

});

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('user', UserSchema);