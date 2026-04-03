/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "8gr6rls7z5.ufs.sh",
                pathname: "/f/**"
            }
        ]
    }
}

export default nextConfig
