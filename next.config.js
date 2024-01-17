/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '*.googleusercontent.com',
            },
            {
                hostname: 'linkfolio-webapp.s3.amazonaws.com'
            },
            {
                hostname: 'linkfolio-files.s3.amazonaws.com'
            }
        ],
    },
}

module.exports = nextConfig
