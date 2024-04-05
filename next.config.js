const { createSecureHeaders } = require("next-secure-headers");

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // basePath: '/ecc-openlxp-xds-ui',

    // Adding policies:
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: createSecureHeaders({
                    contentSecurityPolicy: {
                        directives: {
                            defaultSrc: [
                                "'self'",
                                "https://ecc.staging.dso.mil",
                                "https://ecc.staging.dso.mil/ecc-openlxp-xds/"
                            ],
                            styleSrc: [
                                "'self'",
                                "https://ecc.staging.dso.mil", 
                                "https://fonts.googleapis.com"
                            ],
                            imgSrc: ["'self'",
                                    "data:",
                                    "data:*",
                                    "https://www.jcs.mil",
                                    "https://www.aetc.af.mil",
                                    "https://prod-discovery.edx-cdn.org",
                            ],
                            fontSrc: [
                                "'self'", 
                                "https://fonts.gstatic.com"
                            ],
                            frameAncestors: [
                                "'self'",
                                "https://ecc.staging.dso.mil"
                            ]
                        },
                        frameGuard: "deny",
                        noopen: "noopen",
                        nosniff: "nosniff",
                        xssProtection: "sanitize",
                        referrerPolicy: "origin-when-cross-origin",
                    }
                })
            },
        ];
    },
}

module.exports = nextConfig