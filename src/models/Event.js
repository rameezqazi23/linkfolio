import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    type: String,
    uri: String,
}, { timestamps: true })

const EVENT = mongoose.models?.events || mongoose.model('events', EventSchema)

export default EVENT;