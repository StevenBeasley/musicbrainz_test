const hapi = require("@hapi/hapi");
const config = require("./config");

const vision = require("vision");
const inert = require("inert");

async function createServer() {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  });

  // Register the plugins
  await server.register(require("./plugins/router"));
  await server.register(require("./plugins/log-errors"));
  await server.register(require("./plugins/logging"));
  await server.register([inert, vision]);
  await server.register(require("blipp"));

  return server;
}

module.exports = createServer;
