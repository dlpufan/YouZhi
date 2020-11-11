module.exports = {
  devServer: {
    open: true,
    port: 8888
  },
  publicPath: './', 
  lintOnSave: false,
  css:{
    loaderOptions:{
      sass:{
        prependData:`@import "./src/lib/hotcss/px2rem.scss";`
      }
    }
  }
};
