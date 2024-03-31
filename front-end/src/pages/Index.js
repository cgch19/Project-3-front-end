import { Content, Button, Heading } from "react-bulma-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ArtistContext } from "../App";

// const Index = (props) => {
//     const artists = useContext(ArtistContext)

//     const loaded = () => {
//         return artists.map((artist, idx) => {
//             return (
//                 <Content key={idx}>
//                     <Heading>{artist.artist}</Heading>
//                     <p>{artist.song}</p>
//             )
//         })
//     }
// }