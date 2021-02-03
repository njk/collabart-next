import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Werkliste</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Werkliste
        </h1>
        <div className={styles.advertisement}>
          <p>Publish your own website with unlimited storage. Manage your artworks in the cloud. Plans starting at 5 EUR/month.</p>
          <p>Check out live examples from other artists like: <a href="http://www.hannesmichanek.com/" target="_blank">Hannes Michanek</a></p>
          <p><a href="mailto:kontakt@werkliste.ch?subject=Request more information about Werkliste&body=Hi%20there.">-Contact us for more information-</a></p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://gute-programme.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          Gute Programme
        </a>
      </footer>
    </div>
  )
}