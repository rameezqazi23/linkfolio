import mongoose from "mongoose";
const UserPageSchema = mongoose.Schema({
    uri: {
        type: String,
        required: true,
        min: 1,
        unique: true,
    },
    owner: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const PAGE = mongoose.models?.pages || mongoose.model('pages', UserPageSchema)

export default PAGE;