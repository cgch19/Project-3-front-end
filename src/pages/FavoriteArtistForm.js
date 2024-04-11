import { useState } from "react";
import { Box, Form, Button } from 'react-bulma-components';
import { useNavigate } from "react-router-dom";

const FavoriteArtistForm = (props) => {
    const newArtistForm = {
        song: "",
        artist: "",
        releaseDate: "",
        genre: "",
        album: "",
        image: [],
    }

const [form, setForm] = useState(newArtistForm);

const { Input, Field } = Form;
const navigate = useNavigate()

const handleChange = (index) => {
    setForm({...form, [index.target.name]: index.target.value})
}

const handleSubmit = (index) => {
    index.preventDefault();
    props.createArtist(form);
    setForm(newArtistForm);
};

const handleCancel = () => {
    navigate('/')
}


return (
    <div className="container">
        <section className="form-section">
            <Box >
            <h2 className="artist">Add Favorite Artist</h2>
                <form className="style-up" onSubmit={handleSubmit}>
                    <Field>
                        <Input
                            type="text"
                            name="artist"
                            value={form.artist}
                            onChange={handleChange}
                            placeholder="Artist"
                        />
                    </Field>
                    <Field >
                        <Input
                            type="text"
                            name="song"
                            value={form.song}
                            onChange={handleChange}
                            placeholder="Song"
                        />
                    </Field>

                    <Field>
                        <Input
                            type="text"
                            name="releaseDate"
                            value={form.releaseDate}
                            onChange={handleChange}
                            placeholder="Release Date"
                            />
                    </Field>
                    <Field>
                        <Input
                            type="text"
                            name="genre"
                            value={form.genre}
                            onChange={handleChange}
                            placeholder="Genre"
                        />
                    </Field>
                    <Field>
                        <Input
                            type="text"
                            name="album"
                            value={form.album}
                            onChange={handleChange}
                            placeholder="Album"
                        />
                    </Field>
                    <Field>
                        <Input
                            type="text"
                            name="image"
                            value={form.photo}
                            onChange={handleChange}
                            placeholder="Image URL"
                        />
                    </Field>

                    <Button onClick={handleCancel} className="popup-button" >Cancel</Button>
                    <Button className="popup-button" type="submit">Submit</Button>
                </form>
            </Box>
        </section>
    </div>
    )

}

export default FavoriteArtistForm;