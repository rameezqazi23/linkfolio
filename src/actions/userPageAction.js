'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import PAGE from '@/models/Page'
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

        // const pageFormData = {
        //     displayName: formData.get('displayName'),
        //     location: formData.get('location'),
        //     bio: formData.get('bio'),
        //     bgType: formData.get('bgType'),
        //     bgColor: formData.get('bgColor'),
        //     bgImage: formData.get('coverImage')
        // }
        const pageDoc = await PAGE.updateOne(
            { owner: session?.user?.email },

            pageFormData
            // {
            //     displayName: pageFormData.displayName,
            //     location: pageFormData.location,
            //     bio: pageFormData.bio,
            //     bgType: pageFormData.bgType,
            //     bgColor: pageFormData.bgColor,
            //     bgImage: pageFormData.bgImage,

            // }
        )
        const data = JSON.parse(JSON.stringify(pageDoc))
        console.log('data==>', data)
        return data;
    }
    return false
}

export default userPageAction;
