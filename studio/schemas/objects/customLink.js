export default {
  type: 'object',
  name: 'customLink',
  title: 'Custom Link',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Display Title',
      validation: Rule => Rule.required()
    },
    {
      type: 'string',
      name: 'linkDest',
      title: 'Link Destination',
      description: 'Use for an external URL or a section ID for an anchor link',
      validation: Rule => Rule.required()
    },
    {
      type: 'boolean',
      name: 'targetNew',
      title: 'Open in new tab',
    },
  ]
}