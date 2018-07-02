########################################
# PRODUCTION
########################################
FROM node:10-alpine
MAINTAINER Josh Peak <josh.peak@cloudsense.com>
ENV INSTALL_PATH /usr/src/app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH 

# REQUIRED BUILD ARG
# docker build --build-arg "NPM_TOKEN_ARG=$NPM_TOKEN" .
ARG NPM_TOKEN_ARG
ENV NPM_TOKEN=$NPM_TOKEN_ARG
RUN echo "$NPM_TOKEN_ARG"
RUN echo "$NPM_TOKEN"

# Everything needed to setup dependencies
COPY .npmrc .
COPY package.json .
RUN npm install 


# RUN ls -lah ./dist/
# COPY rest of code
# NOTE: .dockerignore file reduces the scope of what gets copied here
COPY . . 
RUN ls -lah
RUN npm run ts-build
RUN npm run copy-config
RUN ls -lah dist/


EXPOSE 8888

# FUN FACT: DO NOT RUN ["npm", "start"] as the ENTRYPOINT
# It does not forward the SIGTERM and SIGINT events to Node

# Interpretted ts-node Entrypoint option
# ENTRYPOINT [ "./node_modules/.bin/ts-node", "src/server.ts" ]

# PRODUCTION Node Entrypoint
# ENTRYPOINT [ "node", "dist/server.js" ]

# Requires dev dependency source-map-support to produce source mapped stack traces
ENTRYPOINT [ "node", "-r", "source-map-support/register", "dist/server.js" ]
