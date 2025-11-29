import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useRequest from "../../hooks/useRequest.js";
import useForm from "../../hooks/useForm.js";

export default function GameEdit() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const { request } = useRequest();

    const editGameHandler = async (values) => {
        try {
            await request(`/data/games/${gameId}`, 'PUT', values)

            navigate(`/games/${gameId}/details`);
        } catch (err) {
            alert("Error updating game: " + err.message);
        }
    }

    const { register, formAction, setValues } = useForm(editGameHandler, {
        title: "",
        genre: "",
        imageUrl: "",
        date: "",
        players: "",
        summary: "",
    })

    useEffect(() => {
        request(`/data/games/${gameId}`)
            .then(result => {
                setValues(result);
            })
            .catch(err => {
                alert(err.message);
            })

    }, [gameId,request,setValues]);

    return (
        <>
            {/* add Page ( Only for logged-in users ) */}
            <section id="edit-page">
                <form id="add-new-game" action={formAction}>
                    <div className="container">
                        <h1>Edit Game</h1>
                        <div className="form-group-half">
                            <label htmlFor="gameName">Game Name:</label>
                            <input
                                type="text"
                                id="gameName"
                                placeholder="Enter game title..."
                                {...register('title')}
                                required
                            />
                        </div>
                        <div className="form-group-half">
                            <label htmlFor="genre">Genre:</label>
                            <input
                                type="text"
                                id="genre"
                                placeholder="Enter game genre..."
                                {...register('genre')}
                                required
                            />
                        </div>
                        <div className="form-group-half">
                            <label htmlFor="activePlayers">Active Players:</label>
                            <input
                                type="number"
                                id="activePlayers"
                                min={0}
                                placeholder={0}
                                {...register('players')}
                                required
                            />
                        </div>
                        <div className="form-group-half">
                            <label htmlFor="releaseDate">Release Date:</label>
                            <input
                                type="date"
                                id="releaseDate"
                                {...register('date')}
                                required
                            />
                        </div>
                        <div className="form-group-full">
                            <label htmlFor="imageUrl">Image URL:</label>
                            <input
                                type="text"
                                id="imageUrl"
                                placeholder="Enter image URL..."
                                {...register('imageUrl')}
                                required
                            />
                        </div>
                        <div className="form-group-full">
                            <label htmlFor="summary">Summary:</label>
                            <textarea
                                id="summary"
                                rows={5}
                                placeholder="Write a brief summary..."
                                {...register('summary')}
                                required
                            />
                        </div>
                        <input className="btn submit" type="submit" value="EDIT GAME" />
                    </div>
                </form>
            </section>
        </>

    )
};