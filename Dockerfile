# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Set environment variables
ENV PORT=81

# Expose port 81
EXPOSE 81

# Start the app
CMD [ "npm", "start" ]
