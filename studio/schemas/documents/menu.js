import { GiHamburgerMenu } from 'react-icons/lib/md';

export default {
  name: 'menu',
  type: 'document',
  title: 'Menu',
  icon: GiHamburgerMenu,
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Menu name',
    },
    {
      type: 'array',
      name: 'links',
      title: 'Menu Links',
      of: [{type: 'internalLink'}, {type: 'customLink'}]
    }
  ]
}