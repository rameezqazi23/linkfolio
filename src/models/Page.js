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
    }
}, { timestamps: true })

const PAGE = mongoose.models?.pages || mongoose.model('pages', UserPageSchema)

export default PAGE;