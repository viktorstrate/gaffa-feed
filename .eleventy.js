const pluginTailwindCSS = require('eleventy-plugin-tailwindcss')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const htmlmin = require('html-minifier')

module.exports = function (eleventyConfig) {
  const isProduction = process.env.NODE_ENV == 'production'

  // Copy assets
  eleventyConfig.addPassthroughCopy({ 'src/assets': './assets' })

  // Tailwind
  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: 'src/style.css',
    dest: '.',
    keepFolderStructure: false,
    minify: isProduction,
    watchEleventyWatchTargets: true,
  })

  // RSS Feed
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: 'default', // opt-out of <img/>-style XHTML single tags
    },
  })

  // Minify HTML in production
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (isProduction && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })

  eleventyConfig.addFilter('formatDate', (value) => {
    const date = new Date(value)

    const hour =
      date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
    const minute =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    const day = date.toLocaleDateString('da', { dateStyle: 'medium' })

    return `${day}, ${hour}:${minute}`
  })

  eleventyConfig.addFilter('filterArticles', (feed) =>
    feed.filter((x) => x.article_type == 'article')
  )
  eleventyConfig.addFilter('filterReviews', (feed) =>
    feed.filter((x) => x.article_type == 'review')
  )
  eleventyConfig.addFilter('filterNews', (feed) =>
    feed.filter((x) => x.article_type == 'news')
  )
  eleventyConfig.addFilter('formatArticleType', (type) => {
    switch (type) {
      case 'review':
        return 'Anmeldelse'
      case 'news':
        return 'Nyhed'
      default:
        return 'Artikel'
    }
  })

  eleventyConfig.addFilter('date', (str) => new Date(str))

  eleventyConfig.addFilter(
    'getNewestGaffaArticleDate',
    (articles) => new Date(articles[0].publish_date)
  )
}
