FROM node:22.11-alpine AS base
WORKDIR /app
COPY .npmrc .
COPY package*.json ./

FROM base AS build
RUN npm ci --silent
COPY . .
RUN npm run build

FROM base AS dependencies
RUN npm ci --production --silent

FROM node:18-alpine AS final
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json .
ENV NODE_ENV=production
EXPOSE 9000
CMD ["node", "dist/src/main"]
