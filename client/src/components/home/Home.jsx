import { useEffect, useState } from "react"
import GameCard from "../game-card/GameCard.jsx";
import useRequest from "../../hooks/useRequest.js";

export default function Home() {
    const { request } = useRequest()
    const [latestGames, setLatestGames] = useState([]);
    
    useEffect(() => {
        request('/data/games?sortBy=_createdOn%20desc&pageSize=3')
            .then(result => {
                setLatestGames(result)
            })
    }, [request])

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in </h3>
                <img id="logo-left" src="./images/logo.png" alt="logo" />
            </div>
            <div id="home-page">
                <h1>Latest Games</h1>
                <div id="latest-wrap">
                    <div className="home-container">
                        {latestGames.length === 0 && <p className="no-articles">No games yet</p>}
                        {latestGames.map(game => <GameCard key={game._id} {...game} />)}
                    </div>
                </div>
            </div>
        </section>
    )
};