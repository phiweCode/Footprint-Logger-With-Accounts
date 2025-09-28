# ── Stage 1: Build ──────────────────────────────────────────
FROM node:current-alpine3.21 AS build

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci

# copy the rest of the source and build
COPY . .
RUN npm run build

# ── Stage 2: Serve placeholder (optional) ───────────────────
# We only keep the build output. No server is started here.
FROM alpine:3.19 AS artifact

# create a non-root folder to hold the built site
WORKDIR /site
COPY --from=build /app/dist .

# default command just shows what's inside (handy for testing)
CMD ["ls", "-l"]
