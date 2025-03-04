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
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[local]_[hash:base64:5]",
              },
              esModule: false,
            },
          },
          "sass-loader"
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        },
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: path.dirname(require.resolve("react/package.json")),
      "react-dom": path.dirname(require.resolve("react-dom/package.json")),
      "@": path.resolve(__dirname, "src"),
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