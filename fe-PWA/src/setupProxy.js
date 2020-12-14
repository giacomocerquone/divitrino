const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const proxy = createProxyMiddleware({
    target: "http://localhost:9000/",
    pathRewrite: {
      "^/\\.netlify/functions": "",
    },
  });

  app.use("/.netlify/functions", proxy);
};
