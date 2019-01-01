// Tell webpack it can resolve this file types
exports.resolvableExtensions = () => [".ts", ".tsx", ".js", ".jsx"];

exports.onCreateWebpackConfig = (
  {
    stage,
    getConfig,
    rules,
    loaders,
    plugins,
    actions /* destructured Object that gatsby provides  to plugins*/
  },
  { tslint /* destructured plugin options*/ }
) => {
  const config = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          // Feed the compiled ts files through babel
          use: [loaders.js(), require.resolve("ts-loader")]
        }
      ]
    }
  };
  // If typescript is enabled add it to the rules
  if (tslint) {
    const tslintRules = {
      test: /\.tsx?$/,
      enforce: "pre",
      exclude: /(node_modules|cache|public)/,
      use: [
        {
          loader: require.resolve("tslint-loader"),
          options: { emitErrors: stage === "build-javascript" }
        }
      ]
    };
    config.module.rules = [...config.module.rules, tslintRules];
  }
  // Merge the typescript config into the default webpack config
  actions.setWebpackConfig(config);
};
