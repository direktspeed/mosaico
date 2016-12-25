var ssr = require('done-ssr-middleware');

module.exports = ssr({
  config: __dirname + "/package.json!npm",
  main: "mosaico/index.stache!done-autorender",
  liveReload: true
});
