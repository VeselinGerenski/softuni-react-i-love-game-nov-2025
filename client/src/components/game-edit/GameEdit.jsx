import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import request from "../../utils/request.js";

const baseUrl = 'http://localhost:3030/jsonstore/games';

export default function GameEdit() {
    const navigate = useNavigate();
    const { gameId } = useParams();

    //Sets a starting state
    const [formValues, setFormValues] = useState({
        title: "",
        genre: "",
        imageUrl: "",
        date: "",
        players: "",
        summary: "",
    });

    //Fills the form with the data
    useEffect(() => {
        request(`${baseUrl}/${gameId}`)
            // .then(response => response.json())
            .then(result => {
                setFormValues(result);
            })
            .catch(err => {
                alert(err.message);
            })

    }, [gameId]);

    //Update state from user input
    const changeHandler = (e) => {
        setFormValues((formValues) => ({
            ...formValues,
            [e.target.name]: e.target.value,
        }));
    };

    const formValuesHandler = async () => {
        try {
            await request(`${baseUrl}/${gameId}`, 'PUT', formValues)

            navigate(`/games/${gameId}/details`);
        } catch (err) {
            alert("Error updating game: " + err.message);
        }
    }

    return (
        <>
            {/* add Page ( Only for logged-in users ) */}
            <section id="edit-page">
                <form id="add-new-game" action={formValuesHandler}>
                    <div className="container">
                        <h1>Edit Game</h1>
                        <div className="form-group-half">
                            <label htmlFor="gameName">Game Name:</label>
                            <input
                                type="text"
                                id="gameName"
                                name="title"
                                placeholder="Enter game title..."
                                value={formValues.title}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="form-group-half">
                            <label htmlFor="genre">Genre:</label>
                            <input
                                type="text"
                                id="genre"
                                name="genre"
                                placeholder="Enter game genre..."
                                value={formValues.genre}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="form-group-half">
                            <label htmlFor="activePlayers">Active Players:</label>
                            <input
                                type="number"
                                id="activePlayers"
                                name="players"
                                min={0}
                                placeholder={0}
                                value={formValues.players}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="form-group-half">
                            <label htmlFor="releaseDate">Release Date:</label>
                            <input
                                type="date"
                                id="releaseDate"
                                name="date"
                                value={formValues.date}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="form-group-full">
                            <label htmlFor="imageUrl">Image URL:</label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                placeholder="Enter image URL..."
                                value={formValues.imageUrl}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="form-group-full">
                            <label htmlFor="summary">Summary:</label>
                            <textarea
                                name="summary"
                                id="summary"
                                rows={5}
                                placeholder="Write a brief summary..."
                                value={formValues.summary}
                                onChange={changeHandler}
                            />
                        </div>
                        <input className="btn submit" type="submit" value="EDIT GAME" />
                    </div>
                </form>
            </section>
        </>

    )
};