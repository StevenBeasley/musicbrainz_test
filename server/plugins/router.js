const routes = [].concat(require("../routes/artist"));

module.exports = {
  plugin: {
    name: "router",
    register: (server, options) => {
      server.route(routes);
    }
  }
};
