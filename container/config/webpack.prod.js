const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // asta o sa fie un env var ce o vom seta noi. O sa fie setat din CI/CD

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js', // asta cica o sa fie formatul fisierelor builduite. Pt caching issues
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js` // cumva sa stim sigur ca vom avea un folder de marketing, unde va fi acel remoteEntry. ca nu cumva sa fie suprascris cu ex dashboard sau ceva de genu
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);