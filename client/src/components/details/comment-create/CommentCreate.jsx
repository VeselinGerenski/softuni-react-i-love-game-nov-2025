import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest.js";
import useForm from "../../../hooks/useForm.js";


export default function CommentCreate({
    user,
    onCreate,
}) {
    const { request } = useRequest();
    const { gameId } = useParams();

    const submitHandler = async ({ comment }) => {
        try {
            await request('/data/comments', 'POST', {
                message: comment,
                gameId: gameId,
            });

            onCreate();
        } catch (err) {
            alert(err.message)
        }
    }

    const { register, formAction} = useForm(submitHandler, {
        comment: ''
    })

    //TODO  Add Comment ( Only for logged-in users, which is not creators of the current game )}
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={formAction}>
                <textarea
                    placeholder="Comment......"
                    disabled={!user}
                    required
                    {...register('comment')}
                />
                <input
                    className="btn submit"
                    type="submit"
                    defaultValue="Add Comment" />
            </form>
        </article>
    )
};