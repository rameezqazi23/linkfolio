'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import PAGE from '@/models/Page'
import USER from '@/models/User'
import mongoose from 'mongoose'

const userPageAction = async (formData) => {
    mongoose.connect(process.env.CONNECT_MONGO_URI)
    const session = await getServerSession(authOptions)

    if (session) {
        const formDataKeys = ['displayName', 'location', 'bio', 'bgType', 'bgColor', 'bgImage']
        const pageFormData = {}

        for (const key of formDataKeys) {
            if (formData.has(key)) {
                pageFormData[key] = formData.get(key)
            }
        }

        const pageDoc = await PAGE.updateOne(
            { owner: session?.user?.email },
            pageFormData
        )

        if (formData.has('profileImage')) {
            const userProfileImage = formData.get('profileImage')
            await USER.updateOne(
                { email: session?.user?.email },
                { image: userProfileImage }
            )

        }


        const data = JSON.parse(JSON.stringify(pageDoc))
        console.log('data==>', data)
        return data;

    }


    return false
}

export default userPageAction;
