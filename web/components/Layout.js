/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import {withRouter} from 'next/router'
import {LogoJsonLd} from 'next-seo'
import Header from './Header'
import Footer from './Footer'

function Layout (props) {
  const {config, children, router} = props

  if (!config) {
    console.error('Missing config')
    return <div>Missing config</div>
  }

  const {title, mainNavigation, footerNavigation, footerText, logo, url} = config
  const logoUrl = logo && logo.asset && logo.asset.url

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width, viewport-fit=cover' />
      </Head>
      <div className='container'>
        <Header title={title}
                navItems={mainNavigation}
                logo={logo} />
        <div className='content'>
          {children}
          <div id='kontakt'>
            Kontakt: <a href='mailto:kontakt@zspk.org' className='contact-email'>kontakt@zspk.org</a>
          </div>
        </div>
        <Footer text={footerText} />
        {logoUrl && url && <LogoJsonLd url={url} logo={logoUrl} />}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  config: PropTypes.shape({
    title: PropTypes.string,
    mainNavigation: PropTypes.arrayOf(PropTypes.object),
    footerNavigation: PropTypes.arrayOf(PropTypes.object),
    footerText: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string
      })
    }),
    url: PropTypes.string
  })
}

export default withRouter(Layout)
