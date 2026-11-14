FROM node:20-alpine

WORKDIR /app

# сначала только package.json, чтобы npm ci кэшировался
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

EXPOSE 3000
CMD ["node", "src/server.js"]
