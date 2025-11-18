FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependency
RUN npm ci --only=production

# Copy core file
COPY server.js .

EXPOSE 22223

CMD ["npm", "start"]
