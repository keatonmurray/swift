const Login = () => {
  return (
    <div className="swift login">
        <div className="bg-img-wrapper">
            <img src="./img/auth-bg.png" alt="Page Background" />
        </div>
        <div className="content text-center px-3 px-md-0">
            <div className="content text-center px-3 px-md-0 mt-4">
                <h4 className="display-4-custom fw-bold mb-3">
                    Get paid globally. Spend locally.
                </h4>
                <p className="lead small">Your multi-currency account, all in one place</p>
            </div>
            <br />
            <div className="action-btn">
                <button className="btn btn-rounded px-5 py-2 btn-light me-2 fw-semibold">Login</button>
                <button className="btn btn-rounded px-5 py-2 btn-dark fw-semibold">Signup</button>
            </div>
        </div>
    </div>
  )
}

export default Login