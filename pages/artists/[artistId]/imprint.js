import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import HTMLHead from '../../../components/htmlhead'

const Imprint = () => {
	const { query } = useRouter()
	const artist = query.artist ? JSON.parse(query.artist) : {}
	const artistName = artist.name ? artist.name.first + " " + artist.name.last : "The Artist"
  return (
    <div className={styles.container}>
      <HTMLHead artist={artist}/>
      <Header artist={artist}/>
      <main className={styles.main}>
        <h1 className={styles.title}>Imprint</h1>
	    <p>{artistName}</p>
	    <p>c/o Nicolas Kölmel
	    	<br/>
	    	Gute Programme
	    	<br/>
	    	Hohenzollernstraße 124
	    	<br/>
	    	80796 München
	    	</p>
      </main>
      <Footer artist={artist}/>
    </div>
  )
}

export default Imprint