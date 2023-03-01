FROM node

## Install dependencies in the root of the Container
COPY package.json lerna.json ./
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

# Set working dir to /app
WORKDIR .
# Add project files to /app route in Container
ADD . .

RUN rm -rf node_modules
RUN npx lerna bootstrap

EXPOSE 5173

CMD ["npm", "run", "build"]

