const path = require("path");
module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',

  ],

  webpackFinal: async config => {
    // Remove the existing css rule
    config.module.rules = config.module.rules.filter(
      f => f.test.toString() !== '/\\.css$/'
    );

    config.module.rules.push({
      test: /(?<!\.module).css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: false, // Enable modules to help you using className
        }
      }],
      include: [path.resolve(__dirname, '../src'),path.resolve(__dirname, '../stories')],
    });
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        }
      ],
      include: [path.resolve(__dirname, '../src'),path.resolve(__dirname, '../stories')],
    });

    return config;
  },
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
};
