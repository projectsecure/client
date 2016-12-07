FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm install
RUN npm install webpack -g
RUN webpack -p /usr/src/app/

RUN ls
RUN ls /usr/src/app/

ENV NODE_ENV=production
ENV PORT=4000

CMD [ "node", "server.js" ]
EXPOSE 4000
