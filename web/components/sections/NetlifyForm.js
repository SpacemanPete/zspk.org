import PropTypes from 'prop-types'
import React, {Component} from 'react'
import slugify from 'react-slugify'
import styles from './NetlifyForm.module.css'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class NetlifyForm extends Component {
  constructor (props) {
    super(props)
    this.state = {name: '', email: '', message: ''}
  }

  /* Here’s the engine for posting the form submission */
  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': this.props.formName, ...this.state })
    })
      .then(() => alert('Success!'))
      .catch(error => alert(error))

    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const {formName, reCaptcha, honeypot} = this.props
    const {name, email, message} = this.state
    return (
      <form
        name={slugify(formName)}
        data-netlify='true'
        {...(honeypot ? {'data-netlify-honeypot': 'true'} : {})}
        {...(reCaptcha ? {'data-netlify-recaptcha': 'true'} : {})}
        onSubmit={this.handleSubmit}
      >
        <input type='hidden' name='form-name' value={slugify(formName)} />
        <p>
          <label>
            Imię i Nazwisko: <input type='text' name='name' value={name} onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <label>
            Adres e-mail: <input type='email' name='email' value={email} onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <label>
            Wiadomość: <textarea name='message' value={message} onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <button type='submit'>Wyśli</button>
        </p>
      </form>
    )
  }
}

export default NetlifyForm
