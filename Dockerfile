# Install dependencies only when needed
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS builder
WORKDIR /project

# Set user as root
USER root

# Copy over the requirements file
COPY package.json ./
# Copy over the project
COPY . .
RUN yarn

# build the project
RUN yarn build


# Set the user node
USER node

# # Rebuild the source code only when needed
# FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS builder
# USER root
# WORKDIR /app
# COPY . .
# COPY --from=deps /usr/src/app/node_modules ./node_modules
# RUN yarn build
# USER node


# Production image, copy all the files and run next
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS runner
WORKDIR /app

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder project/src/public ./public
COPY --from=builder --chown=nextjs:nodejs project/.next ./.next
COPY --from=builder project/node_modules ./node_modules
COPY --from=builder project/package.json ./package.json

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
