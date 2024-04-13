import React, { useState, useEffect } from 'react';

// Ref. Spotify API Developer Tools
const CLIENT_ID = "cf65567cf07049ef8d127967caae3057";
const CLIENT_SECRET = "84045d61108e4c918a0d2d27613e93bf";

const Album = () => {
    const [searchInput, setSearchInput] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [songs, setSongs] = useState([]);
    const [selectedSongIndex, setSelectedSongIndex] = useState(null);

    useEffect(() => {
        let authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        };

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(response => response.json())
            .then(data => setAccessToken(data.access_token));
    }, []);

    async function search() {
        let searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        };

        let artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
            .then(response => response.json())
            .then(data => data.artists.items[0]?.id);

        if (!artistID) {
            console.error('Artist not found');
            return;
        }

        await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`, searchParameters)
            .then(response => response.json())
            .then(data => {
                setSongs(data.tracks);
                setSelectedSongIndex(0); 
            });
    }

    const handlePlayButtonClick = (songIndex) => {
        console.log("Play button clicked for song:", songs[songIndex]);
        setSelectedSongIndex(songIndex);
    };

    // const handleSkipButtonClick = () => {
    //     if (selectedSongIndex < songs.length - 1) {
    //         setSelectedSongIndex(selectedSongIndex + 1);
    //     } else {
    //         console.log("No more songs to skip to.");
    //     }
    // };
    {/* Used this website to be able to render an iframe with the Spotify embed code for the selected song.
            https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api */}
    return (
        <div className="container">
            {selectedSongIndex !== null && (
                <div className="player-container">
                    <iframe
                        src={`https://open.spotify.com/embed/track/${songs[selectedSongIndex].id}`}
                        width="300"
                        height="80"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    ></iframe>
                </div>
            )}

            <div className="search-container">
                <div className="control is-expanded">
                    <input className="input search-input" type="text" placeholder="Search Artist / Top Tracks"
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                search();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                </div>
                <div className="control">
                    <button className="popup-button" onClick={search}>
                        Search
                    </button>
                </div>
            </div>

            <div className="albums-container">
                {songs.map((song, i) => (
                    <div key={i} className="album">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img className="album-image" src={song.album.images[0]?.url} alt={song.album.name}/>
                                </figure>
                                <p className="title is-6">Song: {song.name}</p>
                                <p className="subtitle is-7">Album: {song.album.name}</p>
                                <button className="button is-small" onClick={() => handlePlayButtonClick(i)}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        
            {/* {selectedSongIndex !== null && (
                // <div className="player-controls">
                //     <button className="button is-small" onClick={handleSkipButtonClick}>
                //         Skip
                //     </button>
                // </div>
            )} */}

        </div>
    );
};

export default Album;

