import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        email,
        password
      }) 
      toast.success(response.data.message)
    } catch (error) {
      toast.error(response.data.message)
    }
  }
  return (
    <div className="swift auth login flex-column d-flex justify-content-center align-items-center">
      <div>
        <img src="./img/logo.png" alt="Logo" />
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
          <button className="btn btn-dark w-100 py-3 fw-semibold mt-3 py-2">Login</button>
        </form>
        <p className="fw-semibold small mt-3">Don't have an account yet? <Link to="/register" className="text-dark">Register instead</Link></p>
      </div>
    </div>
  )
}

export default Login