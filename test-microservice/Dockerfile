########################################
# PRODUCTION
########################################
FROM node:10-alpine
MAINTAINER Josh Peak <josh.peak@cloudsense.com>
ENV INSTALL_PATH /usr/src/app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH 

# Everything needed to setup dependencies
COPY package.json .
RUN npm install --only=production


# COPY rest of code
# NOTE: .dockerignore file reduces the scope of what gets copied here
COPY . . 
RUN ls -lah 

EXPOSE 8080

# FUN FACT: DO NOT RUN ["npm", "start"] as the ENTRYPOINT
# It does not forward the SIGTERM and SIGINT events to Node
ENTRYPOINT [ "node", "app.js" ]
