import path from "path"
import { visit } from "unist-util-visit"
import { Root } from "hast"
import { VFile } from "vfile"
import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import { Argv } from "../../util/ctx"
import { FilePath, isRelativeURL, joinSegments, pathToRoot } from "../../util/path"
import {
  defaultContentPageLayout,
  landingPageLayout,
  sharedPageComponents,
} from "../../../quartz.layout"
import { Content } from "../../components"
import chalk from "chalk"
import { write } from "./helpers"
import DepGraph from "../../depgraph"

// ---------------------------------------------
// Parse dependencies in a markdown file
// ---------------------------------------------
const parseDependencies = (argv: Argv, hast: Root, file: VFile): string[] => {
  const dependencies: string[] = []

  visit(hast, "element", (elem): void => {
    let ref: string | null = null

    if (
      ["script", "img", "audio", "video", "source", "iframe"].includes(elem.tagName) &&
      elem?.properties?.src
    ) {
      ref = elem.properties.src.toString()
    } else if (["a", "link"].includes(elem.tagName) && elem?.properties?.href) {
      ref = elem.properties.href.toString()
    }

    if (ref === null || !isRelativeURL(ref)) return

    let fp = path.join(file.data.filePath!, path.relative(argv.directory, ref)).replace(/\\/g, "/")
    if (!fp.split("/").pop()?.includes(".")) fp += ".md"

    dependencies.push(fp)
  })

  return dependencies
}

// ---------------------------------------------
// ContentPage Emitter
// ---------------------------------------------
export const ContentPage: QuartzEmitterPlugin<Partial<FullPageLayout>> = (userOpts) => {
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "ContentPage",

    getQuartzComponents() {
      // Components are attached per-page in emit()
      return []
    },

    // Builds the dependency graph
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()

      for (const [tree, file] of content) {
        const sourcePath = file.data.filePath!
        const slug = file.data.slug!
        graph.addEdge(sourcePath, joinSegments(ctx.argv.output, slug + ".html") as FilePath)

        parseDependencies(ctx.argv, tree as Root, file).forEach((dep) => {
          graph.addEdge(dep as FilePath, sourcePath)
        })
      }

      return graph
    },

    // Emits HTML pages
    async emit(ctx, content, resources): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const fps: FilePath[] = []
      const allFiles = content.map((c) => c[1].data)

      let containsIndex = false

      for (const [tree, file] of content) {
        const slug = file.data.slug!
        if (slug === "index") containsIndex = true

        // -----------------------------
        // Select layout per page
        // -----------------------------
        const layout =
          slug === "index"
            ? { ...sharedPageComponents, ...landingPageLayout }
            : { ...sharedPageComponents, ...defaultContentPageLayout }

        const opts: FullPageLayout = {
          ...layout,
          pageBody: Content(),
          ...userOpts,
        }

        // -----------------------------
        // Prepare component data
        // -----------------------------
        const externalResources = pageResources(pathToRoot(slug), file.data, resources)
        const componentData: QuartzComponentProps = {
          ctx,
          fileData: file.data,
          externalResources,
          cfg,
          children: [],
          tree,
          allFiles,
        }

        // -----------------------------
        // Render page
        // -----------------------------
        const contentHTML = renderPage(cfg, slug, componentData, opts, externalResources)

        const fp = await write({
          ctx,
          content: contentHTML,
          slug,
          ext: ".html",
        })

        fps.push(fp)
      }

      if (!containsIndex && !ctx.argv.fastRebuild) {
        console.log(
          chalk.yellow(
            `\nWarning: you seem to be missing an \`index.md\` home page file at the root of your \`${ctx.argv.directory}\` folder. This may cause errors when deploying.`,
          ),
        )
      }

      return fps
    },
  }
}
