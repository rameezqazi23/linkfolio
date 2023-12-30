'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import PAGE from "@/models/Page";
import mongoose from "mongoose";

const getUsername = async (formData) => {

    mongoose.connect(process.env.CONNECT_MONGO_URI)

    console.log("FormData==>", formData.get('username'))
    const username = formData.get('username')
    const checkUsernameDuplication = await PAGE.findOne({ uri: username })

    if (checkUsernameDuplication) {
        return false
    } else {
        const session = await getServerSession(authOptions)
        const pageDoc = await PAGE.create({
            uri: username,
            owner: session?.user?.email,

        })
        const data = JSON.parse(JSON.stringify(pageDoc))
        console.log("pageDoc==>", data)
        return data;

    }

}

export default getUsername;