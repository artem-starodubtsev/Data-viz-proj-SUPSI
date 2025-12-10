FROM node:20-alpine

# Set a root workdir
WORKDIR /app

# Copy only package files first for better layer caching
COPY placeholder-page-main/package*.json ./placeholder-page-main/

# Install deps in that subfolder
WORKDIR /app/placeholder-page-main
RUN npm install

# Now copy the rest of the app
COPY placeholder-page-main ./

# Vite default port
EXPOSE 5173

# Run dev server accessible outside container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
