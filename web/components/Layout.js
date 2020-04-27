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
        <div className='content'>{children}</div>
        {router.pathname === '/' && (
          <form name="kontakt2" data-netlify="true" data-netlify-honeypot="true" data-netlify-recaptcha="true" id="kontakt2">
            <input type="hidden" name="form-name" value="kontakt2" />
            <p>
              <label>Imię i Nazwisko: <input type="text" name="name" value="" /></label>
            </p>
            <p>
              <label>Adres e-mail: <input type="email" name="email" value="" /></label>
            </p>
            <p>
              <label>Wiadomość: <textarea name="message"></textarea></label>
              </p>
            <p>
              <button type="submit">Wyśli</button>
            </p>
          </form>
        )}
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
