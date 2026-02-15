import * as Component from "./index" // import existing Quartz components

// Easy to modify CSS configuration
const styles = {
  nav: {
    display: "flex",
    gap: "2rem",
    padding: "0.5rem 1rem",
    // backgroundColor: "#161618",
    color: "#fcf2d8",
    alignItems: "center",
    justifyContent: "space-between",
    fontsize:"18px",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "35px",
  },
  brandLink: {
    color: "#fcf2d8",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "2rem",
    fontSize: "28px",
  },
  link: {
    color: "#fcf2d8",
    textDecoration: "none",
    gap: "2rem",
  }
}

// Simple navbar component
export const Navbar = () => {
  return () => (
    <nav style={styles.nav}>
      {/* <div style={styles.brand}>
        <a href="/" style={styles.brandLink}>Cyber Notes</a>
      </div> */}
      <div style={styles.links}>
        <a href="/Bug-Bounty" style={styles.link}>Bug Bounty</a>
        <a href="/Blue-Team" style={styles.link}>Blue Team</a>
        <a href="/Red-Team" style={styles.link}>Red Team</a>
      </div>
    </nav>
  )
}