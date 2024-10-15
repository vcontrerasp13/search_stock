/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://192.168.0.244:8060/api/:path*', // Reemplaza con la URL de tu API
            },
        ];
    },
};

export default nextConfig;
