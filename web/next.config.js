const withCSS = require('@zeit/next-css')
const client = require('./client')

const isProduction = process.env.NODE_ENV === 'production'
const query = `
{
  "pages": *[_type == "page"] {
    ...,
    _id,
    title,
    _createdAt,
    _updatedAt
  }
}
`
const reduceRoutes = (obj, page) => {
  const {slug = {}} = page
  const {_createdAt, _updatedAt} = page
  const path = page['slug']['current'] === '/' ? '/' : `/${page['slug']['current']}`
  obj[path] = {
    query: {
      slug: slug.current
    },
    _createdAt,
    _updatedAt,
    page: '/LandingPage'
  }
  return obj
}

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: isProduction ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]'
  },
  exportPathMap: function () {
    return client.fetch(query).then(res => {
      const {pages = []} = res
      const nextRoutes = {
        '/': {page: '/', query: {slug: '/'}},
        // Routes imported from sanity
        ...pages.filter(({slug}) => slug.current).reduce(reduceRoutes, {}),
      }
      return nextRoutes
    })
  }
})
