import React, { useState, useEffect } from 'react';

const CLIENT_ID = "cf65567cf07049ef8d127967caae3057";
const CLIENT_SECRET = "84045d61108e4c918a0d2d27613e93bf";

const Albums = () => {
    const [searchInput, setSearchInput] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        let authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
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
                'Authorization': `Bearer ${accessToken}`
            }
        };

        let artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
            .then(response => response.json())
            .then(data => data.artists.items[0]?.id);

        if (!artistID) {
            console.error('Artist not found');
            return;
        }

        await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParameters)
            .then(response => response.json())
            .then(data => setAlbums(data.items));
    }

    return (
        <div className="container">
            <div className="search-container">
                <div className="control is-expanded">
                    <input className="input search-input" type="text" placeholder="Search For Artist"
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                search();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                </div>
                <div className="control">
                    <button className="nav-button" onClick={search}>
                        Search
                    </button>
                </div>
            </div>

            <div className="columns is-multiline">
                {albums.map((album, i) => (
                    <div key={i} className="column is-one-quarter">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={album.images[0]?.url} alt={album.name}/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <p className="title is-6">{album.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Albums;