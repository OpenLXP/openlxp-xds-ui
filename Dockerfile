# Install dependencies only when needed
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS deps

# RUN apk add libc6-compat
WORKDIR /tmp
COPY package.json ./

# Rebuild the source code only when needed
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS builder
WORKDIR /tmp
COPY . .
#COPY --from=deps /app/node_modules ./node_modules


RUN yarn build


# Production image, copy all the files and run next
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS runner
WORKDIR /tmp

ENV NODE_ENV production

#RUN addgroup -g 1001 -S nodejs

# You only need to copy next.config.js if you are NOT using the default configuration
#COPY --from=builder /tmp/next.config.js ./
USER nextjs
COPY --from=builder /tmp/src/public ./public
COPY --from=builder --chown=nextjs:nodejs /tmp/.next ./.next
COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /tmp/package.json ./package.json

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
