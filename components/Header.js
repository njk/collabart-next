import Link from 'next/link'

const Header = ({artist}) => {

  return (<header>
      <ul>
        <li>
          <Link href={"/artists/"+artist._id}>
            <a>Works</a>
          </Link>
        </li>
        <li>
          <Link href={{
            pathname: "/artists/"+artist._id+"/vita",
            query: { artist: JSON.stringify(artist) }
          }} as={`/artists/${artist._id}/vita`}>
            <a>Vita</a>
          </Link>
        </li>
      </ul>
    </header>)
}

export default Header