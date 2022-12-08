const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      alias: {
        "@components": path.join(process.cwd(), "src", "components"),
        "@assets": path.join(process.cwd(), "src", "assets"),
        "@views": path.join(process.cwd(), "src", "views"),
        "@helpers": path.join(process.cwd(), "src", "helpers"),
      },
    },
  },

  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === "production" ? "/admin" : "/",
  productionSourceMap: !process.env.NODE_ENV === "production",
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Top Gun Archívum";
      return args;
    }),
      config.optimization.minimizer("terser").tap((args) => {
        args[0].terserOptions.output = {
          ...args[0].terserOptions.output,
          comments: false, // exclude all comments from output
        };
        return args;
      });
  },
});
