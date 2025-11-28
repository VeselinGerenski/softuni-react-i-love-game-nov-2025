
import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm.js";
import { useContext } from "react";
import UserContext from "../../contexts/userContext.jsx";

export default function Login() {
    const navigate = useNavigate();
    const { loginHandler } = useContext(UserContext)

    const submitHandler = async ({ email, password }) => {

        try {

            await loginHandler(email, password);

            navigate('/');
        } catch (err) {
            alert(err.message);
        }

    }

    const { register, formAction } = useForm(submitHandler, {
        email: '',
        password: '',
    })

    return (
        <section id="login-page">
            <form id="login" action={formAction}>
                <div className="container">

                    <h1>Login</h1>

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        {...register('email')}
                        required
                    />

                    <label htmlFor="login-pass">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        placeholder="Password"
                        {...register('password')}
                        required
                    />
                    <input type="submit" className="btn submit" defaultValue="Login" />
                </div>
            </form>
        </section>

    )
};