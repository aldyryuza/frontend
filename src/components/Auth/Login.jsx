import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", { username, password })
      .then((result) => {
        if (result.data.message === "success") {
          // Menyimpan token ke localStorage setelah login berhasil
          localStorage.setItem("token", result.data.token); // Menyimpan token di localStorage
          localStorage.setItem("nama", result.data.nama);
          localStorage.setItem("id_user", result.data.id_user);
          navigate("/home"); // Mengarahkan ke halaman home
        } else {
          navigate("/registrasi");
          alert("You are not registered to this service");
        }
      })
      .catch((err) => alert(err.response.data));
  };
  return (
    <>
      <br />
      <div className="row">
        <div className="col">
          <div className="card w-50 mx-auto m-auto">
            <div className="card-header">
              <h3> Login Page</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                <div className="row mb-2">
                  <div className="col-12 text-end">
                    <Link to="/registrasi" className="btn btn-secondary mx-1">
                      Registrasi
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
