import { useEffect, useState } from "react"
import GameCard from "../game-card/GameCard.jsx";
import useRequest from "../../hooks/useRequest.js";

export default function Catalog() {
    const [games, setGames] = useState([]);
    const { request } = useRequest()

    useEffect(() => {
        (async () => {
            try {
              const result = await request('/data/games');
                 setGames(result)
            } catch (err) {
                alert(err.message)
            }
        })();
    }, [request]);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>

            {games.length === 0 && <h3 className="no-articles">No Added Games Yet</h3>}

            <div className="catalog-container">
                {games.map(game => <GameCard key={game._id} {...game} />)}
            </div>

        </section>

    )
};