exports.resolvableExtensions = () => [".ts", ".tsx", ".js", ".jsx"];

exports.onCreateWebpackConfig = (
  { stage, getConfig, rules, loaders, plugins, actions },
  { tslint }
) => {
  const config = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [loaders.js(), require.resolve("ts-loader")]
        }
      ]
    }
  };
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
  actions.setWebpackConfig(config);
};
