/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: "res.cloudinary.com",
                pathname: '/**'
            },
            {
                protocol: 'http',
                hostname: "res.cloudinary.com",
                pathname: '/**'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5175',
                pathname: '/**',
              },
              {
                protocol: 'http',
                hostname: 'localhost',
                port: '5173',
              },
        ]
    }
};

export default nextConfig;