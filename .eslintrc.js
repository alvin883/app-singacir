module.exports = {
  root: true,
  extends: "@react-native-community",
  plugins: ["import"],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        alias: {
          _actions: "./src/actions",
          _assets: "./src/assets",
          _atoms: "./src/components/atoms",
          _c_a_icons: "./src/components/atoms/icons",
          _components: "./src/components",
          _molecules: "./src/components/molecules",
          _organisms: "./src/components/organisms",
          _reducers: "./src/reducers",
          _routers: "./src/routers",
          _styles: "./src/styles",
          _utils: "./src/utils",
          _views: "./src/views",
        },
      },
    },
  },
}