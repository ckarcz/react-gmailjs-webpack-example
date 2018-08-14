const path = require('path');
const tasks = require('./tasks');

const env = 'prod';
const webpackConfigPath = path.join(__dirname, `../webpack/${env}.config`);

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

console.log('[Webpack]');
console.log('-'.repeat(80));
exec(`webpack --config ${webpackConfigPath} --progress --profile --colors`);
