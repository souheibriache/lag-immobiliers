# Simple Dockerfile for Next.js Development
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose the development port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]