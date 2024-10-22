# Use an official Node.js runtime as the base image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app with a lightweight HTTP Server
FROM nginx:alpine

# Copy the build output from the previous stage into the nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
