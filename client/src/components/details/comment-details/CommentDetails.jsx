import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router"
import useRequest from "../../../hooks/useRequest.js";

export default function CommentDetails({
    refresh,
}) {
    const [comments, setComments] = useState([])
    const { gameId } = useParams();
    const { request } = useRequest();

    const urlParams = useMemo(() => {
        return new URLSearchParams({
            where: `gameId="${gameId}"`,
            load: 'author=_ownerId:users'
        });
    }, [gameId]);

    useEffect(() => {
        request(`/data/comments?${urlParams.toString()}`)
            .then(result => {
                setComments(result)
            })
    }, [gameId, refresh, request,urlParams])

    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.length === 0 && (
                    <p className="no-comment">No comments available.</p>)}

                {comments.map(comment => (
                    <li key={comment._id} className="comment">
                        <p> {comment.author?.email} : {comment.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};