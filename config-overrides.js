const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#CB4900",
      "@layout-header-background": "#1B212A",
      "@menu-dark-highlight-color": "@primary-color",//000
      "@menu-dark-item-active-bg": "000",
      "@menu-dark-submenu-bg": "#000c17",//  
      "@menu-item-active-bg": "#fff"
     
      
    },
    javascriptEnabled: true,
  })(config, env);
  return config;
};
//naranja:CB4900
//amarillo: FAE467
//#F2D2BF
