require('webpack');
const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Build entries by scanning for all index.ts files recursively under src
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
      },
      {
        // Process SCSS files
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", 
          "sass-loader"
        ],
      },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/fonts"),
          to: path.resolve(__dirname, "lib/fonts"),
        },
        {
          from: path.resolve(__dirname, "src/static"),
          to: path.resolve(__dirname, "lib/static"),
        },
      ],
    }),
  ],
};
