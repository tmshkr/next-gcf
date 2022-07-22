const next = require("next");
const app = next({ dev: process.env.NODE_ENV === "development" });
const handler = app.getRequestHandler();

(async () => {
  await app.prepare().catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
})();

module.exports.handleHTTP = handler;
