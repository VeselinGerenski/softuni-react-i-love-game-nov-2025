import { useState } from "react"
import request from "../../../utils/request.js";
import { useParams } from "react-router";

export default function CommentCreate({
    user,
    onCreate,
}) {
    const { gameId } = useParams();
    const [comment, setComment] = useState('');

    const changeHandler = (e) => {
        setComment(e.target.value)
    }

    const submitHandler = async () => {
        try {
            await request('http://localhost:3030/jsonstore/comments', 'POST', {
                author: user.email,
                message: comment,
                gameId: gameId,
            });

            setComment('')
            onCreate();

        } catch (err) {
            alert(err.message)
        }
    }

    //TODO  Add Comment ( Only for logged-in users, which is not creators of the current game )}
    return (

        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={submitHandler}>
                <textarea
                    name="comment"
                    onChange={changeHandler}
                    value={comment}
                    placeholder="Comment......"
                    disabled={!user}
                    required
                />
                <input
                    className="btn submit"
                    type="submit"
                    defaultValue="Add Comment" />
            </form>
        </article>
    )
};