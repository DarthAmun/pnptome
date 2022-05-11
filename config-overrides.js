const { override } = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          "@base-color": "#F55C5C",
          "@B800": "#191D38",
          "@B700": "#272c4a",
        },
      },
    },
  })
);
