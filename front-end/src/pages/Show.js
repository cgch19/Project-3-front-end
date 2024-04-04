import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Box, Form, Button} from "react-bulma-components";
import { ArtistContext } from "../App";   

const Show = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const artists = useContext(ArtistContext)
    const artist = artists.artists?.find((a) => a._id === id)

    const [form, setForm] = useState(artist)

    const {Input, Field, Label} = Form;

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateArtist(form, id)
        navigate(`/favoriteArtist`)
    }

    const removeArtist = (e) => {
        e.preventDefault()
        props.deleteArtist(id)
        navigate(`/favoriteArtist`)
    }

    return(
        <>
        <Card textAlign="#" style={{width:'400', margin:'0 auto'}}>
            <Card.Content>
                <Card.Header.Title className="#">
                    {artist.artist}
                </Card.Header.Title>
                <Card.Image src={artist.img} />
                <Card.Content>
                    <p>{artist.song}</p>
                    <p>{artist.album}</p>
                    <p>{artist.title}</p>
                    <p>{artist.genre}</p>
                    <p>{artist.releaseDate}</p>
                </Card.Content>
            </Card.Content>
            <Button onClick={removeArtist}>Delete</Button>

            <section>
                <Box className="#">
                    <h2 className="#">Edit Artist</h2>
                    <form onSubmit={handleSubmit}>
                        <Field>
                            <Label>Artist</Label>
                            <Input placeholder="Artist Name" name="artist" value={form.artist} onChange={handleChange} />
                        </Field>
                        <Field>
                            <Label>Song</Label>
                            <Input placeholder="Song Name" name="song" value={form.song} onChange={handleChange} />
                        </Field>
                        <Field>
                            <Label>Album</Label>
                            <Input placeholder="Album Name" name="album" value={form.album} onChange={handleChange} />
                        </Field>
                        <Field>
                            <Label>Image</Label>
                            <Input placeholder="Image URL" name="img" value={form.img} onChange={handleChange} />
                        </Field>
                        <Field>
                            <Label>Title</Label>
                            <Input placeholder="Title" name="title" value={form.title} onChange={handleChange} />
                        </Field>
                        <Field>
                            <Label>Genre</Label>
                            <Input placeholder="Genre" name="genre" value={form.genre} onChange={handleChange} />
                        </Field>
                        <Field>
                            <Label>Release Date</Label>
                            <Input placeholder="Release Date" name="releaseDate" value={form.releaseDate} onChange={handleChange} />
                        </Field>
                        <Button type="submit">Update</Button>
                    </form>



                </Box>
            </section>

                    

        </Card>
        </>
    )
}

export default Show;