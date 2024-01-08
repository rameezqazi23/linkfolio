import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    type: {          //click or view type
        type: String
    },
    page: {   //uri type username uri or social link
        type: String
    },
    uri: {          //uri type username uri or social link
        type: String
    },
}, { timestamps: true })

const EVENT = mongoose.models?.events || mongoose.model('events', EventSchema)

export default EVENT;