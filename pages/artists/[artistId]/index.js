import styles from "../../../styles/Home.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import HTMLHead from "../../../components/HTMLHead";
import { BACKEND_URI } from "../../../config/statics";
import { useState, useEffect } from "react";
import Image from "next/image";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button } from "@material-ui/core";

const Work = ({ work, alwaysDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    setShowDetails(alwaysDetails);
  }, [alwaysDetails]);
  const image_uri = work.image.secure_url || work.image.s3_url;
  const dimensions = work.dimensions
    ? ", " + work.dimensions.height + "x" + work.dimensions.width + "cm"
    : "";
  const techniqueId = work.techniques && work.techniques[0];

  const [technique, setTechnique] = useState();
  useEffect(() => {
    async function fetchTechnique() {
      const techniqueFetched = await fetch(
        BACKEND_URI + `techniques/${techniqueId}`
      );
      const techniqueJson = await techniqueFetched.json();
      setTechnique(techniqueJson);
    }
    fetchTechnique();
  }, []);

  const getDateText = () => {
    // publishedDate: { type: Date },
    // publishedDateAlternative: { type: Date },
    // dateDivider: { type: String },
    // isDateNotExact: { type: Boolean, default: false },
    // isDateUnknown: { type: Boolean, default: false },
    if (work.isDateNotExact) {
      return "ca. " + new Date(work.publishedDate).getFullYear();
    } else if (work.isDateUnknown) {
      return "unbekannt";
    } else if (work.dateDivider) {
      return (
        new Date(work.publishedDate).getFullYear() +
        "/" +
        new Date(work.publishedDateAlternative).getFullYear()
      );
    } else if (work.publishedDate) {
      return new Date(work.publishedDate).getFullYear();
    } else {
      return "";
    }
  };

  return (
    <div key={work._id} className={styles.workBox}>
      <div className={styles.imageBox}>
        <Image
          src={image_uri}
          alt={work.title}
          onClick={
            alwaysDetails === false
              ? () => setShowDetails(!showDetails)
              : undefined
          }
          layout="fill"
          objectFit="contain"
          priority={true}
          className="work-image"
        />
      </div>
      <p className={showDetails ? "" : styles.hideDetails}>
        {work.title}, {getDateText()}
        {technique ? ", " + technique.name : ""}
        {dimensions}
      </p>
    </div>
  );
};

export default function ArtistHome({ artist, works = [] }) {
  const [newWorks, setNewWorks] = useState(works);
  const [showCount, setShowCount] = useState(10);
  const [workCount, setWorkCount] = useState(30);
  const showDetails = artist.showDetails === true;

  useEffect(() => {
    async function fetchWorks() {
      const resWorks = await fetch(
        BACKEND_URI +
          `works?artists=${artist._id}&$limit=${showCount}&$sort[publishedDate]=-1`
      );
      const worksJson = await resWorks.json();
      setWorkCount(worksJson.total);
      setNewWorks(worksJson.data);
    }
    fetchWorks();
  }, [showCount]);

  return (
    <div className={styles.container}>
      <HTMLHead artist={artist} />
      <Header
        artist={artist}
        menuItems={artist.vita && artist.vita.length ? "vita" : undefined}
      />
      <main className={styles.main}>
        <div className={styles.works}>
          {newWorks.map((work) => (
            <Work key={work._id} work={work} alwaysDetails={showDetails} />
          ))}
        </div>
        {showCount < workCount && (
          <>
            <IconButton
              aria-label="show-more"
              color="primary"
              onClick={() => setShowCount(showCount + 10)}
            >
              <ExpandMoreIcon />
            </IconButton>
            <Button onClick={() => setShowCount(workCount)}>show all</Button>
          </>
        )}
      </main>
      <Footer artist={artist} />
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(BACKEND_URI + `artists?isPublic=true&$limit=10000`);
  const artists = await res.json();
  // Get the paths we want to pre-render based on artists
  const paths = artists.data.map((artist) => `/artists/${artist._id}`);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the artist `id`.
  // If the route is like /artist/1, then params.id is 1
  const resArtist = await fetch(BACKEND_URI + `artists/${params.artistId}`);
  const resWorks = await fetch(
    BACKEND_URI +
      `works?artists=${params.artistId}&$limit=20&$sort[publishedDate]=-1`
  );
  const artist = await resArtist.json();
  const works = (await resWorks.json()).data;
  // Pass artist data to the page via props
  return { props: { artist, works } };
}
