module.exports = {

    basePath: '/ecc-openlxp-xds-ui',
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
                        value: "script-src 'self' https://ecc.staging.dso.mil; img-src 'self' data: https:; script-src-elem 'self'; font-src 'self' https://fonts.gstatic.com"
                    },
                ],
            },
        ];
    },
}
