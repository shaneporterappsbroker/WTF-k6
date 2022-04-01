const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getEntries(pattern) {
  const entries = {};
  glob.sync(pattern).forEach((file) => {
    entries[file] = path.join(__dirname, file);
  });
  return entries;
}

module.exports = {
  mode: 'production',
  entry: getEntries('./src/**/*.test.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: ({ chunk: { name } }) => {
      return name.replace('./src/', '').replace(/\.[^/.]+$/, '.js');
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  stats: {
    colors: true,
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: false,
  },
};
