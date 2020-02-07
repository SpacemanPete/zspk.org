export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e3cfb73f12c591652447f71',
                  title: 'Sanity Studio',
                  name: 'sanity-nextjs-landing-pages-studio-fytz21h6',
                  apiId: 'd9f4de06-110e-45aa-a118-477a2b92bdae'
                },
                {
                  buildHookId: '5e3cfb74d962017e14e332c7',
                  title: 'Landing pages Website',
                  name: 'sanity-nextjs-landing-pages-web-tnes2h1z',
                  apiId: 'dfb7e860-c1ac-4b01-a729-08bdd42d69fb'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/SpacemanPete/sanity-nextjs-landing-pages',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-nextjs-landing-pages-web-tnes2h1z.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
