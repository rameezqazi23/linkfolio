import mongoose from "mongoose";
const UserPageSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
        min: 1,
        unique: true,
    }
}, { timestamps: true })

const PAGE = mongoose.models?.pages || mongoose.model('pages', UserPageSchema)

export default PAGE;