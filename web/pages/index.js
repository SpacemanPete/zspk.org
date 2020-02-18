import PropTypes from 'prop-types'
import React, {Component} from 'react'
import NextSeo from 'next-seo'
import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import Layout from '../components/Layout'
import RenderSections from '../components/RenderSections'

const builder = imageUrlBuilder(client)

class IndexPage extends Component {
  static propTypes = {
    config: PropTypes.object
  }

  static async getInitialProps ({query}) {
    const {slug} = query
    if (!query) {
      console.error('no query')
      return
    }

    // Frontpage
    if (slug && slug === '/') {
      return client
        .fetch(
          groq`
            *[_id == "home-page"][0]{
              ...,
              content[] {
                ...,
              }
            }
          `
        )
    }

    return null
  }

  render () {
    const {
      title = 'Missing title',
      openGraphImage,
      metaDescription,
      content = [],
      config = {},
      slug
    } = this.props

    const openGraphImages = openGraphImage
      ? [
        {
          url: builder
            .image(openGraphImage)
            .width(800)
            .height(600)
            .url(),
          width: 800,
          height: 600,
          alt: title
        },
        {
          // Facebook recommended size
          url: builder
            .image(openGraphImage)
            .width(1200)
            .height(630)
            .url(),
          width: 1200,
          height: 630,
          alt: title
        },
        {
          // Square 1:1
          url: builder
            .image(openGraphImage)
            .width(600)
            .height(600)
            .url(),
          width: 600,
          height: 600,
          alt: title
        }
      ]
      : []

    return (
      <Layout config={config}>
        <NextSeo
          config={{
            title,
            titleTemplate: `${config.title} | %s`,
            metaDescription,
            canonical: config.url && `${config.url}`,
            openGraph: {
              images: openGraphImages
            },
          }}
        />
        {content && <RenderSections sections={content} />}
      </Layout>
    )
  }
}

export default IndexPage
