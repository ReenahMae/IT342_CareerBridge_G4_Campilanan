import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register(){

const navigate = useNavigate();

const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [role,setRole] = useState("JOB_SEEKER");
const [error,setError] = useState("");

const handleRegister = async (e)=>{

e.preventDefault();

// check password match
if(password !== confirmPassword){
setError("Passwords do not match");
return;
}

// combine first + last name
const fullName = `${firstName} ${lastName}`;

try{

await register(fullName,email,password,role);

alert("Account created");

navigate("/");

}catch(err){

setError(err.message);

}

}

return(

<div className="register-container">

<div className="register-left">

<h3>CAREERBRIDGE</h3>

<h1>Build Your <br/> Career Path</h1>

<p>
Create your profile and start connecting with the right opportunities.
One account is all it takes to get started.
</p>

</div>

<div className="register-right">

<div className="register-card">

<h2>Create Account</h2>

{error && (
<p style={{color:"red"}}>
{error}
</p>
)}

<p>Set up your CareerBridge account</p>

<form onSubmit={handleRegister}>

<div className="name-row">

<input
type="text"
placeholder="First Name"
onChange={(e)=>setFirstName(e.target.value)}
required
/>

<input
type="text"
placeholder="Last Name"
onChange={(e)=>setLastName(e.target.value)}
required
/>

</div>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
required
/>

<input
type="password"
placeholder="Confirm Password"
onChange={(e)=>setConfirmPassword(e.target.value)}
required
/>

<div className="role-group">

<span>Select Role:</span>

<label>
<input
type="radio"
value="JOB_SEEKER"
checked={role==="JOB_SEEKER"}
onChange={(e)=>setRole(e.target.value)}
/>
Job Seeker
</label>

<label>
<input
type="radio"
value="EMPLOYER"
checked={role==="EMPLOYER"}
onChange={(e)=>setRole(e.target.value)}
/>
Employer
</label>

</div>

<button type="submit">
Register
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
Sign up with Google
</a>

<p className="login-link">
Already have an account? <Link to="/">Login</Link>
</p>

</div>

</div>

</div>

)

}

export default Register;