import Head from 'next/head'

const HTMLHead = ({artist}) => (
  <Head>
    <title>{artist.name ? artist.name.first + ' ' + artist.name.last : 'Werkliste'}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

export default HTMLHead
