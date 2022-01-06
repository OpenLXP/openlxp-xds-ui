# Install dependencies only when needed
FROM openlxp/openlxp-nodejs-base-image:latest AS deps
COPY . .

RUN yarn build
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
