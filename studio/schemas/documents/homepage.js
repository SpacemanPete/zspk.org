export default {
  name: 'homepage',
  type: 'document',
  title: 'Homepage',
  __experimental_actions: [/* create, delete, */ 'update', 'publish'],
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
    }
  ],
  fields: [
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      of: [
        { type: 'hero' },
        { type: 'imageSection' },
        { type: 'textSection' },
        { type: 'netlifyForm' },
      ],
    },
    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata',
    },
  ],
  preview: {
    select: {
      title: 'homepage',
      media: 'openGraphImage',
    },
  },
};
