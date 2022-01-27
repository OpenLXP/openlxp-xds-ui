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
USER root
WORKDIR /app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN yarn build
USER node


# Production image, copy all the files and run next
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS runner
WORKDIR /app

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /usr/src/app/src/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
