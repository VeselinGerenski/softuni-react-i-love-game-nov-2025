
import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm.js";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const {registerHandler} = useContext(UserContext)

  const registerSubmitHandler = async (values) => {
    const { email, password, confirmPassword } = values;

    // Validation
    if (password !== confirmPassword) {
      return alert('Password missmatch');
    }
    try {
      // Register User
     await registerHandler(email, password);

      // Redirect to home page
      navigate('/');
    } catch (err) {
      alert(err.message)
    }
  }

  const { register, formAction, } = useForm(registerSubmitHandler, {
    email: '',
    password: '',
    confirmPassword: '',
  })


  return (
    // {/* Register Page ( Only for Guest users ) */}
    <section id="register-page" className="content auth">
      <form id="register" action={formAction}>
        <div className="container">
          <div className="brand-logo" />

          <h1>Register</h1>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            {...register('email')}
            required
          />

          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            id="register-password"
            placeholder="Password"
            {...register('password')}
            required
          />

          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            required
          />

          <input className="btn submit" type="submit" defaultValue="Register" />
        </div>
      </form>
    </section>

  )
};