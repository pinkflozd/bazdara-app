/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

module.exports = {
  staticFileGlobs: [
    'src/**/*',
    'manifest.json',
    'images/icons/**/*',
    'favicon.ico',
    'node_modules/web-animations-js/web-animations-next-lite.min.js'
  ],

  navigateFallbackWhitelist: [/^(?!\/__)/],

  runtimeCaching: [{
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest'
    },
    {
      /* Google Analytics */
      urlPattern: /https?:\/\/((www|ssl)\.)?google-analytics\.com\/analytics.js/,
      handler: 'networkFirst'
    },
    {
      urlPattern: /https?:\/\/firebasestorage\.googleapis\.com\/.*/,
      handler: 'networkFirst'
    },
    {
      urlPattern: /https?:\/\/cdn\.jsdelivr\.net\/.*/,
      handler: 'fastest'
    },
    {
      urlPattern: /https?:\/\/fonts.+/,
      handler: 'fastest'
    },
    {
      urlPattern: /https?:\/\/x\.bazdara\.com\/.*/,
      handler: 'networkFirst'
    }
  ]
};
