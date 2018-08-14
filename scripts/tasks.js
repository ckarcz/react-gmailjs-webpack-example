require('shelljs/global');

exports.initBuild = (env) => {
  rm('-rf', env);
  mkdir(env);
};

exports.copyManifest = (env) => {
  cp(`src/chrome/manifest.${env}.json`, `${env}/manifest.json`);
};

exports.copyAssets = (env) => {
  cp('-R', 'src/chrome/assets/*', env);
};

exports.copyHtml = (env) => {
  exec(`pug --obj "{ env: '${env}' }" --out ${env} src/chrome/views/ --pretty`);
};

exports.replaceWebpack = () => {
  const replaceTasks = [{
    from: 'webpack/replace/JsonpMainTemplate.runtime.js',
    to: 'node_modules/webpack/lib/JsonpMainTemplate.runtime.js'
  }, {
    from: 'webpack/replace/process-update.js',
    to: 'node_modules/webpack-hot-middleware/process-update.js'
  }];

  replaceTasks.forEach(task => cp(task.from, task.to));
};
