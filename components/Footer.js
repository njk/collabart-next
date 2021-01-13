import styles from '../styles/Home.module.css'

const Footer = ({artist}) => {

  return (<footer className={styles.footer}>
        <a
          href="https://www.werkliste.ch"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          Werkliste
        </a>
      </footer>)
}

export default Footer