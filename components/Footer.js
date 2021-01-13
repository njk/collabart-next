import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Footer = ({artist}) => {

  return (<footer className={styles.footer}>
        <ul>
          <li>
            <a
              href="https://www.werkliste.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              Werkliste
            </a>
          </li>
          <li>
            <Link href={{
              pathname: "/artists/"+artist._id+"/imprint",
              query: { artist: JSON.stringify(artist) }
            }} as={`/artists/${artist._id}/imprint`}>
              <a>Imprint</a>
            </Link>
          </li>
        </ul>
      </footer>)
}

export default Footer