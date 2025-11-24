import { useNavigate } from "react-router";

export default function Login({
    onLogin,
}) {
    const navigate = useNavigate()

    const submitAction = (formData) => {
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return alert('Email and password is required');
        }

        try {
            onLogin(email, password);

            navigate('/');
        } catch (err) {
            alert(err.message);
        }

    }
    return (
        <section id="login-page">
            <form id="login" action={submitAction}>
                <div className="container">
                    
                    <h1>Login</h1>

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                    />

                    <label htmlFor="login-pass">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        placeholder="Password"
                    />
                    <input type="submit" className="btn submit" defaultValue="Login" />
                </div>
            </form>
        </section>

    )
};