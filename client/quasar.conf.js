// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      'ionicons',
      'mdi'
      // 'fontawesome'
    ],
    animations: 'all',
    supportIE: true,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      env: ctx.dev
        ? { // so on dev we'll have
          // API: JSON.stringify('http://127.0.0.1:8000/api')
          API: JSON.stringify('http://127.0.0.1:8000/api')
        }
        : { // and on build (production):
          API: JSON.stringify('https://mimin.kuliahku.mimzy.xyz/api')
        },
      scopeHoisting: true,
      vueRouterMode: 'hash',
      // analyze: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
        // cfg.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules|quasar)/
        // })
      }
    },
    devServer: {
      // https: false,
      // proxy: {
      //   "/api": {
      //     target: "http://127.0.0.1:8000/api",
      //     // target: process.env.VUE_ROUTER_BASE,
      //     changeOrigin: true,
      //     pathRewrite: {
      //        '^/api': 'api'
      //     }
      //   }
      // },
      port: 8081,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutFooter',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QTabs',
        'QTab',
        'QFab',
        'QFabAction',
        'QRouteTab',
        'QBtn',
        'QBtnGroup',
        'QIcon',
        'QSearch',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSeparator',
        'QItemSide',
        'QItemTile',
        'QAjaxBar',
        'QCollapsible',
        'QInput',
        'QEditor',
        'QToggle',
        'QChipsInput',
        'QCheckbox',
        'QPopover',
        'QSelect',
        'QOptionGroup',
        'QScrollArea',
        'QChip',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QTableColumns',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QDatetime',
        'QTooltip',
        'QModal',
        'QModalLayout',
        'QChatMessage',
        'QPopupEdit',
        'QField'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'AddressbarColor',
        'Meta',
        'Dialog'
      ]
    },
    animations: 'all',
    // animations: [],
    pwa: {
      // cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'adminholic',
        short_name: 'adminholic',
        description: 'Kerjaholic Admin!',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#ffffff',
        theme_color: '#ce1126',
        icons: [
          {
            'src': 'statics/pwa/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/pwa/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/pwa/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/pwa/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/pwa/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.0'
  }
}
