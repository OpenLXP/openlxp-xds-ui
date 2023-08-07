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
                key: 'Content-Security-Policy',
                value:
                    "default-src 'self''unsafe-eval' 'unsafe-inline'; img-src * ; media-src *",
                },
                {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
                },
                {
                key: 'Referrer-Policy',
                value: 'origin-when-cross-origin',
                },
            ],
            },
        ];
    },   
}

module.exports = nextConfig