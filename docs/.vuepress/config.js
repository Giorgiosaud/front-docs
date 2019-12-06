module.exports = {
  title: "Modyo Front End Documentation.",
  description: "Welcome to the Modyo Front End Center",
  head:[
    ['link', { rel: 'apple-touch-icon',sizes:'180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type:'image/png',sizes:'32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type:'image/png',sizes:'16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Modyo' }],
    ['meta', { name: 'application-name', content: 'Modyo' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' }],
    ['meta', { name: 'msapplication-TileImage', content: '/mstile-150x150.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#da532c' }]
  ],
  locales:{
    '/': {
      lang: 'es-CL', // this will be set as the lang attribute on <html>
      title: 'Documentacion Front End',
      description: 'Bienvenido al centro de documentos Front End de Modyo',
    },
    '/en/': {
      lang: 'en-UD',
      title: 'Modyo Front End Documentation',
      description: 'Welcome to the ModyoFront End Center"',
    }
  },
  themeConfig: {
    logo: "/assets/img/modyo.png",
    docsDir: "docs",
    smoothScroll: true,
    search: false,
    activeHeaderLinks: true,
    locales: {
      '/': {
        label: 'Español',
        lastUpdated: 'Última Actualizacion',
        selectText: 'Idiomas',
        ariaLabel: 'Seleccione idioma',
        editLinkText: 'Edite esta pagina en GitHub',
        lastUpdated: 'Última Actualización',
        nav: [
          { text: 'Inicio', link: '/' },
        ],
        
        sidebar: [
          ['/integrations/','Integrations'],
          {
            title: "Artículos",
            collapsable: false,
            children:[
              "/integrations/OIDC/",                    
            ]
          },
        ]
      },
      '/en/': {
        label: 'English',
        lastUpdated: 'Last Updated',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          { text: 'Home', link: '/' },
        ],
        sidebar: [
          ['en/integrations/','Integrations'],
          {
            title: "Articles",
            collapsable: false,
            children:[
              "en/integrations/OIDC/",                    
            ]
          },
        ]
      }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
  }]
  ]
};