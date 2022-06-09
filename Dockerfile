# Install dependencies only when needed
#FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS deps

# RUN apk add libc6-compat
#WORKDIR /app
#COPY package.json ./

# Rebuild the source code only when needed
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS builder
WORKDIR /app
COPY . .
#COPY --from=deps node_modules/ ./node_modules
#COPY /builds/$NAMESPACE/$PROJECT_NAME/node_modules/ ./node_modules
USER root
RUN yarn build

# Production image, copy all the files and run next
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
#COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/src/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
