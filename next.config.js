/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "images.unsplash.com",
                protocol: "https"
            },
            {
                hostname: "www.zaharaholidays.com",
                protocol: "https"
            },
            {
                hostname: "directus-production-63bd.up.railway.app",
                protocol: "https"
            }
    ]
    }
}

module.exports = nextConfig
