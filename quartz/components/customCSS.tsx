import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const CustomCSS: QuartzComponent = (_props: QuartzComponentProps) => {
  return null // This component doesn't render anything
}

CustomCSS.css = `
/* Font Awesome import */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Your custom CSS can go here */
`

export default (() => CustomCSS) satisfies QuartzComponentConstructor