const { merge } = require('webpack-merge'); // practic ne lasa sa facem merge la configurile de webpack, dintre webpack.common si webpack.dev
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require("../package.json");

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'container', // asta nu e folosit in mod direct, dar e bine sa fie setat
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js' // asta e remote-ul nostru, care vine de la marketing
      },
      // shared: ['react', 'react-dom']
      shared: packageJson.dependencies // asa putem pune automat toate versiune de librarii care sunt in package.json. putem sa fim si super specifici in legatura cu versiunile

    })
  ]
};

module.exports = merge(commonConfig, devConfig); // practic facem merge la configurile de webpack, dintre webpack.common si webpack.dev