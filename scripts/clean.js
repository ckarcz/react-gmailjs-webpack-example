require('shelljs/global');

console.log('[Clean]');
console.log('-'.repeat(80));
exec('rimraf prod/ dev/ *.zip *.crx');
