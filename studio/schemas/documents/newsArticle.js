export default {
  name: 'newsArticle',
  type: 'document',
  title: 'News Article',
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
    },
    {
      title: 'Routing',
      name: 'routing',
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'text',
      type: 'portableText',
      title: 'Text',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Page URL',
      description: 'URL for the page',
      fieldset: 'routing',
      options: {
        source: 'title'
      }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'This description populates meta-tags on the webpage',
      fieldset: 'metadata',
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
      title: 'title',
      slug: 'slug.current',
      media: 'openGraphImage',
    },
    prepare({ slug, title }) {
      return {
        title: `${title}`,
        subtitle: slug !== undefined ? `URL: /wiadomosc/${slug}` : '',
      };
    },
  },
};
