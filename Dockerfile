# Build Stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Receive the required build variable
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

# Copy dependency files and install them
COPY package*.json ./
RUN npm install
# Copy the rest of the source code and create a production build
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
# Copy artifacts generated in the build stage
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package*.json ./
# Install only production dependencies
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]

