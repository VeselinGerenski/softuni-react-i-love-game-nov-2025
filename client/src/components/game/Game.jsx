import { Link } from "react-router";
import Details from "../details/Details.jsx";

export default function Game({
    _id,
    imageUrl,
    title,
    genre,
}) {

    return (
        <div className="game">
            <img src={imageUrl} alt={title} />
            <div className="details-overlay">
                <p className="name">{title}</p>
                <p className="genre">{genre}</p>
                <Link to={`/games/${_id}/details`} className="details-button" >Details </Link>
            </div>
        </div>
    )
};