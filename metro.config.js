// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@react-native-community/masked-view': require.resolve('@react-native-masked-view/masked-view'),
};

module.exports = config;
