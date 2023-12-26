'use server';
import PAGE from "@/models/Page";
import mongoose from "mongoose";

const handleFormSubmit = async (formData) => {
    console.log("FormData==>", formData.get('username'))
    const username = formData.get('username')
    mongoose.connect(process.env.CONNECT_MONGO_URI)
    const pageDoc = await PAGE.create({
        uri: username
    })
    const data = JSON.parse(JSON.stringify(pageDoc)) 
    console.log("pageDoc==>", data)
    return data;

}

export default handleFormSubmit;