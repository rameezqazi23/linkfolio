'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import PAGE from '@/models/Page'
import mongoose from 'mongoose'

const userPageAction = async (formData) => {
    mongoose.connect(process.env.CONNECT_MONGO_URI)
    const session = await getServerSession(authOptions)
    if (session) {
        const pageFormData = {
            displayName: formData.get('displayName'),
            location: formData.get('location'),
            bio: formData.get('bio')
        }
        const pageDoc = await PAGE.updateOne(
            {
                owner: session?.user?.email
            },
            {
                displayName: pageFormData.displayName,
                location: pageFormData.location,
                bio: pageFormData.bio
            })
        const data = JSON.parse(JSON.stringify(pageDoc))
        console.log('data==>', data)
        return data;
    }
    return false
}

export default userPageAction;
