# Install dependencies only when needed
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS deps

# RUN apk add libc6-compat
# give the directory read/write permissions
# Set user as root
USER root
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
USER node

# Rebuild the source code only when needed
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules


RUN yarn build


# Production image, copy all the files and run next
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /usr/src/app/src/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
