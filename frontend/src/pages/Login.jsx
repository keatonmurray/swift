import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="swift auth login flex-column d-flex justify-content-center align-items-center">
      <div>
        <img src="./img/logo.png" alt="Logo" />
      </div>
      <div className="d-flex flex-column align-items-center mt-5">
        <form action="#">
          <input type="email" className="form-control mb-2 py-3" placeholder="Email Address"/>
          <input type="password" className="form-control mb-2 py-3" placeholder="Password"/>
          <button className="btn btn-dark w-100 py-3 fw-semibold mt-3 py-2">Login</button>
        </form>
        <p className="fw-semibold small mt-3">Don't have an account yet? <Link to="/register" className="text-dark">Register instead</Link></p>
      </div>
    </div>
  )
}

export default Login