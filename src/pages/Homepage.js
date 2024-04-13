import Album from "./ArtistTopTrack"

const Homepage = () => {

    return (
        <div className="homepage-heading">
            <h1>MuzicBox</h1>
            <div className="search-container">
            <Album/>
            </div>
        </div>
    )
}

export default Homepage
