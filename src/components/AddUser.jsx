import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const navigate = useNavigate();

  const saveuser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <br />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={saveuser}>
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
                    <Link
                      to="/"
                      className="btn btn-secondary mx-1"
                    >
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
};

export default AddUser;
