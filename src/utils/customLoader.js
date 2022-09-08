
export function myDefaultLoader({ config , src , width , quality  }) {
    if (process.env.NODE_ENV !== 'production') {
        const missingValues = [];
        // these should always be provided but make sure they are
        if (!src) missingValues.push('src');
        if (!width) missingValues.push('width');
        if (missingValues.length > 0) {
            throw new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
                src,
                width,
                quality
            })}`);
        }
        if (src.startsWith('//')) {
            throw new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`);
        }
        if (!src.startsWith('/') && config.domains) {
            let parsedSrc;
            try {
                parsedSrc = new URL(src);
            } catch (err) {
                console.error(err);
                throw new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`);
            }
            if (process.env.NODE_ENV !== 'test' && !config.domains.includes(parsedSrc.hostname)) {
                throw new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`);
            }
        }
    }
    if (src.endsWith('.svg') && !config.dangerouslyAllowSVG) {
        // Special case to make svg serve as-is to avoid proxying
        // through the built-in Image Optimization API.
        return src;
    }
    return `${config.path}?url=${encodeURIComponent(src.replace("/ecc-openlxp-xds-ui/", "/"))}&w=${width}&q=${quality || 75}`;
}