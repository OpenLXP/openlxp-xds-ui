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
                        // value: "script-src 'self' 3.145.42.127:* ; img-src 'self' data: https:; script-src-elem 'self'; font-src 'self' https://fonts.gstatic.com",
                        value: "script-src 'self' https://unpkg.com https://ecc.staging.dso.mil https://ecc.staging.dso.mil/; img-src 'self' data: https: https://unpkg.com https://ecc.staging.dso.mil; "
                    },

                ],
            },
        ];
    },
}

module.exports = nextConfig

