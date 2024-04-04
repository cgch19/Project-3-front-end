import { Content, Button, Heading } from "react-bulma-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ArtistContext } from "../App";

const Index = (props) => {
    const artists = useContext(ArtistContext)
    console.log(artists)

    const loaded = () => {
        return artists.map((artist, idx) => {
            return (
                <Content 
                key={idx}
                display="flex"
                flexDirection="row"
                alignItems="baseline"
                textColor="dark"
                justifyContent="space-evenly"
                className="has-background-grey-lighter"
                >
                    <Heading>{artist.artist}</Heading>
                    <img src={artist.img} alt={artist.artist} />
                    <p>{artist.song}</p>
                    <p>{artist.album}</p>
                    <Link to={`/favoriteArtist/${artist._id}`}>
                        <Button>Update Artist</Button>
                    </Link>
                </Content>

            )
        })
    }

    const loading = () => {
        return <h1>Loading . . .</h1>
    }

    return (artists && artists.length > 0 ? loaded() : loading())
}

export default Index;

