
FROM node:18.20-alpine AS deps
USER root
WORKDIR /app
COPY package.json ./
RUN yarn install

FROM node:18.20-alpine AS builder
USER root
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:18.20-alpine AS runner
USER root
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/src/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.next/static/media /ecc-openlxp-xds-ui/.next/static/media/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
RUN mkdir /app/.next/cache/images
RUN chmod 777 /app/.next/cache/images
RUN chown -R node:node /app/.next/cache/images
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["yarn", "start"]