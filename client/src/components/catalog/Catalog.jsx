import { useEffect, useState } from "react"
import GameCard from "../game-card/GameCard.jsx";


const BASE_URL = 'http://localhost:3030/jsonstore/games';

export default function Catalog() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        (async () => {

            try {
                const response = await fetch(BASE_URL);
                const result = await response.json();

                setGames(Object.values(result));
            } catch (err) {
                alert(err.message)
            }
        })();
    }, []);


    // useEffect(() => {
    //     fetch('http://localhost:3030/jsonstore/games')
    //         .then(response => response.json())
    //         .then(result => {

    //             const games = Object.values(result)

    //             setGames(games)
    //         })
    // }, []);
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