import { useNavigate } from "react-router-dom";

function Dashboard(){

const navigate = useNavigate();

const logout = ()=>{

localStorage.removeItem("token");

navigate("/");

}

return(

<div style={{padding:"50px"}}>

<h1>CareerBridge Dashboard</h1>

<p>You are logged in.</p>

<button onClick={logout}>
Logout
</button>

</div>

)

}

export default Dashboard