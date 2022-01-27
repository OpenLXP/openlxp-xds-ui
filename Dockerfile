# Install dependencies only when needed

# FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS builder
# FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.13.2 AS builder
FROM node:16.13.2-alpine AS builder
WORKDIR /home/node
COPY --chown=node:node . .

RUN yarn install --production
RUN yarn build

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]

