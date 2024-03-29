import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Header = ({artist, menuItems = []}) => {

  return (<header className={styles.header}>
      <div className={styles.title}>
        {artist.name ? artist.name.first + ' ' + artist.name.last : 'No artist found for this id'}
      </div>
      {menuItems.length > 0 && 
        <span className={styles.menu}>
          <Link href={"/artists/"+artist._id}>
            <a className={menuItems.includes("vita") ? styles.headerLinkActive : undefined} ><b>Works</b></a>
          </Link>
          <span> | </span>
          <Link href={{
              pathname: "/artists/"+artist._id+"/vita",
              query: { artist: JSON.stringify(artist) }
            }} as={`/artists/${artist._id}/vita`}>
            <a className={menuItems.includes("works") ? styles.headerLinkActive : undefined}><b>Vita</b></a>
          </Link>
        </span>
      }
    </header>)
}

export default Header