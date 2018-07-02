# Docker Ready

This framework is intended to facilitate NodeJS integration testing where a microservice 
requires other resources such as MongoDB, PostgreSQL, RabbitMQ, ElasticSearch etc
to have started up but also await these dependent services to accept commands
before starting testing.

----

# Usage

## Ingredients

**`Dockerfile`** -  Normal development will require you to have a `Dockerfile` to build your 
microservice. 
**`.dockerignore`** - This isn't important for using `docker-ready` but it can significantly impact
build times of your docker image if it is copying files unnecessarily to your image.
**`docker-compose.yml`** - You will also have a `docker-compose.yml` file to describe 
the topology of dependent services your integration depends upon.

## Recipe

`test/fixture.js`

```javascript
const DockerReady = require('docker-ready');
const path = require('path');
const fixture = new DockerReady();

before(async function(){
  // Any error thrown prevents testing from continuing
  // Which meant the fixtures failed to be setup

  // #1 Start up and detach from docker-compose
  await fixture.runProcess('docker-compose up --build --detach');

  // #2 Get the port numbers that were assigned
  const dockerComposeProjectName = path.basename(process.cwd());
  const containers = await fixture.getComposedContainers(dockerComposeProjectName);
  
  // #3 Compose the final service URLs
  const serviceUrls = containers.map(container => {
    // Rummage through the returned containers and mapped ports 
  });

  // #4 Await for each service Url handler to start accepting commands or 
  // throw an error on timeout
  await fixture.allReadyYet(serviceUrls);
});

after(async function(){
  await fixture.runProcess('docker-compose down');
})
```

----

# Extending

----

# Testing

----

# Resources
