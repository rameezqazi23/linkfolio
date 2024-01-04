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
    },
    bgType: {
        type: String,
        default: 'color'
    },
    bgColor: {
        type: String,
        default: '#40862D'
    },
    bgImage: {
        type: String,
        default: ''
    },
    socialLinks: {
        type: Object,
        default: {}
    },
    userSocialLinks: {
        type: Object,
        default: []
    }
}, { timestamps: true })

const PAGE = mongoose.models?.pages || mongoose.model('pages', UserPageSchema)

export default PAGE;