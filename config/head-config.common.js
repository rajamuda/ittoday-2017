/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default.
 * You can explicitly hint to prefix a publicPath by setting a boolean value to a key that has
 * the same name as the attribute you want to operate on, but prefix with =
 *
 * Example:
 * { name: 'msapplication-TileImage', content: '/assets/icon/ms-icon-144x144.png', '=content': true },
 * Will prefix the publicPath to content.
 *
 * { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-icon-57x57.png', '=href': false },
 * Will not prefix the publicPath on href (href attributes are added by default
 *
 */
module.exports = {
  link: [
    /** <link> tags for favicons **/
    { rel: 'icon', type: 'image/png', href: '/assets/icon/32-favicon.png' },

    /** <link> tags for a Web App Manifest **/
    { rel: 'manifest', href: '/assets/manifest.json' }
  ],
  meta: [
    { name: 'keywords' , content: 'IT Today, IPB, IT Today IPB, HackToday, CTF, AppsToday, Seminar, Application Developing, IT Events' },
    { name: 'author', content: 'Onestyd, Rajamuda, Abudurrohim' },
    { name: 'msapplication-TileColor', content: '#fe0037' },
    { name: 'msapplication-TileImage', content: '/assets/icon/32-favicon.png', '=content': true },
    { name: 'theme-color', content: '#fe0037' }
  ]
};
