const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

// This is to overwrite into webpack without eject app
// to add the plugin for the json highligh
module.exports = function override(config, env) {
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ["json"],
    })
  );
  return config;
};
