import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e)=>{

    e.preventDefault();

    const data = await login(email,password);

    if(data.token){

      localStorage.setItem("token",data.token);

      navigate("/dashboard");

    }else{
      alert("Invalid credentials");
    }

  }

  return(

    <div className="login-container">

      <div className="login-left">

        <h3>CAREERBRIDGE</h3>

        <h1>Find Your <br/> Next Move</h1>

        <p>
        Connect with employers and opportunities.
        The bridge between talent and career growth.
        </p>

      </div>


      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button type="submit">
              Login
            </button>

          </form>

          <div className="divider">OR</div>

          <a
            className="google-btn"
            href="http://localhost:8080/oauth2/authorization/google"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt=""
              aria-hidden="true"
              className="google-logo"
            />
            Continue with Google
          </a>

          <p className="register-link">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>

        </div>

      </div>

    </div>

  )
}

export default Login