export default function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
    env: {
      production: {
        plugins: ['..............*other plug ins*'],
      },
    },
  };
};
