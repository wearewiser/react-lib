require('webpack');
const path = require('path');
const glob = require("glob");

const entries = {};
glob.sync("./src/**/index.ts").forEach(file => {
  const entry_key = file.replace(/^\.\/src\//, "").replace(/\.ts$/, "");
  entries[entry_key] = file;
});

module.exports = {
  mode: "production",
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  target: "web",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: false
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: path.dirname(require.resolve("react/package.json")),
      "react-dom": path.dirname(require.resolve("react-dom/package.json")),
    },
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "react/jsx-runtime": "react/jsx-runtime",
  },
};
