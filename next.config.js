module.exports = {

    basePath: '/ecc-openlxp-xds-ui',
    reactStrictMode: true,
    swcMinify: true,
    // Adding policies:
    // Adding comment here to test verified signature... one more time
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
                ],
            },
        ];
    },
}
