import EVENT from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.CONNECT_MONGO_URI)
    const url = new URL(req.url)
    const reqUrl = atob(url.searchParams.get('url'))
    const userUri = url.searchParams.get('page')
    console.log("Request url", reqUrl)
    console.log("Request url", userUri)

    await EVENT.create({
        type: 'click',
        uri: reqUrl,
        page: userUri,
    })
    return Response.json(true)
}