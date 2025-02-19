const path = require("path");
require("webpack");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false, // Enables full type checking and `.d.ts` generation
              compilerOptions: {
                declaration: true,
                declarationMap: true,
                outDir: "lib",
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
