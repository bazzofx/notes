import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { Navbar } from "./quartz/components/Navbar"
// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Navbar()],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/bazzofx",
      LinkedIn: "https://www.linkedin.com/in/paulo-bazzo-91539393/",
    },
  }),
}

// component for Landing Page
export const landingPageLayout: PageLayout = {
  beforeBody: [],
  left: [],
  right: [],
}


// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    // Component.DesktopOnly(Component.Explorer()),
    Component.Explorer()
  ],
  right: [
    Component.Darkmode(),
    Component.Search(),
    Component.DesktopOnly(Component.TableOfContents())
    // Component.Graph(),
    // Component.Backlinks(),
  ],
}
export const homeContentPageLayout: PageLayout = {
  beforeBody: [],

  left: [
    Component.Explorer()
  ],

  right: []
}
// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
