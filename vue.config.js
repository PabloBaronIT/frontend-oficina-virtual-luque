const { defineConfig } = require("@vue/cli-service");
module.exports = {
transpileDependencies: true,
  publicPath: "/",
  outputDir:'dist',
  assetsDir:'static',
  configureWebpack: {
    performance: {
      maxEntrypointSize: 99900000, // Tamaño máximo para el punto de entrada (bytes)
      maxAssetSize: 99900000, // Tamaño máximo para un solo archivo (bytes)
    },
  },
};
