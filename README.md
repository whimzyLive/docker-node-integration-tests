# Test Docker node

Test project to demonstrate docker based integration testing in node

## Installing

`npm install`

## Running Tests

`npm run test`

This will bring up stripe docker container and will perform get request against container mapped port.

Notes:

- also because, `container.stop` is added in `after all`, ot will also cleanup all created containers

- testcontainers uses `dockernode` under the hood, which allows it to access all docker exposed APIs without having to go through `docker cli` or `docker compose`
