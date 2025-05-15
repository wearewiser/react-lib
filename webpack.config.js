const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");

const PKG_NAME = "{{pkg}}";

function entries(match, exclude) {
  const entries = {};
  glob.sync(match).forEach((file) => {
    if (!exclude || !file.startsWith(exclude)) {
      const entryKey = file.replace(/^\.\/src\//, "").replace(/\.ts$/, "");
      entries[entryKey] = file;
    }
  });
  return entries;
}

const BASE_CONFIG = {
  mode: "production",
  devtool: "source-map",
  target: "node",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "[name].js",
    libraryTarget: "module",
    publicPath: "./",
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./",
            },
          },
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
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: path.dirname(require.resolve("react/package.json")),
      "react-dom": path.dirname(require.resolve("react-dom/package.json")),
      "{{pkg}}": path.resolve(__dirname, "src"),
    },
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "react/jsx-runtime": "react/jsx-runtime",
    /**
     * Include NextJS as an external when
     * bringing in NextJS components.
     * Ensure that they are installed as
     * a dependency with
     * npm install --save next@15
     */

    // next: "next",
    // "next/image": "next/image",
    // "next/link": "next/link",
    // "next/navigation": "next/navigation",
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 128000,
    maxAssetSize: 512000,
  },
};

const BASE_WEBPACK_CONFIG = merge(BASE_CONFIG, {
  entry: entries("./src/**/index.ts", "./src/ui"),
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|otf)$/,
        type: "asset/resource",
        generator: { filename: "fonts/[name][ext]" },
      },
    ],
  },
  plugins: [
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
});

const CLIENT_WEBPACK_CONFIG = merge(BASE_CONFIG, {
  entry: entries("./src/ui/client/**/index.ts"),
  plugins: [
    new webpack.BannerPlugin({
      banner: `'use client';`,
      raw: true,
      entryOnly: false,
      stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
      test: /^.*\/(client)\/.*index\.js$/,
    }),
  ],
});

const SERVER_WEBPACK_CONFIG = merge(BASE_CONFIG, {
  entry: entries("./src/ui/server/**/index.ts"),
  externals: [
    BASE_CONFIG.externals,
    function ({ request }, callback) {
      if (/^(?!@\/)(?!\.\.)/.test(request)) {
        return callback();
      }
      if (/^(?!.*\/(client)\/).*$/.test(request)) {
        return callback();
      }
      const import_path = request.replace(/^.*(?=\/client\/)/, PKG_NAME);
      return callback(null, import_path);
    },
  ],
});

module.exports = [
  CLIENT_WEBPACK_CONFIG,
  SERVER_WEBPACK_CONFIG,
  BASE_WEBPACK_CONFIG,
];

