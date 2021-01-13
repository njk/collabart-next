import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import HTMLHead from '../../../components/HTMLHead'

const Vita = () => {
	const { query } = useRouter()
	const artist = query.artist ? JSON.parse(query.artist) : {}

  return (
    <div className={styles.container}>
      <HTMLHead artist={artist}/>
      <Header artist={artist}/>
      <main className={styles.main}>
        <h1 className={styles.title}>Vita: {artist.name ? artist.name.first + ' ' + artist.name.last : 'No artist'}</h1>
	      <div dangerouslySetInnerHTML={{__html: artist.vita}} />
      </main>
      <Footer artist={artist}/>
    </div>
  )
}

export default Vita