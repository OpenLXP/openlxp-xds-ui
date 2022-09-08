# Install dependencies only when needed
#FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS deps

# RUN apk add libc6-compat
#WORKDIR /app
#COPY package.json ./

# Rebuild the source code only when needed
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.17.0 AS builder
USER root
WORKDIR /app
COPY . .
COPY node_modules ./node_modules
RUN yarn build
USER node

# Production image, copy all the files and run next
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.17.0 AS runner
USER node
WORKDIR /app

ENV NODE_ENV production

#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
#COPY --from=builder /app/next.config.js ./
#COPY --from=builder --chown=nextjs:nodejs /app/src/public ./public
#COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
#COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
#COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder /app/src/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER root
RUN mkdir /app/.next/cache/images
RUN chmod 777 /app/.next/cache/images
RUN chown -R node:node /app/.next/cache/images

#USER nextjs
USER node

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
