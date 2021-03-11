const configureWebpack = require('./webpack.config.js');
const isDev = !(process.env.NODE_ENV === 'production');

module.exports = {
    // publicPath: (isDev) ? '/HadesStarData/' : '/',
    productionSourceMap: isDev,
    css: {
        sourceMap: isDev,
    },
    configureWebpack,
};
