import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Header = ({artist, menuItems}) => {

  return (<header className={styles.header}>
      <ul>
        {menuItems.includes("works") && <li>
          <Link href={"/artists/"+artist._id}>
            <a>Works</a>
          </Link>
        </li>}
        {menuItems.includes("vita") && <li>
          <Link href={{
            pathname: "/artists/"+artist._id+"/vita",
            query: { artist: JSON.stringify(artist) }
          }} as={`/artists/${artist._id}/vita`}>
            <a>Vita</a>
          </Link>
        </li>}
      </ul>
    </header>)
}

export default Header