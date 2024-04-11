module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [["module-resolver", {
    root: ["."],
    extensions: [
      '.Js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ],
    alias: {
      '@components': './src/components',
      '@utils': './src/utils',
      '@assets': './src/assets',
      '@views': './src/views',
      '@hooks': './src/hooks',
      '@contexts': './src/contexts',
      '@routes': './src/routes',
      '@sheets': './src/sheets',
      '@configs': './src/configs',
    }
  }]]
};
