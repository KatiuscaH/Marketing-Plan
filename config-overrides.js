const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#CB4900" ,
  "@layout-header-background"       : "#1B212A",
  //"component-background"   : "@layout-header-background",
  "@menu-dark-highlight-color": "@primary-color"
  
  },
    javascriptEnabled: true,
  })(config, env);
  return config;
};

