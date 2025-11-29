import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import CommentCreate from "./comment-create/CommentCreate.jsx";
import CommentDetails from "./comment-details/CommentDetails.jsx";
import useRequest from "../../hooks/useRequest.js";
import { useUserContext } from "../../contexts/userContext.jsx";

export default function Details() {

  const { isAuthenticated, user } = useUserContext()
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [game, setGame] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { request } = useRequest()

  useEffect(() => {
    request(`/data/games/${gameId}`)
      .then(result => {
        setGame(result)
      })
      .catch(err => {
        alert(err.message)
      })
  }, [gameId,request]);

  const deleteGameHandler = async () => {
    const isConfirmed = confirm(`Are you sure you want to delete game: ${game.title}`)

    if (!isConfirmed) {
      return;
    }

    try {
      await request(`/data/games/${gameId}`, 'DELETE')

      navigate('/games')
    } catch (err) {
      alert('Unable to delete game', err.message)
    }
  }

  const refreshHandler = () => {
    setRefresh(state => !state);
  }

  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="header-and-image">
          <img
            className="game-img"
            src={game.imageUrl}
            alt={game.title}
          />
          <div className="meta-info">
            <h1 className="game-name">{game.title}</h1>
            <p className="data-row">
              <span className="label">Genre:</span>
              <span className="value">{game.genre}</span>
            </p>
            <p className="data-row">
              <span className="label">Active Players:</span>
              <span className="value">{game.players}</span>
            </p>
            <p className="data-row">
              <span className="label">Release Date:</span>
              <span className="value">{game.date}</span>
            </p>
          </div>
          <div className="summary-section">
            <h2>Summary:</h2>
            <p className="text-summary"> {game.summary}</p>
          </div>
        </div>
        {/* Edit/Delete buttons ( Only for creator of this game )  */}
        <div className="buttons">
          <Link className="button" to={`/games/${gameId}/edit`}> Edit </Link>
          {/* <Link to={`games/${gameId}/delete`} className="button">Delete </Link> */}

          <button className="button" onClick={deleteGameHandler}>Delete</button>

        </div>
        <CommentDetails refresh={refresh} />
      </div>

      {isAuthenticated && <CommentCreate user={user} onCreate={refreshHandler} />}
    </section>
  )
};