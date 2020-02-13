import React from 'react';

const InternalLinkRender = ({ children }) => <span>{children} 🔗</span>;

export default {
  title: 'Internal link to a Page',
  name: 'internalLink',
  type: 'reference',
  description: 'Locate a Page you want to link to',
  to: [{ type: 'page' }],
  blockEditor: {
    icon: () => '🔗',
    render: InternalLinkRender,
  },
};
