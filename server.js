const next = require("next");
const app = next({ dev: process.env.NODE_ENV === "development" });
const handler = app.getRequestHandler();

(async () => {
  await app.prepare().catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
})();

module.exports.handleHTTP = (req, res) => {
  const cookies = parseCookies(req);
  const magic_word = req.query.magic_word || cookies.magic_word;

  if (magic_word !== cookies.magic_word) {
    res.cookie("magic_word", magic_word);
  }
  if (magic_word !== process.env.MAGIC_WORD) {
    return res.status(401).send("Unauthorized");
  }

  handler(req, res);
};

function parseCookies(request) {
  const list = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
}
