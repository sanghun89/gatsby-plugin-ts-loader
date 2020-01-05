// Tell webpack it can resolve this file types
exports.resolvableExtensions = () => [".ts", ".tsx", ".js", ".jsx"];

exports.onCreateWebpackConfig = (
  {
    loaders,
    actions /* destructured Object that gatsby provides  to plugins*/
  }
) => {
  const config = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          // Feed the compiled ts files through babel
          use: [loaders.js(), {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                sourceMap: process.env.NODE_ENV !== 'production',
                noEmit: false
              }
            }
          }],
        }
      ]
    }
  };
  // Merge the typescript config into the default webpack config
  actions.setWebpackConfig(config);
};
