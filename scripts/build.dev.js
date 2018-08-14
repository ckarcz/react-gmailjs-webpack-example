const tasks = require('./tasks');
const createWebpackServer = require('webpack-httpolyglot-server');
const webpackConfig = require('../webpack/dev.config');

const env = 'dev';

console.log('[Init]');
console.log('-'.repeat(80));
tasks.initBuild(env);

console.log('[Manifest]');
console.log('-'.repeat(80));
tasks.copyManifest(env);

console.log('[Html]');
console.log('-'.repeat(80));
tasks.copyHtml(env);

console.log('[Assets]');
console.log('-'.repeat(80));
tasks.copyAssets(env);

console.log('[Replace]');
console.log('-'.repeat(80));
tasks.replaceWebpack();

console.log('[Webpack]');
console.log('-'.repeat(80));
console.log('If you\'re developing Inject page,');
console.log('please allow `https://localhost:3000` connections in Google Chrome,');
console.log('and load unpacked extensions with `./dev` folder. (see https://developer.chrome.com/extensions/getstarted#unpacked)\n');
createWebpackServer(webpackConfig, {
  host: 'localhost',
  port: 3000
});
