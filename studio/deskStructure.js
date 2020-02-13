import S from '@sanity/desk-tool/structure-builder'
import { MdDashboard, MdSettings, GiHamburgerMenu } from 'react-icons/lib/md'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
  !['page', 'menu', 'site-config'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Site config')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('config')
            .schemaType('site-config')
            .documentId('global-config')
        ),
      S.listItem()
        .title('Pages')
        .icon(MdDashboard)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Menus')
        .icon(GiHamburgerMenu)
        .schemaType('menu')
        .child(S.documentTypeList('menu').title('menus')),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
