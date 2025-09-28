# ---------- 1. Build Stage ----------
FROM node:current-alpine3.21 AS builder

WORKDIR /app

# Copy only the files needed to install deps
COPY package*.json ./

# Install dependencies (no devs in prod image)
RUN npm ci --omit=dev

# Copy rest of the source
COPY . .

# ---------- 2. Runtime Stage ----------
FROM node:current-alpine3.21

WORKDIR /app

# Copy built node_modules and source from builder
COPY --from=builder /app /app

# Ensure the container runs as a non-root user for security
RUN addgroup -S nodegrp && adduser -S nodeusr -G nodegrp
USER nodeusr

# Set NODE_ENV to production
ENV NODE_ENV=production

# Expose the port your Express app listens on
EXPOSE 3000

# Use a smaller command, avoids shell form
CMD ["node", "server.js"]
