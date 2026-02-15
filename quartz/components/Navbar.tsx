import * as Component from "./index" // import existing Quartz components

// Easy to modify CSS configuration
const styles = {
  nav: {
    display: "flex",
    gap: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#161618",
    color: "#fcf2d8",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    fontWeight: "bold",
  },
  brandLink: {
    color: "#fcf2d8",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "#fcf2d8",
    textDecoration: "none",
  }
}

// Simple navbar component
export const Navbar = () => {
  return () => (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <a href="/" style={styles.brandLink}>Cyber Notes</a>
      </div>
      <div style={styles.links}>
        <a href="/notes" style={styles.link}>Notes</a>
        <a href="/projects" style={styles.link}>Projects</a>
        <a href="/blog" style={styles.link}>Blog</a>
      </div>
    </nav>
  )
}