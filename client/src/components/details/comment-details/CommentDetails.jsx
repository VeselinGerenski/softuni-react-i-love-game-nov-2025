import { useEffect, useState } from "react";
import { useParams } from "react-router"
import request from "../../../utils/request.js";

export default function CommentDetails({
    refresh,
}) {
    const [comments, setComments] = useState([])
    const { gameId } = useParams();

    useEffect(() => {
        request('http://localhost:3030/jsonstore/comments')
            .then(result => {
                const commentsArr = Object.values(result);

                const gameComments = commentsArr.filter(
                    comment => comment.gameId === gameId
                );
                setComments(gameComments)
            })
    }, [gameId, refresh])

    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.length === 0 && (
                    <p className="no-comment">No comments available.</p>)}

                {comments.map(comment => (
                    <li key={comment._id} className="comment">
                        <p> {comment.author} : {comment.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};