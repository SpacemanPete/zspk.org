import React from 'react'
import PropTypes from 'prop-types'
import imageUrlBuilder from '@sanity/image-url'
import styles from './ImageSection.module.css'
import client from '../../client'
import SimpleBlockContent from '../SimpleBlockContent'
import Cta from '../Cta'

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

function ImageSection (props) {
  const {heading, label, text, image, cta} = props

  if (!image) {
    return null
  }

  const imgUrl = urlFor(image).auto('format').width(2000).url()
  const bgImage = image
    ? {
      backgroundImage: `url("${imgUrl}")`
    }
    : {}

  return (
    <div className={styles.root}>
      <div className={styles.textWrapper}>
        <div className={styles.textContent}>
          <div className={styles.label}>{label}</div>
          <h2 className={styles.title}>{heading}</h2>
          {text && <SimpleBlockContent blocks={text} />}
          {cta && cta.route && <Cta {...cta} />}
        </div>
      </div>
      <div className={styles.imgWrapper}>
        <div
          style={bgImage}
          className={styles.imgSection} />
        <img
          src={imgUrl}
          className={styles.image}
          alt={heading}
        />
      </div>
    </div>
  )
}

ImageSection.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.array,
  image: PropTypes.shape({
    asset: PropTypes.shape({
      _ref: PropTypes.string
    })
  }),
  backgroundImage: PropTypes.string,
  tagline: PropTypes.string,
  cta: PropTypes.object
}

export default ImageSection
