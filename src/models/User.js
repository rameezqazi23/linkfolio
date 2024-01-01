const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String
    },
    emailVerified: {
        type: Date
    }
}, { timestamps: true })

const USER = mongoose.models?.users || mongoose.model('users', UserSchema)

export default USER;