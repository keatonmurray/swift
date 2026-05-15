import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, 
        { email, password },
        { withCredentials: true } );
        if (response.data?.user) {
          localStorage.setItem("api_token", response.data.token);
          localStorage.setItem("user_id", response.data.user.id); 
          toast.success(response.data.message);
          const userId = response.data.user.id;
          navigate(`/dashboard/${userId}`);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          const message = error.response?.data?.message || "Login failed";
          toast.error(message);
        }
    }
  };
  return (
    <div className="swift auth login flex-column d-flex justify-content-center align-items-center bg-main-pallette">
      <div>
        <img src="./img/logo-inverted.png" alt="Logo" />
      </div>
      <div className="d-flex flex-column align-items-center mt-5">
        <form onSubmit={handleLogin}>
          <input type="email"
           className="form-control mb-2 py-3" 
           value={email}
           onChange={(e)=> setEmail(e.target.value)}
           placeholder="Email Address"/>
          <input type="password" 
            className="form-control mb-2 py-3" 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Password"/>
          <button className="btn w-100 py-3 fw-semibold mt-3 py-2 border-0 btn-bg-primary text-dark">Login</button>
        </form>
        <p className="fw-semibold small mt-3 text-white">Don't have an account yet? <Link to="/select-account-type" className="text-white text-decoration-none">Register instead</Link></p>
      </div>
    </div>
  )
}

export default Login