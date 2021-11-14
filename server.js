// require framework and instantiate
const fastify = require("fastify")({ logger: true });

// declare route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

// run
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
