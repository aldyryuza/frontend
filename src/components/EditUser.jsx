import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const updateuser = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/users/${id}`, {
      name,
      email,
      password,
    });
    navigate("/");
  };
  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setPassword(response.data.password);
  };
  useEffect(() => {
    getUserById();
  }, []);
  return (
    <>
      <br />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={updateuser}>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                <div className="row mb-2">
                  <div className="col-12">
                    <Link to="/" className="btn btn-secondary mx-1">
                      Back
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Submit
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

export default EditUser;
