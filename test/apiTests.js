const Lab = require("@hapi/lab");
const Code = require("@hapi/code");
const lab = (exports.lab = Lab.script());
const createServer = require("../server");

lab.experiment("API test", () => {
  let server;

  // Create server before each test
  lab.before(async () => {
    server = await createServer();
  });

  lab.test("GET / artist route works", async () => {
    const options = {
      method: "GET",
      url: "/artist/queen"
    };

    const response = await server.inject(options);
    Code.expect(response.statusCode).to.equal(200);
    //Code.expect(response.result).to.equal({ hello: "world" });
  });

  lab.test("GET /  has a 404", async () => {
    const options = {
      method: "GET",
      url: "/artist/"
    };

    const response = await server.inject(options);
    Code.expect(response.statusCode).to.equal(404);
    //Code.expect(response.result).to.equal({ hello: "world" });
  });

  lab.test("POST / artist route fails with invalid payload", async () => {
    const options = {
      method: "POST",
      url: "/artist",
      payload: {
        blartist: "queen"
      }
    };

    const response = await server.inject(options);
    Code.expect(response.statusCode).to.equal(400);
  });

  lab.test("POST / artist route works with valid payload", async () => {
    const options = {
      method: "POST",
      url: "/artist",
      payload: {
        artist: "queen"
      }
    };

    const response = await server.inject(options);
    Code.expect(response.statusCode).to.equal(200);
    //Code.expect(response.result).to.equal({ hello: "world" });
  });

  lab.test(
    "POST / artist fails if artist is not more than 1 character",
    async () => {
      const options = {
        method: "POST",
        url: "/artist",
        payload: {
          artist: "a"
        }
      };

      const response = await server.inject(options);
      Code.expect(response.statusCode).to.equal(400);
      //Code.expect(response.result).to.equal({ hello: "world" });
    }
  );
});
