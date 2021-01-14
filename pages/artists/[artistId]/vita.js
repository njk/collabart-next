import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import HTMLHead from '../../../components/HTMLHead'

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI

const Vita = ({ artist }) => {

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

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(BACKEND_URI+`artists?$limit=10000`)
  const artists = await res.json()
  // Get the paths we want to pre-render based on artists
  const paths = artists.data.map((artist) => `/artists/${artist._id}/vita`)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }   
  
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the artist `id`.
  // If the route is like /artist/1, then params.id is 1
  const resArtist = await fetch(BACKEND_URI+`artists/${params.artistId}`)
  const artist = await resArtist.json()
  // Pass artist data to the page via props
  return { props: { artist } }
}