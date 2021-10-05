const Cache = require('@11ty/eleventy-cache-assets')

module.exports = async () => {
  const FETCH_PAGES = 4

  let posts = []

  for (let i = 0; i < FETCH_PAGES; i++) {
    /**
     * Params:
     * article_type = reviews,articles,news
     * limit = 1-50
     * page = 1-
     */
    const { data } = await Cache(
      `https://api.gaffa.dk/feeds/stream?limit=50&page=${i + 1}`,
      {
        duration: '1h', // 1 hour
        type: 'json',
      }
    )
    posts = posts.concat(data)
  }

  return posts
}
