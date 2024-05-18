const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // asta o sa fie un env var ce o vom seta noi. O sa fie setat din CI/CD

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js', // asta cica o sa fie formatul fisierelor builduite. Pt caching issues
    publicPath: '/container/latest/' // asta cica o s-o folosim super mult in mfe apps. Ca si cum setam un basePath de unde sa ia fisierele. Practic ia fisierele din s3 bucket din /container/latest 
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`, // cumva sa stim sigur ca vom avea un folder de marketing, unde va fi acel remoteEntry. ca nu cumva sa fie suprascris cu ex dashboard sau ceva de genu
        auth: `auth@${domain}/auth/latest/remoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);