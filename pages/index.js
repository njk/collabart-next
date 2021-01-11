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
      </main>

      <footer className={styles.footer}>
        <a
          href="https://werkliste.ch"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          Werkliste
        </a>
      </footer>
    </div>
  )
}