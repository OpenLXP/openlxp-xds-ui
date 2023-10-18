const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: '/ecc-openlxp-xds-ui',
    images: {
        // Specify a custom loader to adjust the image URL
        loader: 'default', // or 'imgix' or 'cloudinary', depending on your configuration
        path: 'https://ecc.staging.dso.mil/ecc-openlxp-xds-ui/_next/static/media', // Your new base path
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