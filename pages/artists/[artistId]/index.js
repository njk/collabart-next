import styles from '../../../styles/Home.module.css'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import HTMLHead from '../../../components/HTMLHead'
import { BACKEND_URI } from '../../../config/statics'
import { useState } from 'react';

const Work = ({work}) => {
  const [showDetails, setShowDetails] = useState(false)
  const image_uri = work.image.secure_url || work.image.s3_url
  const dimensions = work.dimensions ? ", "+work.dimensions.height+"x"+work.dimensions.width+"cm" : ""

  return (<div key={work._id}>
    <img src={image_uri} alt={work.title} onClick={() => setShowDetails(!showDetails)}/>
    <p className={showDetails ? '' : styles.hideDetails}>
      {work.title}, {new Date(work.publishedDate).getFullYear()}{dimensions}
    </p>
  </div>)
}

export default function ArtistHome({artist, works}) {

  return (
  	<div className={styles.container}>
      <HTMLHead artist={artist}/>
      <Header artist={artist} menuItems={"vita"}/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {artist.name ? artist.name.first + ' ' + artist.name.last : 'No artists found for this id'}
        </h1>
        <div className={styles.works}>
          {works.map(work => <Work work={work} />)}
        </div>
      </main>
      <Footer artist={artist}/>

    </div>
    )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(BACKEND_URI+`artists?isPublic=true&$limit=10000`)
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
  const resArtist = await fetch(BACKEND_URI+`artists/${params.artistId}`)
  const resWorks = await fetch(BACKEND_URI+`works?artists=${params.artistId}&$limit=25&$sort[publishedDate]=-1`)
  const artist = await resArtist.json()
  const works = (await resWorks.json()).data
  // Pass artist data to the page via props
  return { props: { artist, works } }
}