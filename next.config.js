require('dotenv').config();

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // Adding policies:
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: process.env.CSP_HEADERS,
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig