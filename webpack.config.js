const _ = require('lodash');
const webpackHotConfig = require('./webpack.hot.config.js');
const webpackDevConfig = require('./webpack.dev.config.js');
const webpackBuildConfig = require('./webpack.build.config.js');

const generalConfig = {
  // абосолютный путь к папке с проектом
  context: `${__dirname}/src`,

  // при ошибке не собирать сборку
  optimization: {
    noEmitOnErrors: true,
  },
};

module.exports = () => {
  const currentMode = process.env.npm_lifecycle_event;
  let webpackConfig;

  // "горячая" сборка - Hot Module Replacement
  if (currentMode === 'hot') {
    webpackConfig = webpackHotConfig;
  }

  // итоговая сборка - удобочитаемый вариант
  if (currentMode === 'dev') {
    webpackConfig = webpackDevConfig;
  }

  // итоговая сборка - для загрузки на хостинг
  if (currentMode === 'build') {
    webpackConfig = webpackBuildConfig;
  }

  return _.merge(generalConfig, webpackConfig);
};
