import Head from 'next/head'
import styles from '../../styles/Home.module.css'

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI

export default function ArtistHome({artist}) {

  return (
  	<div className={styles.container}>
      <Head>
        <title>{artist.name ? artist.name.first + ' ' + artist.name.last : 'Werkliste'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          This is the page of: {artist.name ? artist.name.first + ' ' + artist.name.last : 'No artists found for this id'}
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

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(BACKEND_URI+`artists?$limit=10000`)
  const artists = await res.json()
  // Get the paths we want to pre-render based on artists
  const paths = artists.data.map((artist) => `/artists/${artist._id}`)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }  	
	
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the artist `id`.
  // If the route is like /artist/1, then params.id is 1
  const res = await fetch(BACKEND_URI+`artists/${params.artistId}`)
  const artist = await res.json()
  // Pass artist data to the page via props
  return { props: { artist } }
}