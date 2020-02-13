import S from '@sanity/desk-tool/structure-builder'
import { MdDashboard, MdSettings, MdMenu, MdHome } from 'react-icons/lib/md'
import { FaNewspaper } from "react-icons/lib/fa";

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
  !['homepage', 'page', 'newsArticle', 'menu', 'site-config'].includes(listItem.getId())

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
        .title('Homepage')
        .icon(MdHome)
        .child(
          S.editor()
            .id('hp')
            .title('Homepage')
            .schemaType('homepage')
            .documentId('home-page')
        ),
      S.listItem()
        .title('Pages')
        .icon(MdDashboard)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('News')
        .icon(FaNewspaper)
        .schemaType('newsArticle')
        .child(S.documentTypeList('newsArticle').title('Articles')),
      S.listItem()
        .title('Menus')
        .icon(MdMenu)
        .schemaType('menu')
        .child(S.documentTypeList('menu').title('Menus')),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
