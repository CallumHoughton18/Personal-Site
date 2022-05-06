module.exports = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  siteMetadata: {
    title: 'Gatsby Default Starter',
    menuLinks: [
      {
        name: 'home',
        link: '/'
      },
      {
        name: 'blog',
        link: '/blog'
      }
    ]
  },
  pathPrefix: "/Personal-Site",
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/misc`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogPosts`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projectImages`,
        path: `${__dirname}/src/images/project_images`,
      },
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: 'server',
        analyzerPort: 3005,
      }
    },
    {
      resolve: `gatsby-transformer-remark`, 
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          }, 
        ], 
      }, 
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,   
    `gatsby-plugin-image`
  ],
};
