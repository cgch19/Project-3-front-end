import { Content, Button, Heading } from "react-bulma-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ArtistContext } from "../App";

const Index = (props) => {
    const artists = useContext(ArtistContext);

    const loaded = () => {
        return (
            <div className="scrolling-container">
                {artists.artists?.map((artist, idx) => {
                    return (
                        <Content 
                            key={idx}
                            className="artist-content"
                        >
                            <div className="artist-info">
                                <Heading>{artist.artist}</Heading>
                                <img src={artist.img} alt={artist.artist} className="favartist-album"/>
                                <p>{artist.song}</p>
                                <p>{artist.album}</p>
                            </div>
                            <div className="artist-actions">
                                <Link to={`/favoriteArtist/${artist._id}`}>
                                    <Button className="update-button">Update Artist</Button>
                                </Link>
                            </div>
                        </Content>
                    );
                })}
            </div>
        );
    };

    const loading = () => {
        return <h1>Loading . . .</h1>;
    };

    return artists && artists.artists?.length > 0 ? loaded() : loading();
};

export default Index;