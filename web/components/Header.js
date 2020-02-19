import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {withRouter} from 'next/router'
import SVG from 'react-inlinesvg'
import styles from './Header.module.css'
import HamburgerIcon from './icons/Hamburger'

class Header extends Component {
  state = {showNav: false}

  static propTypes = {
    router: PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.shape({
        slug: PropTypes.string
      }),
      events: PropTypes.any
    }),
    title: PropTypes.string,
    navItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.shape({
          current: PropTypes.string
        })
      })
    ),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string
      }),
      logo: PropTypes.string
    })
  }

  componentDidMount () {
    const {router} = this.props
    router.events.on('routeChangeComplete', this.hideMenu)
  }

  componentWillUnmount () {
    const {router} = this.props
    router.events.off('routeChangeComplete', this.hideMenu)
  }

  hideMenu = () => {
    this.setState({showNav: false})
  }

  handleMenuToggle = () => {
    const {showNav} = this.state
    this.setState({
      showNav: !showNav
    })
  }

  renderLogo = logo => {
    if (!logo || !logo.asset) {
      return null
    }

    if (logo.asset.extension === 'svg') {
      return <SVG src={logo.asset.url} className={styles.logo} />
    }

    return <img src={logo.asset.url} alt={logo.title} className={styles.logo} />
  }

  render () {
    const {title = 'Missing title', navItems, router, logo} = this.props
    const { links } = navItems[0]
    const {showNav} = this.state

    return (
      <div className={styles.root} data-show-nav={showNav}>
        <div className={styles.container}>
          <h1 className={styles.branding}>
            <Link
              href={{
                pathname: '/index.js',
                query: {
                  slug: '/'
                }
              }}
              as='/'
              prefetch
            >
              <a>{ title }</a>
            </Link>
          </h1>
          <nav className={styles.nav}>
            <ul className={styles.navItems}>
              {links && links.map(item => {
              // TODO: links do contain a data array
              //       Need two new components:
              //          - customLink.js
              //          - internalLink.js
              //
              //       Need to fix data rendering to handle `customLink` data structure
              //       and test value to see if it's:
              //          - absolute link
              //          - relative link
              //
              //       Also add logic for active link
              // const isActive = router.pathname === '/LandingPage' && router.query.slug === slug.current

                if (item._type === 'customLink') {
                  if (router.pathname === item.linkDest) {
                    return null
                  } else {
                    return (
                      <li key={item._key}>
                        <Link
                          href={{
                            pathname: '/index.js',
                          }}
                          as={`/#${item.linkDest}`}
                        >
                          <a>{ item.title }</a>
                        </Link>
                      </li>
                    )
                  }
                } else if ( item._type === 'internalLink' ) {
                  // const {slug, title, _id} = item
                  // return (
                  //   <li key={_id} className={styles.navItem}>
                  //     <Link
                  //       href={{
                  //         pathname: '/LandingPage',
                  //         query: {slug: slug.current}
                  //       }}
                  //       as={`/${slug.current}`}
                  //       prefetch
                  //     >
                  //       <a data-is-active={isActive ? 'true' : 'false'}>{title}</a>
                  //     </Link>
                  //   </li>
                  // )
                }
              })}
            </ul>
            <button className={styles.showNavButton} onClick={this.handleMenuToggle}>
              <HamburgerIcon className={styles.hamburgerIcon} />
            </button>
          </nav>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
