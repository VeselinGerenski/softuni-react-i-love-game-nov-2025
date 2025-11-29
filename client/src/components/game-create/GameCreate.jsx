import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/useRequest.js";

export default function GameCreate() {
    const navigate = useNavigate();
    const { request } = useRequest();

    const createGameHandler = async (values) => {
        const data = values;

        data.players = Number(data.players);
        data._createdOn = Date.now();

        try {
            await request('/data/games', 'POST', data)

            navigate('/games')
        } catch (err) {
            alert(err.message)
        }
    }

    const initialValues = {
        title: '',
        genre: '',
        players: '',
        imageUrl: '',
        date: '',
        summary: '',
    }
    const { register, formAction } = useForm(createGameHandler, initialValues)

    return (
        <>
            {/* add Page ( Only for logged-in users ) */}
            <section id="add-page">
                <form id="add-new-game" action={formAction}>
                    <div className="container">
                        <h1>Add New Game</h1>
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
                        <input className="btn submit" type="submit" defaultValue="ADD GAME" />
                    </div>
                </form>
            </section>
        </>
    )
};