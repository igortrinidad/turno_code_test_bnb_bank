export const useSetSeoTags = ({ title, navColor = 'bg-blue-100/50 text-blue-500 font-bold' }: any) => {

  if (title.length > 50) {
    title = title.slice(0, 50) + '...'
  }

  useSharedStore().pageTitle = title
  useSharedStore().navColor = navColor

  useSeoMeta({
    robots: 'index, follow',
    applicationName: 'BNB BANK',
    titleTemplate: '%s BNB BANK',
    title,
    ogSiteName: 'BNB BANK',
  })

}