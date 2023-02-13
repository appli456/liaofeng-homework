FROM node

## Install dependencies in the root of the Container
COPY package.json yarn.lock ./
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm

# Add project files to /app route in Container
ADD . /packages

# Set working dir to /app
WORKDIR /packages

# expose port 3000
EXPOSE 3000
