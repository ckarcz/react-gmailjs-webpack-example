// https://developer.chrome.com/extensions/background_pages
// this script is executed in the background as needed or manually

const util = require('./lib/util');

require('./lib/contextMenus');
require('./lib/badge');

// enable bluebird Promises for chrome apis
util.promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus',
  'identity'
]);
util.promisifyAll(chrome.storage, [
  'local',
]);
