#============================
# Download stage
#============================
FROM node:14.18.1-alpine as dependencies
# Setting the working dir
WORKDIR /usr/app
# Grabbing the package.json and if one exists the yarn.lock
COPY ./package*.json yarn.lock ./
# Install the dependencies
RUN yarn


#==============================
# Builder stage
#==============================
# Rebuilds the source code only when needed
FROM node:14.18.1-alpine as builder
# Mirroring the work dir from dependencies
WORKDIR /usr/app
# Copy the entire src dir
COPY ./ ./
# Copy node_modules from the dependencies build stage
COPY --from=dependencies /usr/app/node_modules ./node_modules
# Build the app
RUN yarn build

#===============================
# Produciton image
#===============================
# Copy all the files from the build stage
FROM node:14.18.1-alpine as production
WORKDIR /usr/app
# Setting the env var for production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
# install the process manager
RUN npm install --global pm2
# Copy the build files from the build stage
COPY --from=builder /usr/app/public ./public
COPY --from=builder --chown=nextjs:node /usr/app/.next ./.next
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package.json ./package.json
EXPOSE 3000
# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]
