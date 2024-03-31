import { useEffect, useState } from "react";
import { Box, Form, Button } from 'react-bulma-components';

const FavoriteArtistForm = (props) => {
    const newArtistForm = {
        song: "",
        artist: "",
        title: "",
        releaseDate: "",
        genre: "",
        album: "",
        photo: "",
    }

const [form, setForm] = useState(newArtistForm);

const { Input, Field, Label } = Form;

const handleChange = (index) => {
    setForm({...form, [index.target.name]: index.target.value})
}

const handleSubmit = (index) => {
    index.preventDefault();
    props.createArtist(form);
    setForm(newArtistForm);
};


return (
    <div className="container">
        <section className="form-section">
            <Box className="form-box">
            <h2 className="artist">Add Favorite Artist</h2>
                <form onSubmit={handleSubmit}>
                    <Field>
                        <Label>Song:</Label>
                        <Input
                            type="text"
                            name="song"
                            value={form.song}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>Artist:</Label>
                        <Input
                            type="text"
                            name="artist"
                            value={form.artist}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>Title:</Label>
                        <Input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                    <Label>Release Date:</Label>
                        <Input
                            type="text"
                            name="releaseDate"
                            value={form.releaseDate}
                            onChange={handleChange}
                            />
                    </Field>
                    <Field>
                        <Label>Genre:</Label>
                        <Input
                            type="text"
                            name="genre"
                            value={form.genre}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>Album:</Label>
                        <Input
                            type="text"
                            name="album"
                            value={form.album}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field>
                        <Label>Photo:</Label>
                        <Input
                            type="text"
                            name="photo"
                            value={form.photo}
                            onChange={handleChange}
                        />
                    </Field>
                    <Button type="submit">Submit</Button>
                </form>
            </Box>
        </section>
    </div>
    )

}

export default FavoriteArtistForm;