const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: '/ecc-openlxp-xds-ui',
    assetPrefix: '/ecc-openlxp-xds-ui/', // Set this to your basePath
    images: {
        loader: 'imgix', // You can use 'imgix', 'cloudinary', or 'custom' as per your requirements.
        path: '/',
    },
    
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
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig