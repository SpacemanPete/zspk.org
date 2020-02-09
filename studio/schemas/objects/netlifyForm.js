export default {
  type: 'object',
  name: 'netlifyForm',
  title: 'Netlify Form',
  description: 'A Simple Netlify Form with fields: name, email, & message',
  fields: [
    {
      name: 'formName',
      type: 'string',
      title: 'Form Name'
    },
    {
      name: 'reCaptcha',
      type: 'boolean',
      title: 'Enable Google reCAPTCHA 2',
      description: 'Used to deter SPAM form submissions'
    },
    {
      name: 'honeypot',
      type: 'boolean',
      title: 'Enable honeypot',
      description: 'A hidden honeypot field help deter SPAM form submissions'
    },
  ]
}