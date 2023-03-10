import styles from "./hero.module.scss"

import Link from "next/link"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.headline}>
        The JavaScript Library To Build Canvas User Interfaces
      </h1>
      <p className={styles.subheadline}>
        Build user interfaces using canvas as easy as it has never been
      </p>
      <div className={styles.links}>
        <Link
          href="/how-to-use/getting-started/overview"
          className={styles.link}
        >
          How To Use
        </Link>
        <a
          href="/canvas-user-interface.js"
          download
          className={styles.link + " " + styles.secondary}
        >
          Install
        </a>
        <Link href="/examples" className={styles.link + " " + styles.secondary}>
          Examples
        </Link>
      </div>
    </section>
  )
}
