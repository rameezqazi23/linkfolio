import EVENT from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.CONNECT_MONGO_URI)
    const url = new URL(req.url)
    const reqUrl = atob(url.searchParams.get('url'))
    console.log("Request url", reqUrl)
    await EVENT.create({
        type: 'click',
        uri: reqUrl
    })
    return Response.json(true)
}